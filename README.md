# Jeeni Shrestha — Portfolio

A one-page developer portfolio positioning Jeeni as a full-stack developer with hands-on AI/ML experience. Dark theme, serif/sans type pairing, single terracotta accent, subtle scroll-reveal animation.

## Tech stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (utility classes + a handful of custom utilities in `src/index.css`)
- **Animation:** Framer Motion (scroll-reveal via `react-intersection-observer`, respects `prefers-reduced-motion` through `MotionConfig`)
- **Icons:** lucide-react
- **Contact form:** EmailJS (client-side, no backend)
- **Linting:** ESLint (flat config)

---

## Getting started

### Prerequisites
- Node.js v18+
- npm v9+

### Install & run

```bash
npm install
npm run dev
```

Visit **http://localhost:5173**.

### Other scripts

```bash
npm run build    # production build -> dist/
npm run preview  # serve the production build locally
npm run lint      # ESLint
```

---

## Deploying to Vercel

### Option 1 — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel          # preview deploy
vercel --prod   # production deploy
```

### Option 2 — GitHub integration

1. Push this repo to GitHub
2. [vercel.com](https://vercel.com) → **New Project** → import the repo
3. Vercel auto-detects Vite — click **Deploy**

### Custom domain (jeenishrestha.com.np)

1. Vercel project → **Settings → Domains** → add `jeenishrestha.com.np` and `www.jeenishrestha.com.np`
2. At your domain registrar, add:

   | Type  | Name | Value |
   |-------|------|-------|
   | A     | @    | 76.76.21.21 |
   | CNAME | www  | cname.vercel-dns.com |

3. DNS propagation can take up to 48 hours; Vercel auto-provisions SSL once it verifies.

---

## Editing content

Nearly all text on the site — hero copy, about, tech stack, experience, projects, achievements, leadership, education, certifications, socials — lives in **`src/data/content.js`**. Components read from it; you shouldn't need to touch component files for a copy change.

A `[TODO: ...]` placeholder anywhere on the site (e.g. the Experience dates) means real content hasn't been filled in yet — it renders as a visible dashed rust-colored tag so it's easy to spot. Search `content.js` for `TODO` to find every one.

### Adding a certificate/achievement image

1. Drop the image in `src/assets/certificates/` or `src/assets/achievements/`
2. Compress it first (see below) — the existing images are all WebP, ≤800px wide
3. Import it at the top of `src/data/content.js` and reference it in the relevant entry's `image` field

### Compressing images

```bash
npm install --no-save sharp   # sharp is intentionally not a saved dependency
node scripts/compress-images.mjs
```

Converts everything in `src/assets/achievements/` and `src/assets/certificates/` to WebP (≤800px wide, quality 80).

### Contact form (EmailJS)

Config lives in `src/components/ContactModal.jsx` (`EMAILJS_CONFIG`). To use your own EmailJS account: create a service + template at [emailjs.com](https://emailjs.com) (template needs `{{name}}`, `{{email}}`, `{{message}}` variables), then swap in your `SERVICE_ID`, `TEMPLATE_ID`, and `PUBLIC_KEY`.

---

## Project structure

```
Portfolio/
├── public/
│   ├── favicon.svg
│   └── Jeeni_Shrestha_CV.pdf   ← referenced by the Download CV button; add this file
├── src/
│   ├── data/
│   │   └── content.js           ← all site copy/data lives here
│   ├── hooks/
│   │   └── useModalA11y.js      ← shared modal a11y (focus trap, Escape, focus restore)
│   ├── assets/
│   │   ├── me/, achievements/, certificates/, techStack/
│   ├── components/
│   │   ├── Navbar.jsx, Footer.jsx, SectionWrapper.jsx
│   │   ├── FloatingContact.jsx, ContactModal.jsx, CertModal.jsx
│   ├── sections/
│   │   ├── Hero.jsx, About.jsx, TechStack.jsx, Experience.jsx,
│   │   │   Projects.jsx, Achievements.jsx, Leadership.jsx, Education.jsx
│   ├── App.jsx, index.css, main.jsx
├── scripts/
│   ├── compress-images.mjs      ← one-off: JPG/PNG -> WebP (needs sharp, not a saved dep)
│   └── cdp-screenshot.mjs       ← one-off: screenshot the dev/preview server via DevTools
│                                   Protocol (Node's native WebSocket, no extra dependency)
├── eslint.config.js
├── index.html
├── tailwind.config.js
└── vite.config.js
```

---

## License

MIT — free to use and adapt.
