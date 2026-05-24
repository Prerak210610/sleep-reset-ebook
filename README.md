# Dr. Sampoorna — Static Site (Netlify-Ready)

This branch contains the fully built, production-ready static export of the Dr. Sampoorna website. **Just download and drop on Netlify.**

## How to deploy in 60 seconds

1. Click the green **`< > Code`** button at the top of this page
2. Click **"Download ZIP"**
3. **Unzip** on your computer
4. Open **[app.netlify.com/drop](https://app.netlify.com/drop)**
5. **Drag the unzipped folder** onto the page
6. Done — live URL in ~10 seconds

If you already have a Netlify site live, drop the same folder onto the existing site card to replace the deployment.

## What's new in this build

- ✅ **All 15 asanas** in the auto-scrolling strip now have real photos
- ✅ **Hero portrait & About floating image** wired
- ✅ **Booking modal background** uses your dedicated cream/yoga image
- ✅ **Companies grid** — Dell · Indian Oil · HPCL · ONGC · BPCL with real logos, non-scrolling
- ✅ **Featured On grid** — India TV · Zee News · News24 · N Darshan with real logos, non-scrolling
- ✅ **Government recognition strip** below — AYUSH · Yoga Alliance USA
- ✅ **All 14 video tiles use custom poster images** (face-safe, never crop heads):
  - 4 News videos · 7 Wellness Series · Atal Mithila Samman · 2 Shorts testimonials
- ✅ **130 total images embedded** in the site
- ✅ **32 verified review testimonials** with click-to-zoom
- ✅ **Cream + Chocolate Brown + Gold** palette throughout
- ✅ **3-step Booking modal** (Details → Health → Schedule)

## After deployment

To make forms and login actually save data:

1. Firebase Console → Authentication → Settings → **Authorized domains** → add your Netlify URL
2. Firebase Console → Authentication → **Sign-in method** → enable Email, Google, Apple, Facebook

Source code lives on the `feat/dr-sampoorna-website` branch.
