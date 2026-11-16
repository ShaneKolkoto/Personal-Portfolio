# Shane Kolkoto — Developer Portfolio

A responsive personal portfolio built with Next.js, React, TypeScript, and
Tailwind CSS. The site presents professional experience, skills, education,
certifications, selected projects, testimonials, and a contact form. CV content
is loaded from Jadi rather than duplicated in the project.

## Features

- Server-rendered CV data with five-minute revalidation.
- Protected Jadi profile, project, and testimonial images served through a
  server-side image proxy.
- Responsive portfolio sections for about, skills, work history, education,
  certifications, projects, testimonials, and interests.
- Individual project and work-experience detail pages.
- Keyboard-accessible project carousel with pause-on-hover behavior.
- Contact form that validates submissions and sends them to Jadi using a
  server-side action.
- Per-page metadata and a generated sitemap.

## Jadi configuration

Set these variables in the deployment platform's **server-side environment**
(for example, Vercel Project Settings → Environment Variables), then redeploy.
Do not use a `NEXT_PUBLIC_` prefix or commit tokens to source control.

- `JADI_APP_BASE_URL`: the Jadi deployment origin, for example
  `https://jadi.example.com`. Do not append `/api/v1/cv`.
- `JADI_CV_API_TOKEN`: bearer token used to fetch CV data and protected images.
- `JADI_API_TOKEN`: optional dedicated token for contact submissions. If unset,
  the contact form uses `JADI_CV_API_TOKEN`.

The CV request is made server-side and cached for five minutes. Contact requests
are also sent server-side, so the Jadi tokens do not need a browser allowed
origin for this integration.

The contact notification is sent by Jadi through Resend. Configure
`RESEND_API_KEY` and `RESEND_FROM_EMAIL` in the **Jadi deployment**, and verify
the sender address/domain with Resend. A contact submission may be saved even
if notification delivery fails; the form warns visitors not to resubmit in
that case.

## Local development

Create a local `.env` file (ignored by Git) with the server-side Jadi settings:

```env
JADI_APP_BASE_URL=https://jadi.example.com
JADI_CV_API_TOKEN=your_server_side_token
# Optional; falls back to JADI_CV_API_TOKEN when omitted.
JADI_API_TOKEN=your_contact_token
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` — main portfolio.
- `/projects/[slug]` — project details.
- `/experience/[slug]` — work-experience details.
- `/api/cv-image` — server-side proxy for protected Jadi CV images.
- `/sitemap.xml` — generated sitemap.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```
