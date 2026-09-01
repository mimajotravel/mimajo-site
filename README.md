# Mimajo — site

A travel deals + magazine + membership site, styled in the Mimajo tri-colour
brand, deployed on Vercel from GitHub, with Decap CMS (via DecapBridge auth)
for content editing.

## What's in here

```
index.html              Homepage — hero, Flash teaser, top deals, magazine teaser, membership teaser
deals.html               All-deals listing (open to everyone)
flash.html                Weekly premium picks — gated to Voyager/Globetrotter (visual mockup, see note below)
magazine.html            Magazine (travel blog) listing page
magazine-post.html       Article: 48 Hours in Bangkok
magazine-*.html           Six more individual articles (Maldives, flight hacks, Seoul, packing, Bali, eSIM)
membership.html          3-tier membership page
enquiry.html               Enquiry form
css/style.css             All styling — design tokens at the top of the file
admin/index.html          Decap CMS app shell
admin/config.yml          Decap CMS config — "Deals", "Flash", "Magazine" and "Pages" collections
content/deals/*.md         Six deals, in the format Decap CMS creates/edits
content/flash/*.md          Three Flash picks, in the format Decap CMS creates/edits
content/magazine/*.md      Seven articles, in the format Decap CMS creates/edits
content/pages/membership.md  Membership page intro copy, editable via CMS
images/                    Photos + uploads folder
```

## Where things stand

Every HTML page you see is real, hand-built, and correctly linked — every
deal's "Book Now", every magazine card, every nav link points somewhere
real, not a `#` placeholder. That's true today.

What's *not* wired up yet: editing a `content/deals/*.md` file through the
CMS does **not** automatically update `deals.html`. The CMS is a real,
working drafting and review tool — commits show up in GitHub, editorial
workflow drafts work — but a plain `.html` file can't read those `.md`
files at request time. Until a build step exists, treat the CMS as where
you draft and approve new deals/articles, then copy the finished text
across into the matching HTML file by hand.

Closing that gap (covered in the founder roadmap doc, Phase 3) means adding
a static site generator — Eleventy is the simplest match for this file
structure — that reads `content/**/*.md` and generates every card
automatically at build time, on every GitHub push.

## Flash — how it works today vs. later

`flash.html` is a real page with real (placeholder) content, styled to look
gated — blurred prices, a tier badge, an "Unlock" button pointing at
Membership. But there's no actual login system yet, so nothing is truly
hidden: right now it's a mockup of the *experience*, not real access
control. Real gating needs user accounts and a paid-tier check (e.g. Stripe
subscription status behind a login) — a later build phase once Eleventy is
in place.

## Deploying (zero cost)

1. Push this folder to a GitHub repo, import it into Vercel (Framework
   preset: "Other").
2. Vercel gives you a free `.vercel.app` URL, and rebuilds automatically on
   every push to `main`.
3. Point a custom domain at Vercel via A/CNAME records at your registrar.
4. `/admin` uses DecapBridge for GitHub OAuth (PKCE) — see `admin/config.yml`
   for the connection details.
