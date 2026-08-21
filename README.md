# Lyra

A modern company website with a built-in blog, fully driven by a headless CMS.
Every page, menu, and setting is authored in [Sanity](https://www.sanity.io/)
and rendered by a fast, SEO-friendly [Next.js](https://nextjs.org/) frontend —
no code changes needed to publish new content.

## What's inside

| Package | What it is |
| --- | --- |
| [`web/`](web) | The public website — Next.js 16, React 19 Server Components, Sass |
| [`studio/`](studio) | The content studio — Sanity Studio v6, where editors manage everything |

## Features

- **Composable pages** — editors build pages from a library of 18 reusable
  content sections (heroes, feature grids, steppers, comparisons, forms,
  maps, team overviews, and more) that can be shared across pages
- **Full blog** — posts with authors, categories, and tags, plus filtering
  and pagination out of the box
- **Editor-friendly studio** — organized desk structure, singleton settings,
  soft archiving, and protected core pages that can't be accidentally deleted
- **SEO built in** — per-page metadata, Open Graph and Twitter cards, JSON-LD
  structured data, sitemap, robots, and web manifest
- **Privacy-aware analytics** — Google Tag Manager and HubSpot load only
  according to the visitor's cookie consent choices
- **Lead capture** — custom forms with reCAPTCHA protection, or embedded
  HubSpot forms
- **Fast by design** — server-rendered pages with tag-based caching and
  instant cache invalidation when content changes in the CMS

## Technology

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Sass
- **CMS**: Sanity Studio v6 with GROQ queries
- **Validation**: Zod runtime schemas guard every piece of CMS content before
  it renders
- **Security**: Content Security Policy with per-request nonces
- **Quality**: ESLint, strict TypeScript, unused-code audits

## Running locally

Each package installs and runs independently. Both need a `.env.local` created
from their `.env.example` template, pointing at your own Sanity project.

```bash
# Content studio
cd studio
npm install
npm run dev          # http://localhost:3333

# Website — in a second shell
cd web
npm install
npm run dev          # http://localhost:3000
```

The website renders once the studio's core content (site settings, header,
footer, and a home page) has been created and published.

---

**Built by [JordacheWD](https://jordachewd.com)**

## License

This source code is published for reference and evaluation purposes only.

> No permission is granted to use, copy, modify, merge, publish, distribute, sublicense, or sell copies of this software, in whole or in part.

See [LICENSE](LICENSE) for the full terms.
