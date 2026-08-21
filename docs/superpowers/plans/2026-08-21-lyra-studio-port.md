# Lyra Studio Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Lyra Sanity Studio in `studio/` by porting `model/sanity-studio`, replicating `structure/website-structure.ts` and every schema, action, and utility it depends on.

**Architecture:** The 133 in-scope files are bulk-copied from the model with a deterministic script rather than retyped, then seven files are edited to remove references to the excluded branches, the desk structure is flattened to the root, and a rebranding sweep replaces every Arratech identifier. Copy-then-edit is chosen over file-by-file authoring because 105 of the files are verbatim ports and hand-transcription is the dominant risk.

**Tech Stack:** Sanity Studio v6 (`sanity@^6.10.1`), React 19, TypeScript 5.8, `@sanity/icons`, `@sanity/code-input`, `@sanity/color-input`, `@sanity/table`, `sanity-plugin-media`, `styled-components`.

**Spec:** `docs/superpowers/specs/2026-08-21-lyra-studio-port-design.md`

## Global Constraints

- **Working directory** is `studio/` unless a step says otherwise. The repo root is `D:\__JWD\_WORK\_LUCRARI\__JWD\_ReactJS\Proiecte\Lyra`.
- **`model/` is read-only.** It is gitignored reference material. Never create, edit, or delete anything under `model/`.
- **`web/` is out of scope.** Do not edit any file under `web/`. Do not run `npm run typegen` or `sanity typegen generate` — typegen writes to `../web/sanity.types.ts` and would break `web/`.
- **Zero "Arratech".** `grep -ri arratech studio/` must return no hits at the end. This includes lowercase, identifiers, comments, and strings.
- **Excluded branches:** Portal, Webinars, DEPRECATED sections (Text Cards, Text Blocks), and the staging workspace. No file, type, constant, or desk entry from these may appear in `studio/`.
- **Stored `value:` strings are never changed** during rebranding — only human-facing `title:`, `description:`, and `placeholder:` text. Changing a `value:` would silently orphan existing content.
- **API version constant** is `'2025-01-01'`, exported from `consts/config/studio-api-version.ts`.
- **There is no test framework in this repo.** The test cycle for every task is `npx sanity schema extract`, `npx tsc --noEmit`, and targeted `grep`. Treat a non-zero exit or an unexpected grep hit exactly as you would a failing test: stop and fix before committing.
- **Prettier config** (in `studio/package.json`): `semi: false`, `printWidth: 100`, `bracketSpacing: false`, `singleQuote: true`. Ported files already match; keep new code consistent.

---

### Task 1: Clear the ground and add the missing dependency

Deletes the scaffold schema that would collide with the ported `postType`, and adds the one dependency the model received only transitively.

**Files:**
- Delete: `studio/schemaTypes/index.ts`, `studio/schemaTypes/post.ts` (whole directory)
- Modify: `studio/package.json`
- Modify: `studio/sanity.config.ts` (temporary — restore a bootable state after the deletion)

**Interfaces:**
- Consumes: nothing.
- Produces: a `studio/` that installs and typechecks with no schema types registered. Task 5 replaces the empty `schema.types` with `lyraSchema`.

- [ ] **Step 1: Confirm the collision this task removes**

Run from the repo root:

```bash
grep -n "name: 'post'" studio/schemaTypes/post.ts model/sanity-studio/schemas/website/documents/blog/postType.ts
```

Expected: both files match. Two schema types named `post` cannot both be registered — the Studio throws at boot. This is why the directory is deleted rather than kept alongside.

- [ ] **Step 2: Delete the scaffold schema directory**

```bash
cd studio && rm -rf schemaTypes
```

- [ ] **Step 3: Point the config at an empty type list so the Studio still boots**

Replace the `schemaTypes` import and usage in `studio/sanity.config.ts`. The file becomes:

```ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {table} from '@sanity/table'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'Lyra Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [structureTool(), media(), codeInput(), colorInput(), table(), visionTool()],

  schema: {
    types: [],
  },
})
```

- [ ] **Step 4: Add `@portabletext/types` to dependencies**

`studio/utils/pt-to-plain-text.ts` (ported in Task 2) imports `PortableTextBlock` from `@portabletext/types`. The model only received it transitively through `sanity`. Add it explicitly to the `dependencies` block in `studio/package.json`, keeping alphabetical order — it goes first, before `@sanity/code-input`:

```json
    "@portabletext/types": "^2.0.13",
```

Do not change any other dependency version, and do not remove the `overrides` block pinning `@sanity/sdk-react` to `2.19.0`.

- [ ] **Step 5: Install and verify the tree resolves**

```bash
cd studio && npm install
```

Expected: completes without an `ERESOLVE` error. If `@portabletext/types@^2.0.13` does not exist, run `npm view @portabletext/types version` and use the caret range for the version it reports.

- [ ] **Step 6: Verify the Studio typechecks with no schema**

```bash
cd studio && npx tsc --noEmit
```

Expected: exit 0, no output.

- [ ] **Step 7: Commit**

