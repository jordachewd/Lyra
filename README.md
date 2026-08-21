# Lyra

Company website with blog, backed by a headless CMS (Sanity).

A two-package monorepo:

| Package | What it is | Dev port |
| --- | --- | --- |
| [`web/`](web) | Next.js 16 frontend — App Router, React 19 Server Components, Sass | 3000 |
| [`studio/`](studio) | Sanity Studio v6 — content models, desk structure, editorial workflows | 3333 |

Both share the Sanity project and dataset. The site reads
that dataset over GROQ and validates every response with hand-written Zod
schemas before rendering.

## Quick start

Each package installs and runs independently, and each needs its own
`.env.local`.

```bash
# Studio — content authoring
cd studio
npm install
npm run dev          # http://localhost:3333

# Website — in a second shell
cd web
npm install
npm run dev          # http://localhost:3000
```

`web/.env.example` is the template for the site's environment. The Studio needs
`SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, and
`SANITY_STUDIO_APP_ID`.

## Before the site will render

The website calls `notFound()` for the entire site when its globals query comes
back empty, so the dataset needs these documents **created and published** in
the Studio first:

- **Reading Settings** — `homePage` and `blogPage`, both required
- **General Settings**, **SEO Settings**, **Tracking Settings**
- **Site Header** (with a Menu) and **Site Footer**
- At least one published `page` matching the Home Page reference

## How the two connect

- Content is authored in `studio/` and read by `web/` through GROQ queries in
  `web/lib/queries/`.
- `studio/consts/website-section-types.ts` is the authoritative list of the 18
  reusable section types. Each one has to line up across six layers in `web/` —
  see the table in [`web/README.md`](web/README.md#section-system).
- Cache revalidation runs through a Sanity webhook pointed at
  `web/app/api/revalidate/`. Setup is documented in `docs/`.
- `cd studio && npm run typegen` writes `web/sanity.types.ts` as a reference
  artifact. No runtime code imports it — Zod is the type source.

## Repository layout

```text
web/        Next.js frontend
studio/     Sanity Studio
docs/       Planning specs, implementation plans, operational guides (local-only)
model/      Read-only reference implementation (local-only)
```

`docs/` and `model/` are gitignored and never published.

---

**Built by [JordacheWD](https://jordachewd.com)**

## License

This source code is published for reference and evaluation purposes only. 

`No permission is granted to use, copy, modify, merge, publish, distribute, sublicense, or sell copies of this software, in whole or in part.`

See [LICENSE](LICENSE) for the full terms.
