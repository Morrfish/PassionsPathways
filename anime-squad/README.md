# Anime Squad

Make bots from anime characters, give each one a job, and talk to them. Each bot talks like its
character and does real work: it keeps a to-do list, saves notes and plans, and can search the web.
It runs on Android (APK), on Windows (exe) and in a web browser.

## How it works
1. **Pick a character.** There are 50 built in from 28 anime. You can also add **any** character:
   type a name and Claude writes their personality and how they talk. You can edit it before saving.
2. **Give them a job.** Pick one of 17 jobs (fitness coach, tutor, budget, chores, coding…) or type your own.
3. **Chat.** You can make as many bots as you like, including more than one from the same character
   (for example "Gym Goku" and "Chef Goku").

Tasks and notes the bots make show up in the **Tasks** and **Notes** tabs, and all your bots share them.

## What you need
A Claude API key from [console.anthropic.com](https://console.anthropic.com/settings/keys). Put it in
**Settings**. It is saved only on your device and sent only to Anthropic. Anthropic bills the key for
what the bots use. In Settings you can switch the "brain" to a cheaper model.

Everything else (bots, chats, tasks, notes) stays on the device. Use **Settings → Backup** to move it
between your phone and computer.

## Getting the apps
Every push that changes `anime-squad/` runs the **Anime Squad apps** GitHub Action. Open the run
page in the repo's **Actions** tab and download:
- **AnimeSquad-Android**: unzip it to get `AnimeSquad.apk`. Copy it to your phone, open it, and allow
  "install unknown apps" when Android asks.
- **AnimeSquad-Windows**: unzip it to get `AnimeSquad.exe`. Windows may say it's from an unknown
  publisher; click **More info → Run anyway**.

## Adding characters and jobs in the code
- Characters: `src/data/characters.js`. Copy an entry and change it. The fields are explained at the top of the file.
- Jobs: `src/data/jobs.js`.

## Developer commands
```bash
npm install
npm run build          # builds www/
npm test               # builds, then runs tests/e2e.mjs in Chromium against a fake Claude API
cd desktop && npm install && npm start   # run the desktop app
```
Folders: `src/` app source, `assets/` icon and splash for Android, `desktop/` Electron shell,
`tests/` browser test. `www/` and `android/` are generated.
