# Mimajo — site (now on Eleventy)

The site is now a real static-site-generator build, not hand-written HTML.
Editing a deal, article, or the membership intro through Decap CMS at
`/admin` and publishing now genuinely updates the live pages — no more
copying text into HTML by hand.

## What changed

- **Every page is generated** from a template (`.njk`) plus data read
  straight from `content/**/*.md` — the exact same files Decap CMS edits.
- **Deals & Flash** (`deals.njk`, `flash.njk`) loop over `content/deals/*.md`
  and `content/flash/*.md` and render a card for each — add a new deal in
  the CMS, it appears on the next build, no HTML editing.
- **Magazine** (`magazine.njk` for the listing, `magazine-article.njk` for
  every individual article) works the same way — one template generates
  *all* article pages automatically from `content/magazine/*.md`, one
  output file per article, named `/magazine-{slug}.html` to match every
  URL that was already live.
- **Membership** intro heading/text now actually reads from
  `content/pages/membership.md` (previously written but never wired up).
- **About / Terms / Privacy / Affiliate Disclosure / Enquiry** are simple
  templates sharing the same header/footer layout — not yet CMS-editable
  (same as before), but no longer duplicating the nav/footer HTML six times
  over.

## How it fits together

```
.eleventy.js            Eleventy config — input/output dirs, passthrough copies
.eleventyignore          Tells Eleventy to skip content/ and admin/ (read as data, not templates)
package.json              Build dependencies + the "build" script Vercel runs

_data/deals.js            Reads content/deals/*.md → available as `deals` in templates
_data/flashDeals.js        Reads content/flash/*.md → available as `flashDeals`
_data/magazineArticles.js   Reads content/magazine/*.md, renders markdown bodies → `magazineArticles`
_data/membershipPage.js     Reads content/pages/membership.md → `membershipPage`

_includes/layouts/base.njk    The shared header, nav, footer — every page wraps in this
_includes/partials/macros.njk  Reusable card snippets (dealCard, magazineCard, flashCard)

index.njk, deals.njk, flash.njk, magazine.njk,
membership.njk, enquiry.njk, about.njk, terms.njk,
privacy.njk, affiliate-disclosure.njk                  One template per page
magazine-article.njk                                    One template, paginated, generates every article page

content/**/*.md          Same CMS-managed content as before — untouched by this migration
                          except two files renamed (see below) and image URLs backfilled
                          with the real Unsplash photos (previously the live pages used
                          hardcoded URLs that didn't match what was in these files)
admin/                    Decap CMS — unchanged, still passthrough-copied as-is
css/, images/, favicon.ico  Unchanged, passthrough-copied as-is
```

Two content files were renamed so their auto-generated slug matches the
URLs already live and shared: `48-hours-in-bangkok.md` → `post.md`, and
`esim-vs-roaming-sea.md` → `esim-vs-roaming.md`. Nothing else about them
changed.

## Deploying — this now needs a build step

Previously Vercel just served the files as-is ("Other" framework preset,
no build). That **must change** now:

1. In Vercel → Project → **Settings → General → Build & Development Settings**:
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `_site`
   - **Install Command:** leave as default (`npm install`)
2. Save, then trigger a new deployment (push a commit, or use "Redeploy").
3. **Check the build log** on that deployment — this is the real test,
   since it runs on Vercel's servers with full internet access to install
   Eleventy and its dependencies, which isn't something that could be
   tested locally beforehand. Look for a green "Build Completed"
   and browse the file list it generated if you want to double check.
4. If the build fails, the log will show exactly which line errored —
   send me a screenshot of it and I'll fix it directly.

## Local development (optional)

If you ever want to preview changes before pushing:
```
npm install
npm run start
```
This runs Eleventy's local dev server with live reload.
