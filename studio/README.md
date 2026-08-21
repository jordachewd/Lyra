# Lyra — Content Studio

The editorial home of the Lyra website, built on
[Sanity Studio v6](https://www.sanity.io/studio). Everything the site shows —
pages, blog posts, navigation, footer, and site-wide settings — is created and
published here. The website in [`../web`](../web) picks up changes within
seconds of publishing.

## What editors can do

- **Build pages from reusable sections** — author a section once (a hero, a
  feature grid, a stepper, a comparison table…) and reuse it on any page.
  A dedicated view surfaces sections that are no longer used anywhere.
- **Write and organize the blog** — posts with authors, categories, and tags,
  rich text with images, code blocks, and tables
- **Control the site's look** — header (dropdown or mega-menu navigation),
  footer, brand colors, and per-section layout options
- **Manage site-wide settings** — general info, SEO defaults, reading
  settings, and analytics/tracking configuration, each in a single dedicated
  document
- **Archive instead of delete** — pages and posts support soft archiving with
  one-click restore
- **Stay safe** — core pages (home, blog) are protected from deletion,
  unpublishing, and slug changes

## Stack

- Sanity Studio v6 (React 19, TypeScript)
- Structured content: 77 typed schemas covering documents, sections, fields,
  and objects
- Plugins: media library, color input, code input, tables, and Vision for
  query exploration

## Getting started

Requires Node.js 22.12+.

```bash
npm install
cp .env.example .env.local   # fill in your own Sanity project values
npm run dev                  # http://localhost:3333
```

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Studio locally |
| `npm run build` | Build the static Studio bundle |
| `npm run deploy` | Build and deploy the Studio |
| `npm run lint` | Lint the codebase |
| `npm run typegen` | Regenerate TypeScript types from the schema |

## Configuration

The Studio is configured entirely through environment variables — see
[`.env.example`](.env.example). No project identifiers or credentials are
stored in the source code.

## License

This project is **not** open source. It is published for reference and
evaluation purposes only — see [LICENSE](../LICENSE) at the repository root
for the full terms.
