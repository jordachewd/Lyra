# Lyra Studio — port of `model/sanity-studio`

**Date:** 2026-08-21
**Status:** Approved
**Scope:** `studio/` only. `web/` is untouched.

## Goal

Build the Lyra Sanity Studio in `studio/` by porting `model/sanity-studio`,
replicating `structure/website-structure.ts` and everything it depends on.
`model/` is read-only reference (gitignored) and is never modified.

## Exclusions

Four branches of the model are out of scope:

- **Portal** — all portal documents, the portal schema index, the portal desk
  structure, and portal-only constants.
- **Webinars** — the webinar page and category documents, plus the webinars
  settings singleton and its two settings objects.
- **DEPRECATED sections** — Text Cards and Text Blocks, and the two UI objects
  they contain.
- **Staging** — the staging desk and staging structure. The Studio has a single
  workspace.

## Scope reconciliation

The model holds 160 files: 27 dropped, 133 ported.

| Reason | Count | Files |
| --- | --- | --- |
| Portal | 14 | `schemas/portal/**` (11), `schemas/portal-index.ts`, `structure/portal-structure.ts`, `consts/curated/portal-curated-types.ts` |
| Portal-only migration | 1 | `scripts/backfill-appTarget.js` — `appTarget` exists only on portal types, so the whole `scripts/` directory goes |
| Staging | 2 | `desk-staging.ts`, `structure/website-structure-staging.ts` |
| Webinars | 5 | `schemas/website/documents/webinars/webinarPage.ts`, `webinarCat.ts`, `schemas/website/documents/settings/webinars.ts`, `schemas/website/objects/settings/webinarsSettings.ts`, `webinarThankYou.ts` |
| DEPRECATED | 4 | `schemas/website/documents/sections/textBlocks.ts`, `textCards.ts`, `schemas/website/objects/ui/textBlock.ts`, `textCard.ts` |
| Build artifact | 1 | `tsconfig.tsbuildinfo` |

Of the 133 ported files: 105 schema files, 9 consts, 6 utils, 3 actions,
1 structure, 1 schema index, 1 `static/.gitkeep`, and 7 root config files that
are merged into `studio/`'s existing equivalents rather than copied verbatim.

Registered schema types go from 86 to 77 (minus 5 webinars, minus 4
deprecated). The remaining 28 schema files export reusable `defineField`
definitions and TypeScript types rather than registered schema types:
77 + 28 = 105.

No ported file references a dropped type except the seven listed under
"Edits to ported files".

## Target architecture

```
studio/
├── actions/            archive.actions · document.actions · protect-core-pages
├── consts/
│   ├── config/         protected-page-slugs · reserved-routes · singleton-allowed
│   │                   singleton-types · studio-api-version
│   ├── curated/        curated-types.ts
│   ├── brand-colors.ts · collapse-white-space.ts · website-section-types.ts
├── schemas/
│   ├── website/        documents/{appearance,blog,page,sections,settings}
│   │                   fields/{common,form,menus} · objects/{analytics,editor,
│   │                   form,menus,seo,settings,ui} · types/
│   └── lyra-index.ts
├── structure/          website-structure.ts
├── utils/              collapse/preview/validation helpers (6 files)
├── static/.gitkeep
├── desk.ts · sanity.config.ts · sanity.cli.ts · package.json · tsconfig.json
└── eslint.config.mjs · README.md
```

`studio/schemaTypes/` is deleted outright. Its `post.ts` declares the type name
`post`, which collides with the model's `postType`; registering both stops the
Studio booting.

## Edits to ported files

| File | Change |
| --- | --- |
| `schemas/lyra-index.ts` | Renamed from `arratech-index.ts`. Drop the `...portalSchema` spread and the 9 webinar/deprecated imports and array entries. Export renamed `arratechSchema` to `lyraSchema`. |
| `structure/website-structure.ts` | Drop the Webinars branch and the two DEPRECATED section entries. Export `ListItemBuilder[]` instead of a single wrapping `listItem`. |
| `consts/website-section-types.ts` | 20 to 18 section types. |
| `consts/curated/curated-types.ts` | Drop the portal spread, `webinarPage`, `webinarCat`, `textBlocksType`, `textCardsType`. |
| `consts/config/protected-page-slugs.ts` | Drop `'webinars'`. |
| `actions/document.actions.ts` | Drop the `ctx.schemaType === 'webinarPage'` branch. |
| `schemas/website/documents/settings/reading.ts` | Drop the `webinars` field and its custom validation. |

## Desk shape