```bash
git add studio/package.json studio/package-lock.json studio/sanity.config.ts
git add -A studio/schemaTypes
git commit -m "chore(studio): remove scaffold schema, add @portabletext/types

The scaffold's post.ts declares type name 'post', colliding with the
postType being ported from the model. @portabletext/types is imported by
utils/pt-to-plain-text.ts and was only transitive in the model."
```

---

### Task 2: Bulk-port the 126 source files

Copies every in-scope file from the model into `studio/`, preserving the directory layout. No content is edited in this task — later tasks do that — so a failure here is purely a copy or path error.

**Files:**
- Create: `studio/actions/` (3 files), `studio/consts/` (9 files), `studio/utils/` (6 files), `studio/structure/website-structure.ts`, `studio/schemas/website/**` (105 files), `studio/schemas/lyra-index.ts`, `studio/desk.ts`

**Interfaces:**
- Consumes: Task 1's cleared `studio/`.
- Produces: the full file tree. Every later task edits files created here. Note that `schemas/lyra-index.ts` is copied from `schemas/arratech-index.ts` but still contains its original `arratechSchema` export and portal/webinar/deprecated imports — Task 3 fixes that.

- [ ] **Step 1: Write the copy script**

Create `scratch-port.sh` in the repo root (it is deleted in Step 6, so do not commit it):

```bash
#!/usr/bin/env bash
set -euo pipefail

SRC="model/sanity-studio"
DST="studio"

# Directories copied wholesale, minus the excluded branches.
mkdir -p "$DST/actions" "$DST/consts/config" "$DST/consts/curated" "$DST/utils" "$DST/structure"

cp "$SRC"/actions/*.ts                       "$DST/actions/"
cp "$SRC"/consts/*.ts                        "$DST/consts/"
cp "$SRC"/consts/config/*.ts                 "$DST/consts/config/"
cp "$SRC"/consts/curated/curated-types.ts    "$DST/consts/curated/"
cp "$SRC"/utils/*.ts                         "$DST/utils/"
cp "$SRC"/structure/website-structure.ts     "$DST/structure/"
cp "$SRC"/desk.ts                            "$DST/desk.ts"

# Website schemas: mirror the tree, then remove the excluded files.
mkdir -p "$DST/schemas"
cp -R "$SRC/schemas/website" "$DST/schemas/website"
cp "$SRC/schemas/arratech-index.ts" "$DST/schemas/lyra-index.ts"

# Excluded: Webinars
rm -rf "$DST/schemas/website/documents/webinars"
rm -f  "$DST/schemas/website/documents/settings/webinars.ts"
rm -f  "$DST/schemas/website/objects/settings/webinarsSettings.ts"
rm -f  "$DST/schemas/website/objects/settings/webinarThankYou.ts"

# Excluded: DEPRECATED sections
rm -f "$DST/schemas/website/documents/sections/textBlocks.ts"
rm -f "$DST/schemas/website/documents/sections/textCards.ts"
rm -f "$DST/schemas/website/objects/ui/textBlock.ts"
rm -f "$DST/schemas/website/objects/ui/textCard.ts"

echo "copied."
```

Portal, staging, and `scripts/` are excluded by never being copied. `consts/curated/portal-curated-types.ts` is excluded by naming `curated-types.ts` explicitly instead of using a glob.

- [ ] **Step 2: Run the script**

```bash
bash scratch-port.sh
```

Expected: prints `copied.` and exits 0.

- [ ] **Step 3: Verify the file counts match the spec exactly**

```bash
cd studio
echo -n "actions (want 3): ";           find actions -type f | wc -l
echo -n "consts (want 9): ";            find consts -type f | wc -l
echo -n "utils (want 6): ";             find utils -type f | wc -l
echo -n "structure (want 1): ";         find structure -type f | wc -l
echo -n "schemas/website (want 105): "; find schemas/website -type f | wc -l
echo -n "schemas root (want 1): ";      find schemas -maxdepth 1 -type f | wc -l
```

Expected: `3`, `9`, `6`, `1`, `105`, `1`. A mismatch means the copy or an exclusion went wrong — fix the script and re-run rather than patching by hand.

- [ ] **Step 4: Verify no excluded file slipped through**

```bash
cd studio && find . -path ./node_modules -prune -o -type f -print \
  | grep -Ei "portal|staging|webinar|textCard|textBlock|backfill" || echo "CLEAN"
```

Expected: `CLEAN`. Any hit is an excluded file that must be removed.

- [ ] **Step 5: Verify the dangling references are exactly the seven known ones**

```bash
cd studio && grep -rlE "webinar|Webinar|textCard|textBlock|textCards|textBlocks|portalSchema" \
  --include="*.ts" . | grep -v node_modules | sort
```

Expected exactly these seven paths, and no others:

```
./actions/document.actions.ts
./consts/config/protected-page-slugs.ts
./consts/curated/curated-types.ts
./consts/website-section-types.ts
./schemas/lyra-index.ts
./schemas/website/documents/settings/reading.ts
./structure/website-structure.ts
```

These are the files Tasks 3 and 4 repair. An eighth file here means the exclusion analysis missed a dependency — stop and investigate before continuing.

