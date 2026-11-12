# ClockedIn: email connection setup (for district IT)

ClockedIn is a work-based learning hours tracker. Students email their hours to their
WBL supervisor. The supervisor's **Check email** button pulls those emails into the
ClockedIn supervisor app, which keeps its records in a folder on the school computer or
network drive.

For the button to work, the district registers ClockedIn **once** with Google or
Microsoft. It's free and takes about 10 minutes. The result is a **client ID**, which is
not a secret. The supervisor enters it under **Settings → Email connection**.

## What access ClockedIn gets
- **Read-only** mail access for the supervisor who signs in:
  - Google: `gmail.readonly`
  - Microsoft: `Mail.Read` and `User.Read`
- It can't send, delete or change email.
- It only searches for ClockedIn messages: attachments named `ClockedIn_*.txt`, or emails
  containing ClockedIn data.
- Sign-in runs in a Google/Microsoft popup, in the browser. The access token stays in the
  page's memory and is discarded when the page closes.
- There is **no ClockedIn server**:
  - no refresh tokens are kept
  - no client secret is used
  - no data is sent anywhere except from the mailbox to the supervisor's own records folder
- The app is static HTML/JavaScript served from GitHub Pages, and the source is public:
  <https://github.com/Morrfish/PassionsPathways/tree/main/wbl-tracker>.

## Values you'll need

| School | Sign-in return address (redirect URI) |
|---|---|
| Greene County Career Center | `https://morrfish.github.io/PassionsPathways/wbl-tracker/dist/greene-ccc/supervisor/oauth-callback.html` |
| Millstream Career Center | `https://morrfish.github.io/PassionsPathways/wbl-tracker/dist/millstream-cc/supervisor/oauth-callback.html` |
| Tri-County Career Center | `https://morrfish.github.io/PassionsPathways/wbl-tracker/dist/tri-county/supervisor/oauth-callback.html` |
| Unbranded / testing | `https://morrfish.github.io/PassionsPathways/wbl-tracker/dist/default/supervisor/oauth-callback.html` |

- **JavaScript origin (Google only):** `https://morrfish.github.io`
- The supervisor app also shows its return address under **Settings → Email connection**.
- Supervisors must open the app from its web address, for example
  `https://morrfish.github.io/PassionsPathways/wbl-tracker/dist/greene-ccc/supervisor/ClockedIn%20Supervisor.html`.
  A saved copy of the file can't sign in.

---

## Option 1: Google Workspace (Gmail)

Use an account in the district's Google Workspace with permission to create Cloud projects.

1. Go to <https://console.cloud.google.com/> and create a project named **ClockedIn**.
2. **APIs & Services → Library**: search for **Gmail API** and click **Enable**.
3. **Google Auth Platform** (or **OAuth consent screen**):
   - **Audience / User type:** **Internal**. Only accounts in your district can sign in, and
     Google app verification isn't required.
   - App name **ClockedIn**, support email: yours.
   - **Data access / Scopes:** add `https://www.googleapis.com/auth/gmail.readonly`.
4. **Clients** (or **Credentials → Create credentials → OAuth client ID**):
   - Application type: **Web application**. Name: **ClockedIn Supervisor**.
   - **Authorized JavaScript origins:** `https://morrfish.github.io`
   - **Authorized redirect URIs:** the return address from the table above.
   - Click **Create** and copy the **Client ID** (ends in `.apps.googleusercontent.com`).
5. If your Admin console restricts third-party app access (**Security → Access and data
   control → API controls**), mark the ClockedIn client ID as **Trusted**.
6. Give the supervisor the Client ID. They choose **Google** under **Settings → Email
   connection**, paste it, and click **Save**.

## Option 2: Microsoft 365 (Outlook)

Use an account that can register applications in Microsoft Entra ID.

1. Go to <https://entra.microsoft.com/> → **Identity → Applications → App registrations →
   New registration**.
   - Name: **ClockedIn**
   - Supported account types: **Accounts in this organizational directory only** (single tenant)
   - Redirect URI: platform **Single-page application (SPA)**, URL from the table above.
     It must be **SPA**, not "Web".
   - Click **Register**.
2. **API permissions → Add a permission → Microsoft Graph → Delegated permissions**: add
   **Mail.Read** and **User.Read**. Then click **Grant admin consent** so supervisors aren't
   asked to approve it themselves.
3. **Authentication:**
   - Confirm the SPA redirect URI is listed.
   - Leave implicit grant **off**. ClockedIn uses authorization code + PKCE.
   - No client secret is needed.
4. On the **Overview** page, copy the **Application (client) ID** and the **Directory
   (tenant) ID**.
5. Give both to the supervisor. They choose **Microsoft 365** under **Settings → Email
   connection** and paste the two IDs.

---

## Setting it for every supervisor at a school (optional)
Send the client ID (and, for Microsoft, the tenant ID) to the person who maintains ClockedIn.
They can add it to the school's `wbl-tracker/brands/<school>/brand.json`:
```json
"email": {
  "provider": "microsoft",
  "microsoftClientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "microsoftTenant": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"
}
```
or, for Google:
```json
"email": { "provider": "google", "googleClientId": "1234567890-abc.apps.googleusercontent.com" }
```
After the rebuild, new supervisors at that school start with email already set up.

## Troubleshooting
| Message | Fix |
|---|---|
| `redirect_uri_mismatch` (Google) or `AADSTS50011` (Microsoft) | The return address in the registration must match the table exactly, including `https://` and the `.html` ending. |
| Google says "app is blocked" / "access denied" | Mark the app **Trusted** in API controls, and check the consent screen is **Internal**. |
| `AADSTS65001` / "need admin approval" (Microsoft) | **Grant admin consent** for Mail.Read and User.Read. |
| `AADSTS9002326` / cross-origin token error (Microsoft) | The redirect URI was added as **Web**. Remove it and add it under **Single-page application**. |
| "The sign-in window was blocked" | Allow pop-ups for `morrfish.github.io` in the browser. |
