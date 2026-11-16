# Album Studio relay

Album Studio is a plain web page, so it cannot keep an API key secret. This
relay is a tiny service that holds your keys. A student's browser sends the
relay their 10 lines (or their cover description) plus the class code; the
relay asks the AI and sends the result back. Students never see a key.

- Lyrics are written by Claude (your Anthropic API key).
- Cover pictures are made by OpenAI (your OpenAI API key).

## Set it up (about 10 minutes, free Cloudflare account)

1. Go to <https://dash.cloudflare.com> and sign up or sign in.
2. Open **Workers & Pages**, choose **Create**, then **Create Worker**
   (the "Hello World" starter). Name it `album-studio-relay` and press **Deploy**.
3. Press **Edit code**. Delete everything in the editor, paste in all of
   [`worker.js`](worker.js), and press **Deploy**.
4. Go back to the worker, open **Settings**, then **Variables and Secrets**.
   Add these three, each with type **Secret**:

   | Name | Value |
   | --- | --- |
   | `ANTHROPIC_API_KEY` | your Claude API key |
   | `OPENAI_API_KEY` | your OpenAI API key |
   | `CLASS_CODE` | a word you will give your students, like `bluejay42` |

5. Copy the worker's address. It looks like
   `https://album-studio-relay.YOURNAME.workers.dev`.
6. Open `album-studio/index.html`, find the line `var RELAY_URL = '';` near the
   top of the script, and put the address between the quotes.

Opening the worker's address in a browser should show
`{"ok":true,"service":"Album Studio relay"}`.

## Good to know

- **Class code.** Students type it once per computer. Change `CLASS_CODE` in
  Cloudflare any time to lock everyone out (for example, when the project ends).
  Capital letters do not matter.
- **Which site can use it.** By default only `https://morrfish.github.io` can
  call the relay from a browser. If Album Studio is served from somewhere else,
  add a plain-text variable `ALLOWED_ORIGIN` with that site's address.
- **Cost.** Every "Finish my song" and "Make my cover" press spends a little of
  your API credit. The page allows 5 covers per album, but that limit lives in
  the student's browser, so also set a monthly spending limit in your Anthropic
  and OpenAI accounts.
- **If covers stop working.** OpenAI renames its image models from time to
  time. Add a plain-text variable `IMAGE_MODEL` with the current model name
  from OpenAI's image generation docs.
- **Seeing errors.** In Cloudflare, open the worker and choose **Logs** to see
  what the AI service said when something fails.