- [ ] **Step 6: Delete the scratch script**

```bash
rm scratch-port.sh
```

- [ ] **Step 7: Commit**

`tsc` is deliberately not run yet — the tree still has broken imports that Task 3 fixes.

```bash
git add studio/actions studio/consts studio/utils studio/structure studio/schemas studio/desk.ts
git commit -m "feat(studio): port schemas, actions, consts and utils from model

Bulk port of the 126 in-scope source files. Portal, staging, webinars and
the DEPRECATED Text Cards/Blocks sections are excluded. Dangling
references in seven files are repaired in the next commits."
```

---

### Task 3: Build the Lyra schema index

Turns the copied `arratech-index.ts` into `lyra-index.ts`: drops the portal spread and the nine webinar/deprecated entries, and renames the export.

**Files:**
- Modify: `studio/schemas/lyra-index.ts`

**Interfaces:**
- Consumes: every schema module under `studio/schemas/website/`.
- Produces: `export const lyraSchema` — an array of 77 registered schema types. Task 6 imports it into `sanity.config.ts` as `import {lyraSchema} from './schemas/lyra-index'`.

- [ ] **Step 1: Remove the ten dead imports**

Delete these exact lines from `studio/schemas/lyra-index.ts`:

```ts
import {portalSchema} from './portal-index'
import {textBlocksType} from './website/documents/sections/textBlocks'
import {textCardsType} from './website/documents/sections/textCards'
import {textBlock} from './website/objects/ui/textBlock'
import {textCard} from './website/objects/ui/textCard'
import {webinarPage} from './website/documents/webinars/webinarPage'
import {webinarCat} from './website/documents/webinars/webinarCat'
import {webinarsSettings} from './website/objects/settings/webinarsSettings'
import {webinars} from './website/documents/settings/webinars'
import {webinarThankYou} from './website/objects/settings/webinarThankYou'
```

- [ ] **Step 2: Rename the export and remove the dead array entries**

Change the declaration line:

```ts
export const arratechSchema = [
  ...portalSchema,

  /* Pages */
```

to:

```ts
export const lyraSchema = [
  /* Pages */
```

Then delete this whole block, including its comment:

```ts
  /* Webinars */
  webinars,
  webinarsSettings,
  webinarThankYou,
  webinarPage,
  webinarCat,

```

Then delete the two lines `  textBlocksType,` and `  textCardsType,` from the `/* Sections */` block, and the two lines `  textBlock,` and `  textCard,` from the `/* Objects */` block.

- [ ] **Step 3: Verify no excluded type remains in the index**

```bash
cd studio && grep -nE "portal|webinar|Webinar|textBlock|textCard|arratech" schemas/lyra-index.ts || echo "CLEAN"
```

Expected: `CLEAN`.

- [ ] **Step 4: Verify the registered type count is 77**

```bash
cd studio && sed -n '/^export const lyraSchema/,/^]/p' schemas/lyra-index.ts | grep -cE "^  [a-z]"
```

Expected: `77`. The model registered 86 website-side types; 86 − 5 webinars − 4 deprecated = 77.

- [ ] **Step 5: Commit**

```bash
git add studio/schemas/lyra-index.ts
git commit -m "feat(studio): build lyraSchema index

Drops the portal spread and the nine webinar/deprecated entries, leaving
77 registered types. Renames arratechSchema to lyraSchema."
```

---

### Task 4: Repair the six remaining dangling references

Each of these files survives the port but names a type that no longer exists.

**Files:**
- Modify: `studio/consts/website-section-types.ts`
- Modify: `studio/consts/curated/curated-types.ts`
- Modify: `studio/consts/config/protected-page-slugs.ts`
- Modify: `studio/actions/document.actions.ts`
- Modify: `studio/schemas/website/documents/settings/reading.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `websiteSectionTypes` (18 strings) and `allSectionTypes` (18 `{type}` objects) used by `pageType.sections` and the desk's Used/Unused lists; `CURATED_TYPES` used by `desk.ts`; `PROTECTED_PAGE_SLUGS` used by `pageType` and `protect-core-pages.ts`; `documentActions: DocumentActionsResolver` used by `sanity.config.ts`.

`structure/website-structure.ts` is the seventh file and is handled in Task 5, where it is rewritten wholesale.

- [ ] **Step 1: Trim `website-section-types.ts` from 20 to 18**

Delete these two lines from the `websiteSectionTypes` array in `studio/consts/website-section-types.ts`:

```ts
  'textBlocksType',
  'textCardsType',
