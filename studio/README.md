# Lyra Studio

Sanity Studio for the Lyra marketing website — pages, blog, reusable content
sections, appearance and site settings.

## Requirements

- Node.js >= 22.12

## Environment

Three variables are required. They live in `studio/.env.local`, which is
gitignored — never commit real values.

| Variable | Purpose |
| --- | --- |
| `SANITY_STUDIO_PROJECT_ID` | Sanity project the Studio reads and writes |
| `SANITY_STUDIO_DATASET` | Dataset name (`production`) |
| `SANITY_STUDIO_APP_ID` | Target application for `sanity deploy` |

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Start the Studio locally |
| `npm run build` | Build the static Studio bundle |
| `npm run deploy` | Build, then deploy to the configured app |
| `npm run lint` | Lint with the Sanity Studio ESLint config |
| `npm run typegen` | Extract the schema and regenerate `../web/sanity.types.ts` |

`npm run typegen` writes into `web/`. Run it only as part of frontend work, and
expect to update the queries in `web/src` alongside it.

> **`npm run dev` also writes to `web/`.** `sanity.cli.ts` sets
> `typegen.enabled: true`, so the dev server regenerates `../web/sanity.types.ts`
> on start and whenever the schema changes. If you are not doing frontend work,
> check `git status web/` after a dev session and revert if you did not intend
> the change.

## Verifying a schema change

`tsc` cannot catch a broken schema — `type: 'foo'` and `to: [{type: 'foo'}]` are
plain string literals, so TypeScript accepts references to types that do not
exist. Sanity resolves them at runtime. Always run:

```bash
npx sanity schema validate
```

## Structure

```
studio/
├── actions/            Archive/unarchive, core-page protection, action resolver
├── consts/
│   ├── config/         Protected slugs, reserved routes, singletons, API version
│   ├── curated/        Types owned by the desk (keeps the fallback list empty)
│   └── ...             Brand colors, section type list, string helpers
├── schemas/
│   ├── website/
│   │   ├── documents/  appearance · blog · page · sections · settings
│   │   ├── fields/     Reusable defineField definitions
│   │   ├── objects/    analytics · editor · form · menus · seo · settings · ui
│   │   └── types/      Shared TypeScript unions
│   └── lyra-index.ts   Registers all 77 schema types
├── structure/          website-structure.ts — the desk item list
├── desk.ts             Root desk resolver
├── sanity.config.ts    Workspace, plugins, schema, document actions
└── sanity.cli.ts       Project/dataset, deployment, typegen config
```

## Content model

- **Pages** carry an ordered list of references to **Section** documents, so a
  section can be authored once and reused across pages. The desk's
  *Sections → Unused* list shows sections nothing references.
- **Pages** and **Posts** support soft archiving via an `archivedAt` field. The
  Archive/Unarchive document actions set and clear it, and the desk splits each
  into Published and Archived lists.
- Core pages (`home`, `blog`) cannot be deleted, unpublished, or archived, and
  their slugs are read-only.
- Header, Footer, and the four Settings documents are **singletons** — the
  Studio hides create/delete for them and opens them directly from the desk.

## Known follow-ups

- `consts/brand-colors.ts` holds a **placeholder** palette. Replace `colorList`
  with the real Lyra brand values; keep the array shape, including the
  transparent RGBA entry.
- The `BlockQuote (Lyra Style)` editor variant stores the value `blockquote`;
  its house visual still needs defining on the frontend.
- Typegen and the `web/` integration are a separate pass — `web/sanity.types.ts`
  does not yet describe this schema.
