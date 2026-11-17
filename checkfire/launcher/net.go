// Same-network multiplayer for Checkfire.
//
// When the person at this computer chooses "Host on this network", the launcher also listens on the local
// network (port 47620). Other players on the same Wi-Fi open http://<this computer>:47620 in a browser and get
// the same game page. Two players are paired by a short room code and the launcher simply passes their
// messages to each other (a tiny WebSocket relay, standard library only). Nothing leaves the local network,
// and no names or accounts are involved.
package main

import (
	"bufio"
	"crypto/rand"
	"crypto/sha1"
	"encoding/base64"
	"encoding/binary"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net"
	"net/http"
	"strings"
	"sync"
	"time"
)

const lanPort = 47620

var (
	lanMu      sync.Mutex
	lanStarted bool
	rooms      = map[string]*room{}
	roomsMu    sync.Mutex
)

type peer struct {
	c    net.Conn
	wmu  sync.Mutex
	room *room
}
type room struct {
	code string
	a, b *peer
}

// lanAddresses lists this computer's private IPv4 addresses, as http://ip:port links.
func lanAddresses() []string {
	private, other := []string{}, []string{}
	ifs, _ := net.Interfaces()
	for _, in := range ifs {
		if in.Flags&net.FlagUp == 0 || in.Flags&net.FlagLoopback != 0 {
			continue
		}
		addrs, _ := in.Addrs()
		for _, a := range addrs {
			ipn, ok := a.(*net.IPNet)
			if !ok {
				continue
			}
			ip := ipn.IP.To4()
			if ip == nil || ip.IsLinkLocalUnicast() {
				continue
			}
			link := fmt.Sprintf("http://%s:%d", ip.String(), lanPort)
			if ip.IsPrivate() {
				private = append(private, link)
			} else {
				other = append(other, link)
			}
		}
	}
	if len(private) > 0 { // home and school networks use private addresses; show those when there are any
		return private
	}
	return other
}

func isLoopback(r *http.Request) bool {
	h, _, _ := net.SplitHostPort(r.RemoteAddr)
	ip := net.ParseIP(h)
	return ip != nil && ip.IsLoopback()
}

func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-store")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(v)
}

// startLAN opens the network listener (once). gameMux serves the game page and the heartbeat.
func startLAN(gameMux http.Handler) error {
	lanMu.Lock()
	defer lanMu.Unlock()
	if lanStarted {
		return nil
	}
	ln, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%d", lanPort))
	if err != nil {
		return err
	}
	mux := http.NewServeMux()
	mux.HandleFunc("/ws", serveWS)
	mux.HandleFunc("/__net", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, map[string]any{"mode": "lan", "hosting": true, "port": lanPort, "has": hasRoom(r.URL.Query().Get("code"))})
	})
	mux.Handle("/", gameMux)
	go http.Serve(ln, mux)
	lanStarted = true
	return nil
}

// netHandlers are added to the launcher's own (this-computer-only) page.
func netHandlers(mux *http.ServeMux, gameMux http.Handler) {
	mux.HandleFunc("/__net", func(w http.ResponseWriter, r *http.Request) {
		lanMu.Lock()
		on := lanStarted
		lanMu.Unlock()
		writeJSON(w, map[string]any{"mode": "host", "hosting": on, "port": lanPort, "urls": lanAddresses()})
	})
	mux.HandleFunc("/__find", func(w http.ResponseWriter, r *http.Request) {
		if !isLoopback(r) {
			http.Error(w, "only this computer can do this", http.StatusForbidden)
			return
		}
		writeJSON(w, map[string]any{"hosts": findHosts(r.URL.Query().Get("self") == "1")})
	})
	mux.HandleFunc("/__tunnel", tunnel)
	mux.HandleFunc("/__locate", func(w http.ResponseWriter, r *http.Request) {
		if !isLoopback(r) {
			http.Error(w, "only this computer can do this", http.StatusForbidden)
			return
		}
		addr, why := locate(r.URL.Query().Get("code"))
		writeJSON(w, map[string]any{"addr": addr, "why": why})
	})
	mux.HandleFunc("/__host", func(w http.ResponseWriter, r *http.Request) {
		if !isLoopback(r) || r.Method != http.MethodPost {
			http.Error(w, "only the host computer can do this", http.StatusForbidden)
			return
		}
		if err := startLAN(gameMux); err != nil {
			writeJSON(w, map[string]any{"hosting": false, "error": err.Error()})
			return
		}
		writeJSON(w, map[string]any{"mode": "host", "hosting": true, "port": lanPort, "urls": lanAddresses()})
	})
}