```

Leave `getPageSectionTypes` and `allSectionTypes` untouched — they derive from the array.

- [ ] **Step 2: Verify the count is 18**

```bash
cd studio && sed -n "/^export const websiteSectionTypes/,/^]/p" consts/website-section-types.ts | grep -c "'"
```

Expected: `18`.

- [ ] **Step 3: Prune `curated-types.ts`**

In `studio/consts/curated/curated-types.ts`, delete the import line:

```ts
import {PORTAL_CURATED_TYPES} from './portal-curated-types'
```

Change the array opening from:

```ts
export const CURATED_TYPES = [
  ...PORTAL_CURATED_TYPES,
  'media.tag',
```

to:

```ts
export const CURATED_TYPES = [
  'media.tag',
```

Then delete these four entries:

```ts
  'webinarPage',
  'webinarCat',
```

```ts
  'textBlocksType',
  'textCardsType',
```

Leave the trailing `] as const` in place. Note the blank line that separated the webinar pair from its neighbours — remove it too so the blog and section groups stay visually distinct.

- [ ] **Step 4: Drop the webinars slug from `protected-page-slugs.ts`**

In `studio/consts/config/protected-page-slugs.ts`, change:

```ts
export const PROTECTED_PAGE_SLUGS = new Set(['home', 'home-page', 'homepage', 'blog', 'webinars'])
```

to:

```ts
export const PROTECTED_PAGE_SLUGS = new Set(['home', 'home-page', 'homepage', 'blog'])
```

- [ ] **Step 5: Drop the webinarPage branch from `document.actions.ts`**

In `studio/actions/document.actions.ts`, change:

```ts
  if (ctx.schemaType === 'page' || ctx.schemaType === 'post' || ctx.schemaType === 'webinarPage') {
```

to:

```ts
  if (ctx.schemaType === 'page' || ctx.schemaType === 'post') {
```

- [ ] **Step 6: Drop the webinars field from `reading.ts`**

In `studio/schemas/website/documents/settings/reading.ts`, delete this entire field, including the blank line before it:

```ts
    defineField({
      name: 'webinars',
      type: 'webinars',
      title: 'Webinars • Content & Settings',
      validation: (Rule) =>
        Rule.custom((val: {page?: {_ref?: string}} | undefined) => {
          if (!val?.page?._ref) return 'Webinars page is required.'
          return true
        }),
    }),
```

The `blogSettings` field becomes the last entry in the `fields` array. Make sure it keeps its trailing comma or not consistently with how the array closes — the array closes with `],` after the last field, so a trailing comma on `blogSettings` is correct.

- [ ] **Step 7: Verify every dangling reference is gone**

```bash
cd studio && grep -rnE "webinar|Webinar|textCard|textBlock|portalSchema|PORTAL_CURATED" \
  --include="*.ts" . | grep -v node_modules | grep -v "^./structure/website-structure.ts"
```

Expected: no output. `website-structure.ts` is excluded from this check because Task 5 rewrites it.

- [ ] **Step 8: Commit**

```bash
git add studio/consts studio/actions/document.actions.ts studio/schemas/website/documents/settings/reading.ts
git commit -m "fix(studio): drop webinar and deprecated-section references

Removes the excluded types from the section list, curated types,
protected slugs, document actions and reading settings."
```

---

### Task 5: Flatten the desk structure

Rewrites `website-structure.ts` to return a list of items rather than one wrapping item, drops the Webinars branch and the two DEPRECATED entries, and rewires `desk.ts` to spread the items at the root.

**Files:**
- Modify: `studio/structure/website-structure.ts` (full rewrite)
- Modify: `studio/desk.ts` (full rewrite)

**Interfaces:**
- Consumes: `STUDIO_API_VERSION` from `consts/config/studio-api-version`, `websiteSectionTypes` from `consts/website-section-types`, `CURATED_TYPES` from `consts/curated/curated-types`.
- Produces: `websiteStructure(S: StructureBuilder): ListItemBuilder[]` — note the array return type, changed from the model's single `ListItemBuilder`. `desk.ts` default-exports `lyraDesk: StructureResolver`, imported by `sanity.config.ts` in Task 6.

- [ ] **Step 1: Rewrite `structure/website-structure.ts`**

Replace the whole file with this. The `DocumentVideoIcon` and `RocketIcon` imports are gone (Webinars branch and the removed wrapper), and the function now returns the item array directly.

```ts
import type {StructureBuilder, ListItemBuilder} from 'sanity/structure'
import {BarChartIcon} from '@sanity/icons/BarChart'
import {BoltIcon} from '@sanity/icons/Bolt'
import {BookIcon} from '@sanity/icons/Book'
import {CogIcon} from '@sanity/icons/Cog'
import {ComposeSparklesIcon} from '@sanity/icons/ComposeSparkles'
import {ControlsIcon} from '@sanity/icons/Controls'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {StackIcon} from '@sanity/icons/Stack'
import {SunIcon} from '@sanity/icons/Sun'
import {PublishIcon} from '@sanity/icons/Publish'
import {UnpublishIcon} from '@sanity/icons/Unpublish'
import {STUDIO_API_VERSION} from '../consts/config/studio-api-version'
import {websiteSectionTypes} from '../consts/website-section-types'

const isArchived = `_type == $type && defined(archivedAt)`
const isActive = `_type == $type && !defined(archivedAt)`

export const websiteStructure = (S: StructureBuilder): ListItemBuilder[] => [
  S.listItem()
    .title('Pages')
    .icon(DocumentsIcon)
    .child(
      S.list()
        .title('Pages')
        .items([
          S.listItem()
            .title('Published')
            .icon(PublishIcon)
            .child(
              S.documentList()
                .title('Published Pages')
                .schemaType('page')
                .filter(isActive)
                .params({type: 'page'})
                .apiVersion(STUDIO_API_VERSION),
            ),
          S.listItem()
            .title('Archived')
            .icon(UnpublishIcon)
            .child(
              S.documentList()
                .title('Archived Pages')
                .filter(isArchived)
                .params({type: 'page'})
                .apiVersion(STUDIO_API_VERSION),
            ),
        ]),
    ),

  S.documentTypeListItem('post')
    .title('Blog')
    .icon(ComposeSparklesIcon)
    .child(
      S.list()
        .title('Blog')
        .items([
          S.listItem()
            .title('Posts')
            .icon(DocumentsIcon)
            .child(
              S.list()
                .title('Posts')
                .items([
                  S.listItem()
                    .title('Published')
                    .icon(PublishIcon)
                    .child(
                      S.documentList()
                        .title('Published Posts')
                        .schemaType('post')
                        .filter(isActive)
                        .params({type: 'post'})
                        .apiVersion(STUDIO_API_VERSION),
                    ),
                  S.listItem()
                    .title('Archived')
                    .icon(UnpublishIcon)
                    .child(
                      S.documentList()
                        .title('Archived Posts')
                        .filter(isArchived)
                        .params({type: 'post'})
                        .apiVersion(STUDIO_API_VERSION),
                    ),
                ]),
            ),

          S.documentTypeListItem('category').title('Categories'),
          S.documentTypeListItem('tag').title('Tags'),
          S.documentTypeListItem('author').title('Authors'),
        ]),
    ),

  S.listItem()
    .title('Sections (Common)')
    .icon(StackIcon)
    .child(
      S.list()
        .title('Sections')
        .items([
          S.listItem()
            .title('All (Used)')
            .child(
              S.documentList()
                .title('Used Sections')
                .filter('_type in $types && count(*[references(^._id)]) > 0')
                .params({types: websiteSectionTypes})
                .apiVersion(STUDIO_API_VERSION),
            ),
          S.listItem()
            .title('Unused')
            .child(
              S.documentList()
                .title('Unused Sections (Safe to Delete)')
                .filter('_type in $types && count(*[references(^._id)]) == 0')
                .params({types: websiteSectionTypes})
                .apiVersion(STUDIO_API_VERSION),
            ),
          S.divider(),
          S.documentTypeListItem('aboutInfoType').title('About Info'),
          S.documentTypeListItem('accordionType').title('Accordion'),
          S.documentTypeListItem('accreditationType').title('Accreditations'),
          S.documentTypeListItem('blogSection').title('Blog Overview'),
          S.documentTypeListItem('comparisonType').title('Comparison'),
          S.documentTypeListItem('contentBlocks').title('Content Blocks'),
          S.documentTypeListItem('ctaBannerType').title('CTA Banner'),
          S.documentTypeListItem('formType').title('Form'),
          S.documentTypeListItem('topHeroType').title('Hero'),
          S.documentTypeListItem('keyFeaturesType').title('Features'),
          S.documentTypeListItem('mapType').title('Map (Google)'),
          S.documentTypeListItem('productsType').title('Products'),
          S.documentTypeListItem('solutionsType').title('Solutions'),
          S.documentTypeListItem('stepperType').title('Stepper'),
          S.documentTypeListItem('tableType').title('Table'),
          S.documentTypeListItem('teamOverviewType').title('Team'),
          S.documentTypeListItem('textImageType').title('Text & Image'),
          S.documentTypeListItem('textOnlyType').title('Text Only'),
        ]),
    ),

  S.divider(),

  S.listItem()
    .title('Appearance')
    .icon(SunIcon)
    .child(
      S.list()
        .title('Appearance')
        .items([
          S.listItem().title('Header').id('siteHeader').child(
            S.document().title('Header').schemaType('siteHeader').documentId('siteHeader'), // singleton
          ),

          S.listItem().title('Footer').id('siteFooter').child(
            S.document().title('Footer').schemaType('siteFooter').documentId('siteFooter'), // singleton
          ),

          S.documentTypeListItem('menu').title('Menus'),
        ]),
    ),

  S.listItem()
    .title('Settings')
    .icon(ControlsIcon)
    .child(
      S.list()
        .title('Settings')
        .id('websiteSettings')
        .items([
          S.listItem()
            .title('General')
            .icon(CogIcon)
            .id('generalSettings')
            .child(
              S.document()
                .title('General')
                .schemaType('generalSettings')
                .documentId('generalSettings'),
            ), // singleton
          S.listItem()
            .title('Reading')
            .icon(BookIcon)
            .id('readingSettings')
            .child(
              S.document()
                .title('Reading')
                .schemaType('readingSettings')
                .documentId('readingSettings'),
            ), // singleton
          S.listItem()
            .title('SEO & Metadata')
            .icon(BoltIcon)
            .id('seoSettings')
            .child(
              S.document()
                .title('SEO & Metadata')
                .schemaType('seoSettings')
                .documentId('seoSettings'),
            ), // singleton

          S.listItem()
            .title('Tracking & Analytics')
            .icon(BarChartIcon)
            .id('trackingSettings')
            .child(
              S.document()
                .title('Tracking & Analytics')
                .schemaType('trackingSettings')
                .documentId('trackingSettings'),
            ), // singleton
        ]),
    ),
]
```

- [ ] **Step 2: Verify every section type in the constant is wired into the desk**

The Sections list must offer exactly the 18 types in `websiteSectionTypes`. This loops over the constant and greps for each one:

```bash
cd studio
for t in aboutInfoType accordionType accreditationType blogSection comparisonType \
         contentBlocks ctaBannerType formType topHeroType keyFeaturesType mapType \
         productsType solutionsType stepperType tableType teamOverviewType \
         textImageType textOnlyType; do
  grep -q "documentTypeListItem('$t')" structure/website-structure.ts || echo "MISSING: $t"
done
echo "checked 18"
```

Expected: only `checked 18`. Any `MISSING:` line means a section type exists in `websiteSectionTypes` but has no desk entry, so editors could never reach it.

Then confirm nothing extra crept in — the Sections child list must contain exactly 18 `documentTypeListItem` calls, and the whole file exactly 23 (18 sections + `post`, `category`, `tag`, `author` in Blog, and `menu` in Appearance):

```bash
cd studio && grep -c "S.documentTypeListItem(" structure/website-structure.ts
```

Expected: `23`.

- [ ] **Step 3: Rewrite `desk.ts`**

Replace the whole file:

```ts
import {StructureResolver} from 'sanity/structure'
import {websiteStructure} from './structure/website-structure'
import {CURATED_TYPES} from './consts/curated/curated-types'

const lyraDesk: StructureResolver = (S) =>
  S.list()
    .title('Lyra Desk')
    .items([
      ...websiteStructure(S),

      // Default fallback list — should render empty when CURATED_TYPES is complete
      ...S.documentTypeListItems().filter(
        (item) => !CURATED_TYPES.includes((item.getId() ?? '') as any),
      ),
    ])

export default lyraDesk
```

- [ ] **Step 4: Typecheck**

```bash
cd studio && npx tsc --noEmit
```

Expected: exit 0. The structure files are not yet imported by `sanity.config.ts`, but `tsc` covers them via the tsconfig `include` glob, so a wrong return type or a missing icon import fails here.

- [ ] **Step 5: Commit**

```bash
git add studio/structure/website-structure.ts studio/desk.ts
git commit -m "feat(studio): flatten desk structure to root

websiteStructure now returns ListItemBuilder[] and desk.ts spreads it at
the root, removing the Website (Marketing) / Website Content wrapper that
only existed to sit beside Portal. Drops the Webinars branch and the two
DEPRECATED section entries."
```

---

### Task 6: Wire the config

Connects the schema index, desk structure, singleton template filter, and document actions into `sanity.config.ts`. This is the first point where the Studio is fully assembled and schema resolution can be checked.

**Files:**
- Modify: `studio/sanity.config.ts`

**Interfaces:**
- Consumes: `lyraSchema` (Task 3), `lyraDesk` (Task 5), `documentActions` (Task 4), `singletonTypes` (ported in Task 2).
- Produces: a bootable Studio. Task 7 and 8 verify and rebrand it.

- [ ] **Step 1: Rewrite `sanity.config.ts`**

The model used a two-workspace array for staging and production. Because there is no staging environment, this collapses to a single `defineConfig({...})`. **Do not add `basePath`** — with one workspace, `basePath: '/production'` would serve the Studio at `/production` instead of `/`.

```ts
import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {table} from '@sanity/table'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {media} from 'sanity-plugin-media'
import {structureTool} from 'sanity/structure'
import {documentActions} from './actions/document.actions'
import {singletonTypes} from './consts/config/singleton-types'
import lyraDesk from './desk'
import {lyraSchema} from './schemas/lyra-index'

export default defineConfig({
  name: 'default',
  title: 'Lyra Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({
      structure: lyraDesk,
    }),
    media(),
    visionTool(),
    codeInput(),
    colorInput(),
    table(),
  ],

  schema: {
    types: lyraSchema,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: documentActions,
  },
})
```

- [ ] **Step 2: Typecheck**

```bash
cd studio && npx tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 3: Run schema extraction — the discriminating check**

