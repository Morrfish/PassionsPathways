/*
 * Email connector for the supervisor app: reads ClockedIn submissions straight
 * from the supervisor's school mailbox (Google Gmail or Microsoft 365).
 *
 * - Read-only access (Gmail: gmail.readonly; Microsoft: Mail.Read).
 * - Sign-in happens in a popup run by Google/Microsoft. The access token lives
 *   only in this page's memory and is gone when the page closes. Nothing is
 *   stored or sent anywhere else.
 * - The district registers the app once (free) and gets a "client ID". See
 *   docs/email-setup.md. The client ID is not a secret.
 *
 * window.WBLMail.fetchSubmissions({ provider, clientId, tenant, since, max })
 *   -> { account, items: [{ name, text, messageId }], scanned, more }
 */
(function () {
  'use strict';

  const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/gmail.readonly';
  const MS_SCOPE = 'https://graph.microsoft.com/Mail.Read https://graph.microsoft.com/User.Read';
  const FILE_RE = /^(ClockedIn|WBL)_.*\.(txt|wbl|json)$/i;
  const tokens = {}; // provider -> { token, exp, account }

  function redirectUri() { return new URL('oauth-callback.html', location.href).href.split('#')[0].split('?')[0]; }
  function canUse() { return location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1'; }

  function b64url(bytes) { return btoa(String.fromCharCode.apply(null, Array.from(bytes))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function randomString(n) { const a = new Uint8Array(n); crypto.getRandomValues(a); return b64url(a); }
  function decodeB64(s) {
    s = String(s).replace(/-/g, '+').replace(/_/g, '/').replace(/\s+/g, '');
    while (s.length % 4) s += '=';
    const bin = atob(s); const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(out);
  }

  /** Open a sign-in popup and wait until it comes back to our callback page. */
  function popupAuth(url, popup) {
    return new Promise((resolve, reject) => {
      const w = popup || window.open('', 'clockedin-signin', 'width=520,height=680');
      if (!w) return reject(new Error('The sign-in window was blocked. Allow pop-ups for this page and try again.'));
      w.location.href = url;
      const started = Date.now();
      const timer = setInterval(() => {
        if (w.closed) { clearInterval(timer); return reject(new Error('Sign-in window was closed.')); }
        let href = '';
        try { href = w.location.href; } catch (e) { return; } // still on Google/Microsoft
        if (href && href.startsWith(redirectUri())) {
          clearInterval(timer); w.close(); resolve(new URL(href));
        }
        if (Date.now() - started > 5 * 60 * 1000) { clearInterval(timer); w.close(); reject(new Error('Sign-in timed out.')); }
      }, 300);
    });
  }

  // ---------------- Google ----------------
  async function googleToken(cfg, popup) {
    const t = tokens.google;
    if (t && t.exp > Date.now() + 60000) return t;
    const state = randomString(12);
    const u = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    u.search = new URLSearchParams({ client_id: cfg.clientId, redirect_uri: redirectUri(), response_type: 'token', scope: GOOGLE_SCOPE,
      state, include_granted_scopes: 'true', prompt: 'select_account' }).toString();
    const back = await popupAuth(u.href, popup);
    const p = new URLSearchParams(back.hash.slice(1) || back.search.slice(1));
    if (p.get('error')) throw new Error('Google sign-in failed: ' + p.get('error'));
    if (p.get('state') !== state) throw new Error('Sign-in response did not match. Try again.');
    tokens.google = { token: p.get('access_token'), exp: Date.now() + (Number(p.get('expires_in')) || 3600) * 1000 };
    const prof = await gget('https://gmail.googleapis.com/gmail/v1/users/me/profile');
    tokens.google.account = prof.emailAddress;
    return tokens.google;
  }
  async function gget(url) {
    const r = await fetch(url, { headers: { Authorization: 'Bearer ' + tokens.google.token } });
    if (r.status === 401) { delete tokens.google; throw new Error('Your Google sign-in expired. Click again to sign in.'); }
    if (!r.ok) throw new Error('Gmail error ' + r.status + ': ' + (await r.text()).slice(0, 200));
    return r.json();
  }
  async function googleFetch(cfg, since, max, popup) {
    const t = await googleToken(cfg, popup);
    const d = new Date(since);
    const after = d.getUTCFullYear() + '/' + (d.getUTCMonth() + 1) + '/' + d.getUTCDate();
    const q = '(filename:ClockedIn OR filename:WBL OR ClockedIn OR WBLDATA) after:' + after;
    const ids = []; let pageToken = '';
    do {
      const r = await gget('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=100&q=' + encodeURIComponent(q) + (pageToken ? '&pageToken=' + pageToken : ''));
      (r.messages || []).forEach(m => ids.push(m.id));
      pageToken = r.nextPageToken || '';
    } while (pageToken && ids.length < max);
    const items = [];
    for (const id of ids.slice(0, max)) {
      const m = await gget('https://gmail.googleapis.com/gmail/v1/users/me/messages/' + id + '?format=full');
      const parts = []; (function walk(p) { if (!p) return; parts.push(p); (p.parts || []).forEach(walk); })(m.payload);
      for (const p of parts) {
        if (p.filename && FILE_RE.test(p.filename)) {
          const data = p.body && p.body.data ? p.body.data : (await gget('https://gmail.googleapis.com/gmail/v1/users/me/messages/' + id + '/attachments/' + p.body.attachmentId)).data;
          items.push({ name: p.filename, text: decodeB64(data), messageId: id });
        } else if (!p.filename && p.mimeType === 'text/plain' && p.body && p.body.data) {
          const text = decodeB64(p.body.data);
          if (text.includes('WBLDATA:')) items.push({ name: 'Email text', text, messageId: id });
        }
      }
    }
    return { account: t.account, items, scanned: Math.min(ids.length, max), more: ids.length > max };
  }

  // ---------------- Microsoft 365 ----------------
  async function msToken(cfg, popup) {
    const t = tokens.microsoft;
    if (t && t.exp > Date.now() + 60000) return t;
    const tenant = encodeURIComponent(cfg.tenant || 'organizations');
    const verifier = randomString(48);
    const challenge = b64url(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))));
    const state = randomString(12);
    const u = new URL('https://login.microsoftonline.com/' + tenant + '/oauth2/v2.0/authorize');
    u.search = new URLSearchParams({ client_id: cfg.clientId, response_type: 'code', redirect_uri: redirectUri(), response_mode: 'fragment',
      scope: MS_SCOPE, state, code_challenge: challenge, code_challenge_method: 'S256', prompt: 'select_account' }).toString();
    const back = await popupAuth(u.href, popup);
    const p = new URLSearchParams(back.hash.slice(1) || back.search.slice(1));
    if (p.get('error')) throw new Error('Microsoft sign-in failed: ' + (p.get('error_description') || p.get('error')));
    if (p.get('state') !== state) throw new Error('Sign-in response did not match. Try again.');
    const r = await fetch('https://login.microsoftonline.com/' + tenant + '/oauth2/v2.0/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: cfg.clientId, grant_type: 'authorization_code', code: p.get('code'), redirect_uri: redirectUri(), code_verifier: verifier, scope: MS_SCOPE })
    });
    const j = await r.json();
    if (!r.ok) throw new Error('Microsoft sign-in failed: ' + (j.error_description || j.error || r.status));
    tokens.microsoft = { token: j.access_token, exp: Date.now() + (Number(j.expires_in) || 3600) * 1000 };
    const me = await mget('https://graph.microsoft.com/v1.0/me?$select=mail,userPrincipalName');
    tokens.microsoft.account = me.mail || me.userPrincipalName;
    return tokens.microsoft;
  }
  async function mget(url, headers) {
    const r = await fetch(url, { headers: Object.assign({ Authorization: 'Bearer ' + tokens.microsoft.token }, headers || {}) });
    if (r.status === 401) { delete tokens.microsoft; throw new Error('Your Microsoft sign-in expired. Click again to sign in.'); }
    if (!r.ok) throw new Error('Outlook error ' + r.status + ': ' + (await r.text()).slice(0, 200));
    return r.json();
  }
  async function msFetch(cfg, since, max, popup) {
    const t = await msToken(cfg, popup);
    const G = 'https://graph.microsoft.com/v1.0/me/messages';
    let url = G + '?$filter=' + encodeURIComponent('receivedDateTime ge ' + new Date(since).toISOString()) +
      '&$orderby=receivedDateTime desc&$select=id,hasAttachments,bodyPreview,subject&$top=50';
    const msgs = [];
    while (url && msgs.length < max * 4) {
      const r = await mget(url);
      msgs.push(...(r.value || []));
      url = r['@odata.nextLink'] || '';
    }
    const items = []; let scanned = 0;
    const likely = msgs.filter(m => m.hasAttachments || /ClockedIn|WBLDATA/.test((m.subject || '') + ' ' + (m.bodyPreview || '')));
    for (const m of likely.slice(0, max)) {
      scanned++;
      let found = false;
      if (m.hasAttachments) {
        const a = await mget(G + '/' + m.id + '/attachments');
        for (const at of a.value || []) {
          if (at.contentBytes && FILE_RE.test(at.name || '')) { items.push({ name: at.name, text: decodeB64(at.contentBytes), messageId: m.id }); found = true; }
        }
      }
      if (!found && /ClockedIn|WBLDATA/.test((m.subject || '') + ' ' + (m.bodyPreview || ''))) {
        const full = await mget(G + '/' + m.id + '?$select=body', { Prefer: 'outlook.body-content-type="text"' });
        const text = full.body && full.body.content || '';
        if (text.includes('WBLDATA:')) items.push({ name: 'Email text', text, messageId: m.id });
      }
    }
    return { account: t.account, items, scanned, more: likely.length > max || !!url };
  }

  /** Must be called from a click so the sign-in popup isn't blocked. */
  function needsPopup(provider) { const t = tokens[provider]; return !(t && t.exp > Date.now() + 60000); }

  async function fetchSubmissions(opts) {
    if (!canUse()) throw new Error('Email can only be connected when the supervisor app is opened from its web address (https://…), not from a saved file.');
    if (!opts.clientId) throw new Error('Email isn\'t set up yet. Enter the client ID from your district IT under Settings → Email connection.');
    const max = opts.max || 300;
    if (opts.provider === 'google') return googleFetch(opts, opts.since, max, opts.popup);
    if (opts.provider === 'microsoft') return msFetch(opts, opts.since, max, opts.popup);
    throw new Error('Choose Google or Microsoft under Settings → Email connection.');
  }
  function account(provider) { return tokens[provider] && tokens[provider].account || ''; }
  function signOut() { Object.keys(tokens).forEach(k => delete tokens[k]); }

  window.WBLMail = { fetchSubmissions, needsPopup, account, signOut, redirectUri, canUse };
})();
