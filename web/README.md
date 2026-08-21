# Lyra — Website

The public-facing website for Lyra: a server-rendered Next.js application that
turns content authored in [Sanity](https://www.sanity.io/) into a fast,
accessible, SEO-ready site. All copy, imagery, navigation, and settings come
from the CMS — publishing new content never requires a deploy.

The content itself is managed in the sibling [`../studio`](../studio) package.

## Highlights

- **CMS-driven pages** — marketing pages are assembled from 18 reusable
  section types (hero, key features, stepper, comparison table, team,
  accordion, map, CTA banner, and more), each with editor-controlled layout,
  colors, and visibility options
- **Blog** — paginated listing with tag, category, and author filtering, plus
  rich article pages with structured data
- **Runtime-validated content** — every CMS response is checked against Zod
  schemas before rendering, so malformed content can never break the page
  silently
- **SEO** — per-page titles and descriptions, Open Graph / Twitter cards,
  JSON-LD, sitemap, robots policy, and a web app manifest
- **Consent-first analytics** — Google Tag Manager and HubSpot only activate
  in line with the visitor's cookie choices; consent defaults load before any
  tracking script
- **Forms** — custom forms with reCAPTCHA v3 verification, or embedded
  HubSpot forms
- **Security** — a strict Content Security Policy with per-request nonces is
  applied to every page
- **Instant updates** — tag-based caching invalidated by CMS webhooks, so
  published changes appear on the site within seconds

## Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 Server Components |
| Language | TypeScript |
| CMS | Sanity (GROQ queries via `@sanity/client` / `next-sanity`) |
| Validation | Zod |
| Rich text | Portable Text (`@portabletext/react`) |
| Styling | Sass |
| Images | `next/image` with Sanity's image pipeline (hotspots, blur placeholders) |
| Quality | ESLint, strict TypeScript, Knip |

## Getting started

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local   # fill in your own Sanity project values
npm run dev                  # http://localhost:3000
```

The site renders once the studio's core content — site settings, header,
footer, and a published home page — exists in your Sanity dataset.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build locally |
| `npm run lint` | Lint the codebase |
| `npm run type-check` | TypeScript check |
| `npm run knip` | Unused dependency/export audit |

## Configuration

All configuration lives in environment variables — see
[`.env.example`](.env.example) for the full annotated list. No credentials or
project identifiers are stored in the source code. Optional server-side
features (draft preview, webhook revalidation, form relay) each disable
themselves cleanly when their variable is unset.

## License

This project is **not** open source. It is published for reference and
evaluation purposes only — see [LICENSE](../LICENSE) at the repository root
for the full terms.