Portal is gone, so the model's `Website (Marketing)` then `Website Content`
wrapper is two clicks of dead nesting. The structure is flattened to the desk
root; the files keep the model's names and locations.

```
Lyra Desk
├── Pages ── Published / Archived
├── Blog ── Posts (Published/Archived) · Categories · Tags · Authors
├── Sections (Common) ── All (Used) / Unused / divider / 18 section types
├── ─────────────
├── Appearance ── Header · Footer · Menus
└── Settings ── General · Reading · SEO & Metadata · Tracking & Analytics
```

`desk.ts` spreads `websiteStructure(S)` at the root, then appends the
`documentTypeListItems()` fallback filtered by `CURATED_TYPES`. That fallback
must render empty; anything appearing in it means the `curated-types.ts` edit is
incomplete.

## Rebranding

No occurrence of "Arratech" in any case may remain in `studio/`.

**Identifier and text swaps.** `desk.ts` (`arratechDesk` to `lyraDesk`, title
`Lyra Desk`), `sanity.config.ts`, `package.json` name to `lyra-sanity-studio`,
`README.md`, `arratech-index.ts` to `lyra-index.ts` with `lyraSchema`.

**Display titles only — stored `value:` stays untouched** so no content
migration is implied:

- `objects/settings/common/cmmBgSettings.ts` — `'Arratech Banner'` to `'Lyra Banner'`, value stays `'banner'`
- `objects/settings/sections/ctaBannerSettings.ts` — `'Arratech Banner (Default)'` to `'Lyra Banner (Default)'`, value stays `'banner'`
- `objects/editor/blockContentMaxi.ts` — `'BlockQuote (Arratech Style)'` to `'BlockQuote (Lyra Style)'`, value stays `'blockquote'`

**`consts/brand-colors.ts`.** Arratech's hex values are another company's brand
and are not carried over. The file is replaced with a neutral placeholder ramp
of the same array shape — a Lyra Primary blue scale, neutral grays, black,
white, transparent — marked with a TODO to swap in the real palette.

**`general.ts` / `seo.ts` placeholders.** `https://www.lyra.com`,
`office@lyra.com`, `@lyra`, `/company/lyra`. The keywords placeholder
`'e-invoicing, Peppol, API'` and the classification `'Business Software'`
describe Arratech's business rather than merely containing the word, so they are
neutralised too. All of these are `placeholder` hints; none is a stored value.

**`sanity.cli.ts`.** The model's `studioHost: 'arratech'` is not ported.
Deployment goes through the env var `SANITY_STUDIO_APP_ID`, and
`lyra.sanity.studio` is a globally unique hostname that may already be taken.

## Configuration

- `sanity.config.ts` stays a single `defineConfig({...})`. The model's
  two-workspace array collapses, and `basePath` is not ported — with one
  workspace, `basePath: '/production'` would serve the Studio at `/production`
  instead of `/`. The config gains `structureTool({structure: lyraDesk})`, the
  `schema.templates` singleton filter, and `document.actions: documentActions`.
  The existing env-based `projectId` / `dataset` and plugin list are kept.
- `package.json` keeps the current, newer dependency versions and the
  `@sanity/sdk-react: 2.19.0` override. `@portabletext/types` is added
  explicitly — `utils/pt-to-plain-text.ts` imports it and the model only
  received it transitively. The model's `migrate:backfill-appTarget` script is
  dropped.
- `tsconfig.json` and `eslint.config.mjs` stay as they are, widened only if the
  new directories require it.

## Out of scope

`web/` is untouched and typegen is not run. `web/sanity.types.ts` keeps
describing the current `post` type and `web/` keeps compiling. Regenerating
types is deferred to the frontend pass. No frontend rendering, no content
migration, no deploy.

## Verification

Evidence is required before claiming completion.

1. `npx sanity schema extract` in `studio/`. This is the discriminating check:
   duplicate type names and orphan `to:` / `type:` references to deleted types
   surface at schema resolution, not at `tsc`.
2. `grep -ri arratech studio/` returns zero hits.
3. `npx tsc --noEmit` passes.
4. `npm run dev`, then click every desk branch: Pages Published/Archived, the
   four Blog lists, Sections All/Unused plus the 18 section types, the three
   Appearance items, and the four Settings singletons.
5. The desk fallback list renders empty.

## Known follow-ups

- The real Lyra brand palette replaces the placeholder in `consts/brand-colors.ts`.
- The `BlockQuote (Lyra Style)` variant needs a house visual defined on the
  frontend; the schema only carries the `blockquote` value.
- Typegen and the `web/` integration are a separate pass.