```bash
cd studio && npx sanity schema extract --force
```

Expected: exit 0, writes `studio/schema.json`. **This is the check that `tsc` cannot do.** Duplicate type names and orphan `type:` / `to:` references to deleted types are resolved at runtime by Sanity, not by the compiler, so they surface only here. A message naming `webinarPage`, `textCard`, `textBlock`, or any portal type means an exclusion was missed — go back and fix the referencing file rather than re-adding the type.

If the command fails with a styled-components or React resolution error during manifest extraction, add the model's Vite workaround to `studio/sanity.cli.ts` — a `vite` key forcing `styled-components` into `ssr.noExternal`. Only do this if extraction actually fails.

- [ ] **Step 4: Confirm the extracted schema has the right shape**

```bash
cd studio && node -e "const s=require('./schema.json'); console.log('types:', s.length); console.log('excluded present:', s.filter(t=>/webinar|textCard|textBlock|apiPage|tutorial/i.test(t.name)).map(t=>t.name))"
```

Expected: `types:` a number of at least 77 (Sanity adds built-ins such as `sanity.imageAsset` on top of the registered types), and `excluded present: []`.

- [ ] **Step 5: Commit**

```bash
git add studio/sanity.config.ts studio/schema.json
git commit -m "feat(studio): wire lyraSchema, desk, singletons and actions into config

Collapses the model's staging/production workspace array to a single
workspace. basePath is intentionally omitted so the Studio serves at root."
```

