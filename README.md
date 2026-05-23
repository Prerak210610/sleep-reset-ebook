# Dr. Sampoorna — Static Site (Netlify-Ready)

This branch contains the fully built, production-ready static export of the Dr. Sampoorna website. **Just download and drop on Netlify.**

## How to deploy in 60 seconds

1. **Click the green "Code" button** at the top of this page (above the file list)
2. Click **"Download ZIP"**
3. **Unzip** the file on your computer — you'll get a folder called something like `sleep-reset-ebook-deploy-netlify-static`
4. Open **[app.netlify.com/drop](https://app.netlify.com/drop)**
5. **Drag the unzipped folder** onto the Netlify Drop page
6. Done. Live URL appears in ~10 seconds.

You can rename the URL after: Netlify dashboard → Site settings → Change site name.

## What's new in this build

- ✅ Cream + Chocolate Brown + Gold palette only (no green)
- ✅ All 14 user-supplied YouTube videos wired (4 news, 7 wellness series, Atal Mithila Samman, 2 Shorts testimonials)
- ✅ 3-step Booking modal (Your Details → Health → Schedule & Confirm) replaces WhatsApp redirect
- ✅ Dual pricing displayed everywhere: ₹197 Online · ₹497 Offline
- ✅ Real partner logos via Google favicon API in marquee strip
- ✅ Face-safe thumbnails (object-position: top so faces are never cut)

## What's inside

- `index.html` — homepage
- `about/`, `services/`, `media/`, `blog/`, `contact/` — all marketing pages
- `dashboard/`, `admin/`, `login/`, `onboarding/` — auth + dashboards
- `_next/` — JavaScript bundles, CSS, fonts (don't delete this)

## After deployment

The site will look great immediately. To make forms and login actually save data:

1. Firebase Console → Authentication → Settings → **Authorized domains** → add your Netlify URL
2. Firebase Console → Authentication → **Sign-in method** → enable Email, Google, Apple, Facebook
3. Upload your photos to Firebase Storage (videos are already on YouTube)

Source code lives on the `feat/dr-sampoorna-website` branch.