// findHosts looks for other computers on this network that are hosting Checkfire: it tries every address in
// this computer's own neighbourhood (the usual 254) on the Checkfire port, all at once, for under a second.
func findHosts(includeSelf bool) []string {
	found := []string{}
	var mu sync.Mutex
	var wg sync.WaitGroup
	client := lanClient(700 * time.Millisecond)
	seen := map[string]bool{}
	ifs, _ := net.Interfaces()
	for _, in := range ifs {
		if in.Flags&net.FlagUp == 0 || in.Flags&net.FlagLoopback != 0 {
			continue
		}
		addrs, _ := in.Addrs()
		for _, a := range addrs {
			ipn, ok := a.(*net.IPNet)
			if !ok {
				continue
			}
			me := ipn.IP.To4()
			if me == nil || me.IsLinkLocalUnicast() {
				continue
			}
			for last := 1; last < 255; last++ {
				ip := net.IPv4(me[0], me[1], me[2], byte(last)).String()
				if seen[ip] || (ip == me.String() && !includeSelf) {
					continue
				}
				seen[ip] = true
				wg.Add(1)
				go func(ip string) {
					defer wg.Done()
					r, err := client.Get(fmt.Sprintf("http://%s:%d/__net", ip, lanPort))
					if err != nil {
						return
					}
					defer r.Body.Close()
					var v struct {
						Mode string `json:"mode"`
					}
					if json.NewDecoder(r.Body).Decode(&v) == nil && v.Mode == "lan" {
						mu.Lock()
						found = append(found, fmt.Sprintf("http://%s:%d", ip, lanPort))
						mu.Unlock()
					}
				}(ip)
			}
		}
	}
	wg.Wait()
	return found
}