---

### Task 7: Rebrand — remove every trace of Arratech

Fourteen model files carried the Arratech name. The identifier swaps are mechanical; the palette and the placeholder text are not, and are handled deliberately.

**Files:**
- Modify: `studio/consts/brand-colors.ts` (full rewrite)
- Modify: `studio/schemas/website/documents/settings/general.ts`
- Modify: `studio/schemas/website/documents/settings/seo.ts`
- Modify: `studio/schemas/website/objects/settings/common/cmmBgSettings.ts`
- Modify: `studio/schemas/website/objects/settings/sections/ctaBannerSettings.ts`
- Modify: `studio/schemas/website/objects/editor/blockContentMaxi.ts`
- Modify: `studio/package.json`

**Interfaces:**
- Consumes: nothing new.
- Produces: `brandColors` keeps its exact shape — `{colorList: (string | {r,g,b,a})[]}` — so every `type: 'color'` field that passes `options: brandColors` keeps working unchanged.

- [ ] **Step 1: Replace the brand palette**

Arratech's hex values are another company's brand and are not carried over. Replace `studio/consts/brand-colors.ts` entirely. The array keeps its 14 entries and its shape, including the transparent RGBA object in the last position:

```ts
// TODO: replace with the real Lyra brand palette.
// https://www.sanity.io/plugins/color-input

export const brandColors = {
  colorList: [
    '#2563EB', // Lyra Primary
    '#1D4ED8', // Lyra Primary 90
    '#3B82F6', // Lyra Primary 80
    '#60A5FA', // Lyra Primary 70
    '#000000', // Black
    '#0F172A', // Lyra Slate 100
    '#1E293B', // Lyra Slate 90
    '#334155', // Lyra Slate 80
    '#475569', // Lyra Slate 70
    '#94A3B8', // Lyra Slate 60
    '#CBD5E1', // Lyra Slate 20
    '#E2E8F0', // Lyra Gray 20
    '#ffffff', // White
    {r: 255, g: 255, b: 255, a: 0}, // Transparent
  ],
}
```

