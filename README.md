# Dr. Sampoorna — Static Site (Netlify-Ready)

This branch contains the fully built, production-ready static export of the Dr. Sampoorna website. **Just download and drop on Netlify.**

## How to deploy in 60 seconds

1. Click the green **`< > Code`** button at the top of this page
2. Click **"Download ZIP"**
3. **Unzip** the file on your computer — you'll get a folder called `sleep-reset-ebook-deploy-netlify-static`
4. Open **[app.netlify.com/drop](https://app.netlify.com/drop)**
5. **Drag the unzipped folder** onto the Netlify Drop page
6. Done. Live URL appears in ~10 seconds.

If you already have a Netlify site live, drop the same folder onto the existing site card to replace the deployment.

## What's new in this build

- ✅ **100 images embedded** — bundled with the site, served from Netlify (no Firebase Storage needed)
- ✅ **32 verified review testimonials** with face avatars and click-to-zoom on each review screenshot
- ✅ **Initial-letter avatars** for reviewers without a profile photo (e.g. `R`, `S`)
- ✅ **15 asanas** in the auto-scrolling strip — first 10 with real photos, last 5 italic placeholders
- ✅ **Cream + Chocolate Brown + Gold** palette throughout
- ✅ **All 14 YouTube videos** wired (4 news, 7 wellness series, Atal Mithila Samman, 2 Shorts testimonials)
- ✅ **3-step Booking modal** (Your Details → Health → Schedule & Confirm) replaces WhatsApp redirect
- ✅ **Dual pricing**: ₹197 Online · ₹497 Offline displayed everywhere

## What's still pending (8 images you mentioned)

The site renders gracefully with tasteful warm placeholder cards for any missing images. When you upload the remaining 8, we wire them in the same way.

## After deployment

To make forms and login actually save data:

1. Firebase Console → Authentication → Settings → **Authorized domains** → add your Netlify URL
2. Firebase Console → Authentication → **Sign-in method** → enable Email, Google, Apple, Facebook
3. (Optional) Install the Firebase Trigger Email extension to deliver booking confirmations to `cosmiawellness@gmail.com`

Source code lives on the `feat/dr-sampoorna-website` branch.
