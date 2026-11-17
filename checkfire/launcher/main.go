// Checkfire launcher: one Windows .exe that carries the whole game.
//
// It serves the built-in game page on this computer only (127.0.0.1) and opens it in its own window
// (Microsoft Edge or Chrome in "app" mode, with a private profile so saved games and unlocks are kept
// between runs). If neither browser is found it opens the default browser instead. Nothing is installed
// and nothing is sent over the network. The launcher closes itself shortly after the game window closes.
//
// Build:  ./build_exe.sh   (copies ../index.html in and cross-compiles for 64-bit Windows)
package main

import (
	_ "embed"
	"fmt"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"sync/atomic"
	"time"
)

//go:embed index.html
var page []byte

// A fixed port keeps the page's address the same every run, which is what keeps the saved game and unlocks.
var ports = []int{47616, 47617, 47618, 47619}

const marker = "checkfire-launcher"
const heartbeat = `<script>setInterval(function(){fetch('/__alive').catch(function(){})},4000)</script>`

func main() {
	// Already running? Then just open another window on it.
	for _, p := range ports {
		if isOurs(p) {
			openWindow(fmt.Sprintf("http://127.0.0.1:%d/", p), false)
			return
		}
	}
	var ln net.Listener
	var port int
	for _, p := range ports {
		l, err := net.Listen("tcp", fmt.Sprintf("127.0.0.1:%d", p))
		if err == nil {
			ln, port = l, p
			break
		}
	}
	if ln == nil {
		os.Exit(1)
	}
	html := []byte(strings.Replace(string(page), "</body>", heartbeat+"</body>", 1))
	if !strings.Contains(string(html), heartbeat) {
		html = append(html, []byte(heartbeat)...)
	}
	var last atomic.Int64
	last.Store(time.Now().Unix())
	mux := http.NewServeMux()
	mux.HandleFunc("/__alive", func(w http.ResponseWriter, r *http.Request) {
		last.Store(time.Now().Unix())
		w.Header().Set("Cache-Control", "no-store")
		fmt.Fprint(w, marker)
	})
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" && r.URL.Path != "/index.html" {
			http.NotFound(w, r)
			return
		}
		last.Store(time.Now().Unix())
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("Cache-Control", "no-store")
		w.Write(html)
	})
	netHandlers(mux, mux) // same-network multiplayer: see net.go
	go http.Serve(ln, mux)

	done := openWindow(fmt.Sprintf("http://127.0.0.1:%d/", port), true)
	// Stop when the game window is closed (its own browser process ended), or when the page has been
	// silent for a while (closed tab in the default browser). Hidden tabs slow their timers, so be patient.
	for {
		select {
		case <-done:
			time.Sleep(1500 * time.Millisecond)
			if time.Now().Unix()-last.Load() > 6 {
				return
			}
			done = nil // another window is still talking to us: fall back to the silence check
		case <-time.After(5 * time.Second):
			if time.Now().Unix()-last.Load() > 180 {
				return
			}
		}
	}
}

func isOurs(port int) bool {
	c := http.Client{Timeout: 400 * time.Millisecond}
	r, err := c.Get(fmt.Sprintf("http://127.0.0.1:%d/__alive", port))
	if err != nil {
		return false
	}
	defer r.Body.Close()
	b := make([]byte, len(marker))
	n, _ := r.Body.Read(b)
	return string(b[:n]) == marker
}

// openWindow opens the game. The returned channel closes when a window we own has been closed
// (nil if we could not own one, e.g. the default browser was used).
func openWindow(url string, wait bool) <-chan struct{} {
	if runtime.GOOS == "windows" {
		profile := filepath.Join(os.Getenv("LOCALAPPDATA"), "Checkfire", "window")
		for _, exe := range browsers() {
			if _, err := os.Stat(exe); err != nil {
				continue
			}
			os.MkdirAll(profile, 0o755)
			cmd := exec.Command(exe, "--app="+url, "--user-data-dir="+profile, "--no-first-run", "--no-default-browser-check",
				"--window-size=1366,820", "--disable-features=Translate")
			if err := cmd.Start(); err != nil {
				continue
			}
			if !wait {
				return nil
			}
			ch := make(chan struct{})
			go func() { cmd.Wait(); close(ch) }()
			return ch
		}
		exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
		return nil
	}
	// other systems (used for testing the launcher itself)
	opener := "xdg-open"
	if runtime.GOOS == "darwin" {
		opener = "open"
	}
	exec.Command(opener, url).Start()
	return nil
}

func browsers() []string {
	var out []string
	for _, root := range []string{os.Getenv("ProgramFiles(x86)"), os.Getenv("ProgramFiles"), os.Getenv("LOCALAPPDATA")} {
		if root == "" {
			continue
		}
		out = append(out, filepath.Join(root, "Microsoft", "Edge", "Application", "msedge.exe"))
	}
	for _, root := range []string{os.Getenv("ProgramFiles"), os.Getenv("ProgramFiles(x86)"), os.Getenv("LOCALAPPDATA")} {
		if root == "" {
			continue
		}
		out = append(out, filepath.Join(root, "Google", "Chrome", "Application", "chrome.exe"))
	}
	return out
}