- [ ] **Step 2: Swap the three display titles — leave every `value:` alone**

These three edits change only human-facing text. The stored `value` strings stay exactly as they are, so no existing or future content is orphaned.

In `studio/schemas/website/objects/settings/common/cmmBgSettings.ts`:

```ts
          {title: 'Arratech Banner', value: 'banner'},
```

becomes

```ts
          {title: 'Lyra Banner', value: 'banner'},
```

In `studio/schemas/website/objects/settings/sections/ctaBannerSettings.ts`:

```ts
          {title: 'Arratech Banner (Default)', value: 'banner'},
```

becomes

```ts
          {title: 'Lyra Banner (Default)', value: 'banner'},
```

In `studio/schemas/website/objects/editor/blockContentMaxi.ts`:

```ts
        {title: 'BlockQuote (Arratech Style)', value: 'blockquote'},
```

becomes

```ts
        {title: 'BlockQuote (Lyra Style)', value: 'blockquote'},
```

- [ ] **Step 3: Replace the site identity placeholders in `general.ts`**

In `studio/schemas/website/documents/settings/general.ts`, change the two `placeholder` values:

```ts
      placeholder: 'https://www.arratech.com',
```

becomes

```ts
      placeholder: 'https://www.lyra.com',
```

and

```ts
      placeholder: 'office@arratech.com',
```

becomes

```ts
      placeholder: 'office@lyra.com',
```

- [ ] **Step 4: Replace the identity and business placeholders in `seo.ts`**

In `studio/schemas/website/documents/settings/seo.ts` make five changes. The keywords and classification text describe Arratech's *business* rather than merely containing the word, so they are neutralised too.

`classification` field:

```ts
      placeholder: 'Business Software',
```

becomes

```ts
      placeholder: 'Software',
```

`keywords` field — both the description and the placeholder:

```ts
      description: 'Comma-separated keywords for SEO (e.g. "e-invoicing, Peppol, API")',
      placeholder: 'e-invoicing, Peppol, API',
```

becomes

```ts
      description: 'Comma-separated keywords for SEO (e.g. "web design, branding, strategy")',
      placeholder: 'web design, branding, strategy',
```

`twitterHandle` field — both the description and the placeholder:

```ts
      description: 'Twitter handle, e.g. @arratech',
      placeholder: '@arratech',
```

becomes

```ts
      description: 'Twitter handle, e.g. @lyra',
      placeholder: '@lyra',
```

