# Dr. Sampoorna · Personal Brand Website

Production-grade Next.js 14 site for **Dr. Sampoorna** — PhD Scholar in Yogic Science, Founder of Cosmia Wellness, Creator of the Sampoorna Fertility Yoga (SFY) Protocol.

> "The body keeps a record. Yoga is the patient practice of reading that record honestly."

---

## Tech Stack

- **Next.js 14** (App Router) · TypeScript · Tailwind CSS
- **Firebase 10** (Auth, Firestore, Storage, Analytics)
- **Zustand** (auth, theme, language, sound stores)
- **Framer Motion + GSAP-style scroll animations** (custom IntersectionObserver harness, no GSAP licence required at runtime)
- Cormorant Garamond / DM Sans / Playfair Display via `next/font`
- Razorpay placeholder (`// TODO: Add Razorpay keys`) — payments not wired

---

## Quick Start

```bash
# 1. Install
npm install

# 2. (Optional) copy env example
cp .env.example .env.local

# 3. Run
npm run dev
# → http://localhost:3000
```

Production build:
```bash
npm run build
npm run start
```

Type-check:
```bash
npm run typecheck
```

---

## Firebase Setup

Project ID: **dr-sampoorna-8128a** (config is hardcoded in `lib/firebase.ts` per spec).

### 1. Enable services in the Firebase console

- **Authentication → Sign-in method:** Email/Password, Google, Apple, Facebook
- **Firestore Database:** create in production mode (we ship rules)
- **Storage:** create the default bucket `dr-sampoorna-8128a.firebasestorage.app`
- **Analytics:** GA4 (auto-init via SDK)
- **Extensions → Trigger Email** (recommended): wires `/mail` documents to actual email delivery to `cosmiawellness@gmail.com`

### 2. Deploy security rules

```bash
npm i -g firebase-tools
firebase login
firebase use dr-sampoorna-8128a
firebase deploy --only firestore:rules,firestore:indexes,storage:rules
```

### 3. Grant superadmin

The site auto-grants admin access to `cosmiawellness@gmail.com` via email fallback. For proper custom-claim role gating use this Cloud Function (also documented in `/admin/settings`):

```ts
// functions/src/index.ts
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
admin.initializeApp();

export const grantSuperadmin = functions.https.onRequest(async (req, res) => {
  // protect this with a one-time secret in real life
  await admin.auth().setCustomUserClaims(
    (await admin.auth().getUserByEmail("cosmiawellness@gmail.com")).uid,
    { superadmin: true, admin: true, role: "owner" }
  );
  res.send("ok");
});
```

---

## Firebase Storage Upload Guide

All media is loaded by friendly slot keys defined in `lib/storage.ts`. The site never breaks if an asset is missing — `<StorageImage>` shows a tasteful warm placeholder.

Upload paths follow the master upload table from the brief. Quick reference:

| Folder | What goes here |
| --- | --- |
| `/hero/` | `service-hero.jpg` (used as bg on multiple page heroes) |
| `/founder/` | `founder-portrait.jpg`, `founder-teaching.jpg` |
| `/news/` | 4 news videos (India TV, Zee, N Darshan, News24) |
| `/wellness-series/` | 7 wellness series videos |
| `/photos/professional/` | `service-professional-1/2/3.jpg` |
| `/photos/sessions/` | 4 session images |
| `/photos/corporate/` | 6 corporate images |
| `/certificates/` | AYUSH, RYT 300, RYT 200, Atal Mithila video |
| `/service-cards/` | 5 service card images (slots 30–34) |
| `/how-it-works/` | 5 step images (slots 35–39) |
| `/body-problems/` | 12 body problem images (slots 40–51) |
| `/testimonials/` | 2 video testimonials |
| `/testimonials/faces/` | 6 face photos |
| `/asanas/` | `asana-01.jpg` … `asana-21.jpg` |
| `/sounds/` | `ambient.mp3`, `chime.mp3` (≤ 20% volume capped in code) |
| `/` | `service-booking-bg.jpg` |

Filenames must match exactly — they're case-sensitive on Firebase Storage. The full mapping lives in `lib/storage.ts` (`ASSETS` constant).

### Upload via CLI
```bash
gsutil -m cp -r ./assets/hero/* gs://dr-sampoorna-8128a.firebasestorage.app/hero/
gsutil -m cp -r ./assets/wellness-series/* gs://dr-sampoorna-8128a.firebasestorage.app/wellness-series/
# ... and so on
```

Or upload via the Firebase console manually.

---

## Routing Map

| Path | Purpose |
| --- | --- |
| `/` | Home — hero, stats, story, expertise, asanas, services, media, wellness series, testimonials, blog, CTA, contact |
| `/about` | Cinematic narrative · PhD · SFY · AYUSH · Atal Mithila · RYT · Corporate · Mission |
| `/services` | 5 alternating service sections (`#corporate`, `#group`, `#personal`, `#fertility`, `#therapeutic`), How It Works, Body Problems grid, Booking form |
| `/media` | News · Wellness Series · Photos & Recognition tabs |
| `/blog` | Featured + grid |
| `/blog/[slug]` | Full post · share · bookmark |
| `/contact` | Form · info cards · map |
| `/privacy`, `/terms`, `/disclaimer` | Legal |
| `/login` | Email / Google / Apple / Facebook |
| `/onboarding` | 6-step wizard |
| `/dashboard` | 9 user sections (sidebar / mobile bottom bar) |
| `/admin` | 11 admin panels — gated by superadmin custom claim or `cosmiawellness@gmail.com` email |

---

## Adding Blog Posts

Blog posts can be authored in **two ways**:

1. **Built-in defaults** — edit `lib/content.ts` `BLOG_POSTS` array. Good for the founding 3 articles. These are baked into the build.
2. **Live via Admin CMS** — go to `/admin/blog`, fill out the form (title, slug, category, cover Storage path, excerpt, body). Saved to Firestore `blogPosts` collection. The blog list and post pages prefer Firestore data when present.

Body uses plain text with blank lines between paragraphs. SEO meta fields (`metaTitle`, `metaDescription`) are persisted but not yet wired to the post `<head>` — extend `app/blog/[slug]/page.tsx` to read them in `generateMetadata`.

---

## Updating Services

Edit defaults in `lib/content.ts` (`SERVICES` array) for permanent changes that ship with the build, or use **`/admin/services`** to override title / tagline / price / WhatsApp message live without redeploying.

The site reads overrides first, then falls back to the defaults.

---

## Design System

- **Palette** — Chocolate Brown `#3D1F0F`, Deep Chocolate `#1A0A00`, Cream `#FDF8F0`, Soft Cream `#FAF6EF`, Forest `#1B4D3E`, Forest Deep `#0D1F1A`, Real Metallic Gold `#C8892A` (gradient via `.bg-gold-shine` and `.text-gold-shine`)
- **Typography** — Cormorant Garamond 300/400 for headings (never bold), DM Sans 300/400 for body, Playfair Display italic for accents/taglines
- **Grain** — `.grain` utility (CSS SVG noise, no images)
- **Gold wipe** — `<GoldWipe />` between major sections
- **Magnetic cursor** — desktop only, attracts to anything with `data-magnetic="true"` or to standard interactive elements

---

## Animations

| Pattern | Component / Class |
| --- | --- |
| Word-by-word reveal | `<WordReveal as="h1" stagger={0.08}>…</WordReveal>` |
| Line-by-line reveal | `<LineReveal>{paragraphs}</LineReveal>` |
| Counter from 0 | `<CounterUp value={5000} suffix="+" />` |
| Bidirectional marquee | `<Marquee items reverse speed />` |
| Sticky text + scrolling images | `<StickyImageScroll heading slides />` |
| Card scale-in batch | `<CardReveal>{cards}</CardReveal>` |
| Asana auto-scroll w/ hover-pause | `<AsanaStrip />` |
| Image parallax | `<Parallax speed={0.4}>{img}</Parallax>` |
| Section gold wipe | `<GoldWipe />` |
| Navbar transparent → forest | Built into `<Navbar />` |

All animations honour `prefers-reduced-motion`.

---

## Sound

- Ambient meditation loop (`/sounds/ambient.mp3`) starts on first user click/tap, capped at 20% volume
- Chime (`/sounds/chime.mp3`) plays on successful booking
- Mute/unmute toggle visible in the navbar; preference persisted in localStorage

---

## Language

- EN / HI toggle in the navbar
- Translation dictionary lives in `lib/i18n.ts` (`I18N` const)
- All UI labels, form fields, error/success states are translated; blog content stays in original language

---

## Razorpay (TODO)

Placeholder only:
```ts
// TODO: Add Razorpay keys here
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```
Hook up at `/services` booking submission once keys exist.

---

## Deployment

### Vercel (recommended)
1. Push this repo to GitHub
2. Import into Vercel
3. Set env vars from `.env.example` (or skip — Firebase config is hardcoded)
4. Deploy

### Firebase Hosting (static export)
```bash
npm run build
# Configure 'output: "export"' in next.config.mjs if static-only
firebase deploy --only hosting
```

> **Domain — DO NOT connect any domain yet.** Per brief, the owner will configure their domain manually.

---

## File Structure (high level)

```
app/                     Next.js App Router pages
  about/                 Cinematic about page
  admin/                 11 admin panels (layout + sub-routes)
  blog/                  List + [slug] detail
  contact/
  dashboard/             User dashboard layout + 9 sub-routes
  disclaimer/  privacy/  terms/
  login/  onboarding/
  media/  services/
  layout.tsx  page.tsx  globals.css
components/
  animations/            WordReveal · LineReveal · GoldWipe · CounterUp ·
                         Marquee · AsanaStrip · StickyImageScroll · Parallax · CardReveal
  sections/              Home page sections (Hero, Stats, Story, Expertise,
                         Asana, Services, Media, Wellness, Testimonials, Blog, CTA, Contact)
  Navbar · Footer · FloatingWhatsApp · MagneticCursor · GoldButton ·
  StorageImage · VideoModal · Lightbox · PolicyLayout · Providers
lib/
  firebase.ts            Client SDK init + admin helper
  storage.ts             Firebase Storage path registry + resolver
  content.ts             Site copy defaults (services, blog, testimonials, ...)
  i18n.ts                EN / HI translations
  utils.ts               cn(), whatsappLink(), WA_MESSAGES, generateBookingRef, formatDate
stores/
  auth.ts  theme.ts  lang.ts  sound.ts
firestore.rules · storage.rules · firestore.indexes.json · firebase.json
```

---

## Quality Notes

- No fake UI, no lorem ipsum, no dead buttons. Every WhatsApp CTA carries the correct pre-filled message per the brief.
- Fertility Yoga (SFY) language is deliberate: "support", "designed for". No claim of cure or guaranteed pregnancy anywhere.
- All forms write to Firestore *and* to `/mail` for the **Trigger Email** extension. Install the extension to deliver real emails to `cosmiawellness@gmail.com`.
- Booking form returns a real reference ID like `SMP-{ts}-{rand}` and shows it on success.
- Dashboard data is real Firestore reads with loading + empty states.
- Asset placeholders (warm cream + grain + filename) render gracefully until you upload to Storage.

---

## Disclaimer

Yoga and wellness services are supportive practices and are not a substitute for professional medical diagnosis, treatment, or emergency care.

— Dr. Sampoorna · Cosmia Wellness · Made with ❤ in India