// ---------------------------------------------------------------- WebSocket relay
func serveWS(w http.ResponseWriter, r *http.Request) {
	key := r.Header.Get("Sec-WebSocket-Key")
	if key == "" || !strings.EqualFold(r.Header.Get("Upgrade"), "websocket") {
		http.Error(w, "websocket only", http.StatusBadRequest)
		return
	}
	hj, ok := w.(http.Hijacker)
	if !ok {
		http.Error(w, "cannot upgrade", http.StatusInternalServerError)
		return
	}
	conn, rw, err := hj.Hijack()
	if err != nil {
		return
	}
	sum := sha1.Sum([]byte(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"))
	fmt.Fprintf(rw, "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: %s\r\n\r\n", base64.StdEncoding.EncodeToString(sum[:]))
	rw.Flush()
	p := &peer{c: conn}
	defer p.leave()
	for {
		msg, err := readFrame(rw.Reader, p)
		if err != nil {
			return
		}
		if strings.HasPrefix(msg, "!") {
			p.control(msg)
		} else if other := p.other(); other != nil {
			other.send(msg)
		}
	}
}

func (p *peer) send(msg string) {
	p.wmu.Lock()
	defer p.wmu.Unlock()
	writeFrame(p.c, 1, []byte(msg))
}

func (p *peer) other() *peer {
	roomsMu.Lock()
	defer roomsMu.Unlock()
	if p.room == nil {
		return nil
	}
	if p.room.a == p {
		return p.room.b
	}
	return p.room.a
}

// A game code is 6 letters. It carries the last two numbers of the host computer's network address plus a
// random part, so a player who types it into their own Checkfire.exe can be sent straight to the right
// computer: nobody has to read out an address, and nobody has to pick which computer "hosts".
const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ" // no I or O: easy to read out loud
const codeLen = 6

func encodeCode(ip net.IP) string {
	var r [2]byte
	rand.Read(r[:])
	var c, d uint32
	if ip4 := ip.To4(); ip4 != nil {
		c, d = uint32(ip4[2]), uint32(ip4[3])
	}
	v := c<<19 | d<<11 | (uint32(r[0])<<8|uint32(r[1]))&0x7ff
	b := make([]byte, codeLen)
	for i := codeLen - 1; i >= 0; i-- {
		b[i] = letters[v%24]
		v /= 24
	}
	return string(b)
}

// decodeCode returns the last two address numbers hidden in a code (ok is false for a mistyped code).
func decodeCode(code string) (c, d byte, ok bool) {
	code = normCode(code)
	if len(code) != codeLen {
		return 0, 0, false
	}
	var v uint32
	for _, ch := range code {
		i := strings.IndexRune(letters, ch)
		if i < 0 {
			return 0, 0, false
		}
		v = v*24 + uint32(i)
	}
	if v>>27 != 0 {
		return 0, 0, false
	}
	return byte(v >> 19), byte(v >> 11), true
}

// normCode upper-cases a typed code and drops spaces and dashes.
func normCode(s string) string {
	var b strings.Builder
	for _, ch := range strings.ToUpper(s) {
		if ch >= 'A' && ch <= 'Z' {
			b.WriteRune(ch)
		}
	}
	return b.String()
}

// primaryIP is the address this computer uses on its network (the one other computers can reach it on).
func primaryIP() net.IP {
	if c, err := net.Dial("udp4", "10.254.254.254:9"); err == nil { // nothing is sent: this only asks which address would be used
		ip := c.LocalAddr().(*net.UDPAddr).IP
		c.Close()
		if ip.To4() != nil && !ip.IsLoopback() {
			return ip
		}
	}
	for _, u := range lanAddresses() {
		h := strings.TrimSuffix(strings.TrimPrefix(u, "http://"), fmt.Sprintf(":%d", lanPort))
		if ip := net.ParseIP(h); ip != nil {
			return ip
		}
	}
	return nil
}

func hasRoom(code string) bool {
	roomsMu.Lock()
	defer roomsMu.Unlock()
	r := rooms[normCode(code)]
	return r != nil && r.a != nil && r.b == nil
}

// locate finds the computer holding a game code: first the address hidden in the code (tried with the first two
// numbers of each of this computer's own addresses), then this computer itself, then every computer nearby.
func locate(code string) (string, string) {
	code = normCode(code)
	c, d, ok := decodeCode(code)
	if !ok {
		return "", "bad"
	}
	if hasRoom(code) {
		return fmt.Sprintf("127.0.0.1:%d", lanPort), ""
	}
	client := lanClient(1500 * time.Millisecond)
	check := func(ip string) bool {
		r, err := client.Get(fmt.Sprintf("http://%s:%d/__net?code=%s", ip, lanPort, code))
		if err != nil {
			return false
		}
		defer r.Body.Close()
		var v struct {
			Mode string `json:"mode"`
			Has  bool   `json:"has"`
		}
		return json.NewDecoder(r.Body).Decode(&v) == nil && v.Mode == "lan" && v.Has
	}
	var cands []string
	seen := map[string]bool{}
	for _, me := range localIPv4s() {
		ip := net.IPv4(me[0], me[1], c, d).String()
		if !seen[ip] {
			seen[ip] = true
			cands = append(cands, ip)
		}
	}
	answer := make(chan string, len(cands))
	for _, ip := range cands {
		go func(ip string) {
			if check(ip) {
				answer <- ip
			} else {
				answer <- ""
			}
		}(ip)
	}
	reached := false
	for range cands {
		if ip := <-answer; ip != "" {
			return fmt.Sprintf("%s:%d", ip, lanPort), ""
		}
	}
	// the code's computer did not answer: maybe its address changed. Ask every computer nearby.
	for _, u := range findHosts(true) {
		h := strings.TrimPrefix(u, "http://")
		reached = true
		if check(strings.TrimSuffix(h, fmt.Sprintf(":%d", lanPort))) {
			return h, ""
		}
	}
	if reached {
		return "", "nocode"
	}
	return "", "nohost"
}

// tunnel carries a joining player's game connection from their own page (always on this computer, so no
// browser proxy or network rule can get in the way) to the Checkfire computer that holds the game.
func tunnel(w http.ResponseWriter, r *http.Request) {
	host, port, err := net.SplitHostPort(r.URL.Query().Get("to"))
	ip := net.ParseIP(host)
	if err != nil || !isLoopback(r) || ip == nil || ip.To4() == nil || port != fmt.Sprint(lanPort) || !(ip.IsPrivate() || ip.IsLoopback() || isLocalIP(ip)) {
		http.Error(w, "not allowed", http.StatusForbidden)
		return
	}
	remote, err := net.DialTimeout("tcp", net.JoinHostPort(host, port), 4*time.Second)
	if err != nil {
		http.Error(w, "could not reach the host", http.StatusBadGateway)
		return
	}
	hj, ok := w.(http.Hijacker)
	if !ok {
		remote.Close()
		http.Error(w, "cannot upgrade", http.StatusInternalServerError)
		return
	}
	conn, rw, err := hj.Hijack()
	if err != nil {
		remote.Close()
		return
	}
	// replay the browser's upgrade request to the host, then just pass bytes both ways
	fmt.Fprintf(remote, "GET /ws HTTP/1.1\r\nHost: %s\r\n", net.JoinHostPort(host, port))
	for k, vs := range r.Header {
		if strings.EqualFold(k, "Host") || strings.EqualFold(k, "Origin") {
			continue
		}
		for _, v := range vs {
			fmt.Fprintf(remote, "%s: %s\r\n", k, v)
		}
	}
	fmt.Fprint(remote, "\r\n")
	go func() {
		if n := rw.Reader.Buffered(); n > 0 {
			b, _ := rw.Reader.Peek(n)
			remote.Write(b)
		}
		io.Copy(remote, conn)
		remote.Close()
	}()
	io.Copy(conn, remote)
	conn.Close()
}

func isLocalIP(ip net.IP) bool {
	for _, me := range localIPv4s() {
		if me.Equal(ip) {
			return true
		}
	}
	return false
}

// lanClient talks to other computers on this network directly, never through a web proxy.
func lanClient(t time.Duration) *http.Client {
	return &http.Client{Timeout: t, Transport: &http.Transport{Proxy: nil, MaxIdleConnsPerHost: 1}}
}

func localIPv4s() []net.IP {
	var out []net.IP
	ifs, _ := net.Interfaces()
	for _, in := range ifs {
		if in.Flags&net.FlagUp == 0 || in.Flags&net.FlagLoopback != 0 {
			continue
		}
		addrs, _ := in.Addrs()
		for _, a := range addrs {
			if ipn, ok := a.(*net.IPNet); ok {
				if ip := ipn.IP.To4(); ip != nil && !ip.IsLinkLocalUnicast() {
					out = append(out, ip)
				}
			}
		}
	}
	return out
}

func (p *peer) control(msg string) {
	f := strings.Fields(msg)
	switch f[0] {
	case "!create":
		p.leave()
		roomsMu.Lock()
		ip := primaryIP()
		code := encodeCode(ip)
		for rooms[code] != nil {
			code = encodeCode(ip)
		}
		r := &room{code: code, a: p}
		rooms[code] = r
		p.room = r
		roomsMu.Unlock()
		p.send("!room " + code)
	case "!join":
		if len(f) < 2 {
			p.send("!err Type the 6-letter code first.")
			return
		}
		p.leave()
		roomsMu.Lock()
		r := rooms[normCode(f[1])]
		if r == nil || r.a == nil {
			roomsMu.Unlock()
			p.send("!err No game with that code. Check the letters and try again.")
			return
		}
		if r.b != nil {
			roomsMu.Unlock()
			p.send("!err That game already has two players.")
			return
		}
		r.b = p
		p.room = r
		host := r.a
		roomsMu.Unlock()
		host.send("!start w") // the player who made the game plays White
		p.send("!start b")
	case "!leave":
		p.leave()
	}
}

// leave takes the player out of their room and tells the other player.
func (p *peer) leave() {
	roomsMu.Lock()
	r := p.room
	if r == nil {
		roomsMu.Unlock()
		return
	}
	var other *peer
	if r.a == p {
		other = r.b
	} else {
		other = r.a
	}
	delete(rooms, r.code)
	p.room = nil
	if other != nil {
		other.room = nil
	}
	roomsMu.Unlock()
	if other != nil {
		other.send("!left")
	}
}

func readFrame(br *bufio.Reader, p *peer) (string, error) {
	var whole []byte
	for {
		h := make([]byte, 2)
		if _, err := io.ReadFull(br, h); err != nil {
			return "", err
		}
		fin, op := h[0]&0x80 != 0, h[0]&0x0f
		masked, n := h[1]&0x80 != 0, uint64(h[1]&0x7f)
		if n == 126 {
			b := make([]byte, 2)
			if _, err := io.ReadFull(br, b); err != nil {
				return "", err
			}
			n = uint64(binary.BigEndian.Uint16(b))
		} else if n == 127 {
			b := make([]byte, 8)
			if _, err := io.ReadFull(br, b); err != nil {
				return "", err
			}
			n = binary.BigEndian.Uint64(b)
		}
		if n > 1<<20 {
			return "", errors.New("message too large")
		}
		var mask [4]byte
		if masked {
			if _, err := io.ReadFull(br, mask[:]); err != nil {
				return "", err
			}
		}
		data := make([]byte, n)
		if _, err := io.ReadFull(br, data); err != nil {
			return "", err
		}
		if masked {
			for i := range data {
				data[i] ^= mask[i%4]
			}
		}
		switch op {
		case 8: // close
			return "", io.EOF
		case 9: // ping -> pong
			p.wmu.Lock()
			writeFrame(p.c, 10, data)
			p.wmu.Unlock()
			continue
		case 10:
			continue
		}
		whole = append(whole, data...)
		if fin {
			return string(whole), nil
		}
	}
}

func writeFrame(w io.Writer, op byte, data []byte) error {
	h := []byte{0x80 | op}
	switch n := len(data); {
	case n < 126:
		h = append(h, byte(n))
	case n < 65536:
		h = append(h, 126, byte(n>>8), byte(n))
	default:
		b := make([]byte, 8)
		binary.BigEndian.PutUint64(b, uint64(n))
		h = append(append(h, 127), b...)
	}
	_, err := w.Write(append(h, data...))
	return err
}