`linkedinHandle` field:

```ts
      placeholder: '/company/arratech-ab',
```

becomes

```ts
      placeholder: '/company/lyra',
```

Leave the `category` placeholder `'Technology'` as it is — it is already generic.

- [ ] **Step 5: Rename the package**

In `studio/package.json`, change:

```json
  "name": "lyra",
```

to:

```json
  "name": "lyra-sanity-studio",
```

- [ ] **Step 6: Verify zero Arratech occurrences**

```bash
cd studio && grep -rin "arratech" . --exclude-dir=node_modules --exclude-dir=.sanity --exclude-dir=dist || echo "CLEAN"
```

Expected: `CLEAN`. If `schema.json` matches, it is a stale extraction artifact — re-run `npx sanity schema extract --force` and check again.

- [ ] **Step 7: Verify the palette shape survived**

```bash
cd studio && npx tsc --noEmit && npx sanity schema extract --force
```

Expected: both exit 0. A malformed `brandColors` breaks every `options: brandColors` field at schema resolution.

- [ ] **Step 8: Commit**

```bash
git add studio/consts/brand-colors.ts studio/schemas studio/package.json studio/schema.json
git commit -m "feat(studio): rebrand from Arratech to Lyra

Replaces the brand palette with a marked placeholder ramp rather than
carrying over another company's hex values. Display titles change while
stored values stay untouched, so no content is orphaned."
```

---

### Task 8: Document, verify end to end, and smoke-test the desk

Adds the Studio README and runs the full verification gate from the spec, including a manual click-through that no automated check can replace.

**Files:**
- Modify: `studio/README.md` (full rewrite)

**Interfaces:**
- Consumes: everything.
- Produces: a verified, documented Studio.

- [ ] **Step 1: Rewrite `studio/README.md`**

Replace the Sanity scaffold README with this:

````markdown
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
| `npm run typegen` | Extract the schema and regenerate `../web/sanity.types.ts` |

`npm run typegen` writes into `web/`. Run it only as part of frontend work, and
expect to update the queries in `web/src` alongside it.

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
````

Do not document Portal, Webinars, staging, or the deprecated sections — they do not exist here.

- [ ] **Step 2: Run the full verification gate**

```bash
cd studio
npx sanity schema extract --force   # expect exit 0
npx tsc --noEmit                    # expect exit 0
grep -rin "arratech" . --exclude-dir=node_modules --exclude-dir=.sanity --exclude-dir=dist || echo "CLEAN"
```

Expected: two clean exits and `CLEAN`. Record the actual output — do not claim success without it.

- [ ] **Step 3: Confirm `web/` was never touched**

```bash
cd .. && git status --porcelain web/
```

Expected: no output. Any change under `web/` violates the scope and must be reverted with `git checkout -- web/`.

- [ ] **Step 4: Start the Studio**

```bash
cd studio && npm run dev
```

Expected: compiles and serves, with no schema warnings in the terminal. Open the printed URL.

- [ ] **Step 5: Click through every desk branch**

Verify each of these renders without an error boundary:

- **Pages** → Published, Archived
- **Blog** → Posts → Published, Archived; Categories; Tags; Authors
- **Sections (Common)** → All (Used); Unused; then each of the 18 section types
- **Appearance** → Header, Footer, Menus
- **Settings** → General, Reading, SEO & Metadata, Tracking & Analytics

Confirm there is **no** Webinars entry, and no "Text Cards (DEPRECATED)" or "Text Blocks (DEPRECATED)" entry under Sections.

- [ ] **Step 6: Confirm the fallback list is empty**

Below the Settings item there must be no extra document-type entries. `desk.ts` appends `S.documentTypeListItems()` filtered by `CURATED_TYPES`; anything appearing there is a type missing from `CURATED_TYPES` and would show up as a duplicate root-level list. If you see any, add its type name to `studio/consts/curated/curated-types.ts`.

- [ ] **Step 7: Spot-check a singleton and the archive action**

Open **Settings → General**. Confirm the document opens directly (not as a list) and that the action menu offers only Publish / Discard changes / Restore — no Delete, no Duplicate. That proves the `singletonTypes` template filter and `documentActions` resolver are both wired.

Then open **Pages → Published**, create a page, and confirm an **Archive** action appears in its action menu.

- [ ] **Step 8: Stop the dev server and commit**

```bash
git add studio/README.md
git commit -m "docs(studio): add Lyra Studio README

Documents the ported structure, required env vars, and the two known
follow-ups: the placeholder brand palette and the deferred typegen pass."
```

---

## Verification Summary

The port is complete when all of the following hold, with output recorded:

1. `npx sanity schema extract --force` in `studio/` exits 0.
2. `npx tsc --noEmit` in `studio/` exits 0.
3. `grep -rin "arratech" studio/ --exclude-dir=node_modules --exclude-dir=.sanity --exclude-dir=dist` returns nothing.
4. `git status --porcelain web/` returns nothing.
5. Every desk branch renders, with no Webinars and no DEPRECATED entries.
6. The desk fallback list is empty.
7. `studio/schemas/lyra-index.ts` registers 77 types.
