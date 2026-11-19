// Wild Tag: online multiplayer with room codes (PeerJS, peer-to-peer).
// The host's browser runs the round, the bots and the tagging. Everyone else sends their own position.
'use strict';

const Net = {
  peer: null, online: false, isHost: false, myId: null, code: null,
  conns: {},          // host: peerId -> DataConnection
  hostConn: null,     // client: connection to host
  onMessage: null, onJoin: null, onLeave: null, onStatus: null,
  PREFIX: 'wildtag-v1-',

  _status(s, err) { if (this.onStatus) this.onStatus(s, err); },

  host(done) {
    this.leave();
    const code = Array.from({ length: 5 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.random() * 32 | 0]).join('');
    let peer;
    try { peer = new Peer(this.PREFIX + code); } catch (e) { this._status('error', 'Online play could not start: ' + e.message); return; }
    this.peer = peer; this._status('connecting');
    peer.on('open', id => {
      this.online = true; this.isHost = true; this.myId = id; this.code = code;
      this._status('hosting'); done && done(code);
    });
    peer.on('connection', conn => {
      conn.on('open', () => { this.conns[conn.peer] = conn; this.onJoin && this.onJoin(conn.peer); });
      conn.on('data', d => this.onMessage && this.onMessage(conn.peer, d));
      conn.on('close', () => { delete this.conns[conn.peer]; this.onLeave && this.onLeave(conn.peer); });
      conn.on('error', () => { delete this.conns[conn.peer]; this.onLeave && this.onLeave(conn.peer); });
    });
    peer.on('error', e => { this._status('error', niceNetError(e)); if (!this.online) this.leave(true); });
    peer.on('disconnected', () => { if (this.online && this.peer === peer) { try { peer.reconnect(); } catch (e) { } } });
  },

  join(code, done) {
    this.leave();
    code = code.trim().toUpperCase();
    let peer;
    try { peer = new Peer(); } catch (e) { this._status('error', 'Online play could not start: ' + e.message); return; }
    this.peer = peer; this._status('connecting');
    peer.on('open', id => {
      this.myId = id;
      const conn = peer.connect(this.PREFIX + code, { reliable: false, serialization: 'json' });
      const timer = setTimeout(() => { if (!this.online) this._status('error', 'No room found with code ' + code + '. Check the code and that the host is still in the room.'); }, 9000);
      conn.on('open', () => { clearTimeout(timer); this.hostConn = conn; this.online = true; this.isHost = false; this.code = code; this._status('joined'); done && done(); });
      conn.on('data', d => this.onMessage && this.onMessage('host', d));
      conn.on('close', () => { this._status('error', 'The host left the room.'); this.leave(true); });
    });
    peer.on('error', e => { this._status('error', niceNetError(e, code)); if (!this.online) this.leave(true); });
  },

  send(msg) { if (this.hostConn && this.hostConn.open) this.hostConn.send(msg); },
  sendTo(id, msg) { const c = this.conns[id]; if (c && c.open) c.send(msg); },
  broadcast(msg) { for (const id in this.conns) { const c = this.conns[id]; if (c.open) c.send(msg); } },
  count() { return Object.keys(this.conns).length; },

  leave(quiet) {
    if (this.peer) { try { this.peer.destroy(); } catch (e) { } }
    this.peer = null; this.online = false; this.isHost = false; this.conns = {}; this.hostConn = null; this.code = null;
    if (!quiet) this._status('offline');
  },
};

function niceNetError(e, code) {
  const t = e && e.type;
  if (t === 'peer-unavailable') return 'No room found with code ' + (code || '') + '.';
  if (t === 'network' || t === 'server-error' || t === 'socket-error') return 'Could not reach the online game server. Your network may block it. Solo mode still works!';
  if (t === 'unavailable-id') return 'That room code is taken. Try hosting again.';
  if (t === 'browser-incompatible') return 'This browser cannot do online play.';
  return 'Online error: ' + (e && (e.message || t) || 'unknown');
}
