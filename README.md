# Site A — Deals & Perks (AU/NZ MVP)

A lightweight static site built with [Eleventy (11ty)](https://www.11ty.dev/), designed to deploy straight from GitHub to Netlify.

## What's included

- **Homepage** — hero + latest posts
- **Blog** (`/blog/`) — flat listing, tagged `lifestyle` or `finance` (3 sample posts included from the content plan — replace with real content)
- **Email capture popup** — appears after 15s on any page, Netlify Forms powered (no backend needed), with unbundled consent checkboxes (separate boxes for the newsletter vs. optional partner offers)
- **About / Contact** pages (contact form also via Netlify Forms)
- **Legal pages** — Privacy policy, Terms, Affiliate disclosure, Unsubscribe (all placeholder text — **have a lawyer review before launch**)

## Local development

```bash
npm install
npm start        # runs a local dev server with live reload at localhost:8080
npm run build     # builds the static site into _site/
```

## Deploying: GitHub + Netlify

1. **Push this project to a new GitHub repo:**
   ```bash
   git init
   git add .
   git commit -m "Initial MVP site"
   git branch -M main
   git remote add origin https://github.com/YOUR_ORG/site-a.git
   git push -u origin main
   ```

2. **Connect it to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import an existing project"
   - Choose GitHub, authorize, and select this repo
   - Netlify will auto-detect the build settings from `netlify.toml` (build command `npm run build`, publish directory `_site`) — just confirm and deploy

3. **Enable Netlify Forms** (should work automatically):
   - Once deployed, go to your site's Netlify dashboard → **Forms** tab
   - You should see `deal-alerts` and `contact` listed after the first deploy — Netlify detects `data-netlify="true"` forms at build time
   - Form submissions (i.e. your captured emails) appear here. You can set up **email notifications** per submission under Forms → Settings → Form notifications, or connect a Zapier/Make webhook from there to push leads into your CRM/ESP later

4. **Custom domain:**
   - Site settings → Domain management → Add a custom domain, then update your DNS as instructed

## Before this goes live

- [ ] Replace all placeholder blog content with real, researched articles
- [ ] Have a lawyer review the four legal pages (privacy, terms, affiliate disclosure, unsubscribe)
- [ ] Update `[PARTNER NAME]` placeholder in `src/legal/privacy.njk` once a real CPL/CPA partner is confirmed
- [ ] Update `site.url` in `src/_data/site.js` once you've picked a domain
- [ ] Set up an actual ESP (email service provider) — Netlify Forms is fine for MVP capture, but you'll want to export/connect this to a real sending tool (e.g. Mailchimp, Brevo) before sending real campaigns, since Netlify Forms itself doesn't send marketing emails
- [ ] Set up Google Search Console + submit sitemap once live
- [ ] Add Meta Pixel / Conversions API once your Business Manager account is verified (see earlier setup steps)

## Growing this later (without a rebuild)

- Once a content category (e.g. finance) has 5+ articles, add a dedicated hub page linking to them
- Once you have a live CPL/CPA partner, add a dedicated `/compare/` landing page and point the popup's "partner offers" consent toward it
- Once AU vs NZ content diverges enough, split into `/au/` and `/nz/` sections and add 301 redirects from the old flat URLs
