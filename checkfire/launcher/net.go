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
		writeJSON(w, map[string]any{"mode": "lan", "hosting": true, "port": lanPort})
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
	client := http.Client{Timeout: 700 * time.Millisecond}
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

func newCode() string {
	const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ" // no I or O: easy to read out loud
	b := make([]byte, 4)
	rand.Read(b)
	for i := range b {
		b[i] = letters[int(b[i])%len(letters)]
	}
	return string(b)
}

func (p *peer) control(msg string) {
	f := strings.Fields(msg)
	switch f[0] {
	case "!create":
		p.leave()
		roomsMu.Lock()
		code := newCode()
		for rooms[code] != nil {
			code = newCode()
		}
		r := &room{code: code, a: p}
		rooms[code] = r
		p.room = r
		roomsMu.Unlock()
		p.send("!room " + code)
	case "!join":
		if len(f) < 2 {
			p.send("!err Type the 4-letter code first.")
			return
		}
		p.leave()
		roomsMu.Lock()
		r := rooms[strings.ToUpper(f[1])]
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
