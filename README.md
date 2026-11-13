# Personal Portfolio

The home page displays the CV from Jadi. Configure these variables in the
deployment platform's server-side environment (for example, Vercel Project
Settings → Environment Variables), then redeploy:

- `JADI_APP_BASE_URL`: the Jadi deployment origin, such as
  `https://jadi.example.com` (do not include `/api/v1/cv`).
- `JADI_CV_API_TOKEN`: the bearer token. Keep it server-only; do not use a
  `NEXT_PUBLIC_` prefix or commit it to source control.
- `JADI_API_TOKEN`: an optional dedicated bearer token for the server-side
  contact form. If unset, the form reuses `JADI_CV_API_TOKEN`. Keep either
  token server-only; neither should use a `NEXT_PUBLIC_` prefix.

The CV is fetched server-side and cached for five minutes. Protected CV images
are streamed through `/api/cv-image`; the token is not sent to the browser. The
Jadi tokens' allowed-origin settings are only needed for direct browser
requests; this integration makes both CV and contact requests server-side.

The contact form calls the server action in `lib/contact.ts`, which validates
fields and forwards them to Jadi without exposing the token. Configure
`RESEND_API_KEY` and `RESEND_FROM_EMAIL` in the Jadi deployment and verify the
sender domain/address in Resend. A `502` submission can mean the message was
saved but its notification failed; the form advises against resubmitting to
avoid duplicates.