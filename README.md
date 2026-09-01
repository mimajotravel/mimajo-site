# Mimajo — starter site

A static prototype for the "Tropical Sunrise" travel deals site, styled and
structured, ready to push to GitHub and deploy on Vercel.

## What's in here

```
index.html            Homepage
deals.html            All-deals listing
magazine.html         Magazine (travel blog) listing page
magazine-post.html    Sample Magazine article template
membership.html       3-tier membership page
enquiry.html          Enquiry form
css/style.css         All styling — the design tokens are at the top of the file
admin/index.html      Decap CMS app shell
admin/config.yml      Decap CMS config — "Deals", "Magazine" and "Pages" collections
content/deals/*.md    Two sample deals, in the format Decap CMS will create
content/magazine/*.md Two sample articles, in the format Decap CMS will create
images/               Put your photos here (or use admin/config.yml's upload folder)
```

The Magazine works the same way as Deals: each article is one markdown file
with a title, cover photo, category, excerpt, author, read time and a
markdown body. The same "generate the HTML automatically" gap described
below applies here too — `magazine-post.html` is currently one hand-built
template, not yet wired to read from `content/magazine/*.md` automatically.

## Important — read before you connect the CMS

This prototype's HTML pages have the sample deals **hand-typed into the
markup** so you can see the design immediately with zero setup. Decap CMS
will happily let you create/edit files in `content/deals/`, but a plain
`.html` file can't automatically turn those `.md` files into new cards on
`deals.html` — that needs a small build step.

Two ways to close that gap (covered in the founder roadmap doc, Phase 3):

1. **Recommended for a solo founder:** add a static site generator
   (Eleventy is the simplest match for this file structure) that reads
   everything in `content/deals/` and generates the deal cards
   automatically at build time. Vercel builds it on every GitHub push.
2. **Fastest hack, refine later:** write a short JavaScript snippet that
   fetches a generated `deals.json` (built from the markdown files by a
   tiny script) and renders cards client-side.

Until that's wired up, treat `content/deals/*.md` as your drafting/review
system, and copy the finished text across into the HTML by hand — slower,
but zero extra moving parts while you validate the business.

## Deploying (zero cost)

1. Create a free GitHub account and push this folder as a new repository.
2. Create a free Vercel account, "Import Project" from that GitHub repo.
   Framework preset: "Other" (static site) — no build command needed yet.
3. Vercel gives you a free `.vercel.app` URL immediately. Add a custom
   domain later once you've bought one.
4. To edit content from `/admin`, Decap CMS needs an OAuth login against
   your GitHub repo — see the roadmap doc for the free Netlify-identity or
   Vercel-OAuth-provider setup.
