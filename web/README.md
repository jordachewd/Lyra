# Lyra Web

Next.js 16 frontend for Lyra. The site uses the App Router, React 19 Server
Components, and Sanity as the external CMS. Content models and editorial
workflows live in the sibling [`../studio`](../studio) project; this package
only consumes that content.

- Deployment target: `https://lyra.jwd-apps.com`
- Sanity project `pg4jpzc7`, dataset `production`

## What This Package Does

- Renders CMS-driven marketing pages and blog posts
- Fetches Sanity content through GROQ queries and validates it with Zod at runtime
- Applies tag-based caching plus webhook-driven revalidation (tags and paths)
- Loads GTM and HubSpot only through the current consent model
- Supports both custom forms and embedded HubSpot forms
- Ships a standalone Next.js build

## Stack

| Area | Packages |
| --- | --- |
| Framework | `next@16.3.1`, `react@19.2.8`, `react-dom@19.2.8` |
| Language | `typescript@5.9.3` |
| CMS | `@sanity/client@7.26.2`, `next-sanity@13.3.3`, `groq@6.10.1`, `@sanity/image-url@2.1.1` |
| Validation | `zod@4.4.3` |
| Rich text | `@portabletext/react@7.0.1`, `@portabletext/types@4.0.2` |
| Styling | `sass@1.103.1`, `classnames@2.5.1` |
| Asset helpers | `@svgr/webpack@8.1.0`, `next/image` + Sanity metadata |
| Analytics helpers | `@next/third-parties@16.3.2` |
| Tooling | `eslint@9.39.5`, `eslint-config-next@16.3.1`, `knip@6.32.2` |

## Architecture

### Request flow

1. The request enters the Next.js app.
2. `proxy.ts` applies CSP headers, generates a nonce, and writes the
   `__page_class` cookie used by body-class logic.
3. Server components load global/site content from Sanity.
4. `lib/data/*` loaders call raw fetchers in `lib/data/utils/*`.
5. GROQ queries from `lib/queries/*` fetch Sanity data with `useCdn: false`.
6. Zod schemas from `lib/zod/*` validate the response shape before render.
7. `cacheByTag()` wraps `unstable_cache()` for published content.
8. `/api/revalidate` invalidates both cache tags and paths after Sanity webhooks.

### Rendering model

- App Router only
- Server Components by default
- Client islands for consent UI, blog filters, pagination, navigation behavior,
  CTA tracking, and form submission
- Preview client selection is gated by `draftMode()` **and**
  `NODE_ENV === 'development'`, so draft preview is a local-development flow
  rather than a production-hosted one

### Header and navigation

`Header` reads three content areas from Sanity:

- **`aboveMenu`** — optional strip of up to 3 utility links above the main nav;
  each item can carry an icon and a `hideOnMobile` flag
- **`menu`** — the primary navigation tree (items → children → grandchildren)
- **`menuType`** — controls the desktop layout:
  - `'dropdown'` (default) — vertical dropdown submenus (`HeaderDropdownNav`)
  - `'megamenu'` — full-width panel with icon/description support
    (`HeaderMegaMenuNav`)

`NavClientLogic` is a zero-output client component mounted alongside the nav. It
handles closing menus on route change and click-outside, Escape key focus
return, Arrow-key focus cycling, the mobile one-at-a-time accordion, the `inert`
attribute on main/footer while the mobile nav is open, and body scroll lock.

## Route Inventory

| Route | Source | Notes |
| --- | --- | --- |
| `/` | `app/page.tsx` | Home page slug resolved from Sanity reading settings |
| `/[slug]` | `app/(content)/[slug]/page.tsx` | Generic CMS-driven page route |
| `/blog` | `app/(content)/blog/page.tsx` | Paginated listing; supports `page`, `tag`, `category`, `author` search params |
| `/blog/[slug]` | `app/(content)/blog/[slug]/page.tsx` | Blog detail page |
| `/api/consent` | `app/api/consent/route.tsx` | Node route storing consent state |
| `/api/forms/submit` | `app/api/forms/submit/route.tsx` | Node route; verifies reCAPTCHA and forwards leads |
| `/api/revalidate` | `app/api/revalidate/route.tsx` | Node route; validates Sanity webhooks and revalidates cache |
| `/robots.txt` | `app/robots.ts` | Allows crawling with selected disallows |
| `/sitemap.xml` | `app/sitemap.ts` | `/` plus Sanity pages and posts; certain slugs excluded |
| `/manifest.webmanifest` | `app/manifest.ts` | Next.js serves `manifest.ts` at the `.webmanifest` path |
| `*` (unmatched) | `app/not-found.tsx` | Global 404 boundary |

## Section System

`lib/const/sections-kind.tsx` registers 18 section kinds. A section's identity
must agree in **six** places, or the section silently does not render —
`app/page.tsx` returns `null` for an unknown kind and the Zod union falls
through to `UnknownSectionSchema`. No error is logged.

The authoritative list of types is
[`../studio/consts/website-section-types.ts`](../studio/consts/website-section-types.ts).

| Studio `_type` | GROQ `kind` | Zod schema | Registry key | Component | SCSS |
| --- | --- | --- | --- | --- | --- |
| `aboutInfoType` | `aboutInfo` | `AboutSectionSchema` | `aboutInfo` | `AboutInfo.tsx` | `_about-info.scss` |
| `accordionType` | `accordion` | `AccordionSectionSchema` | `accordion` | `Accordions.tsx` | `_accordion.scss` |
| `accreditationType` | `accreditation` | `AccreditationSectionSchema` | `accreditation` | `Accreditations.tsx` | `_accreditations.scss` |
| `blogSection` | `blogSection` | `BlogOverviewSectionSchema` | `blogSection` | `BlogOverview.tsx` | `_blog-overview.scss` |
| `comparisonType` | `comparison` | `ComparisonSectionSchema` | `comparison` | `Comparison.tsx` | `_comparison.scss` |
| `contentBlocks` | `contentBlocks` | `ContentBlocksSectionSchema` | `contentBlocks` | `ContentBlocks.tsx` | `_content-blocks.scss` |
| `ctaBannerType` | `ctaBanner` | `CtaBannerSchema` | `ctaBanner` | `CtaBanner.tsx` | `_cta-banner.scss` |
| `formType` | `form` | `FormSectionSchema` | `form` | `Form.tsx` | `_form-section.scss` |
| `topHeroType` | `hero` | `HeroSectionSchema` | `hero` | `Hero.tsx` | `_hero.scss` |
| `keyFeaturesType` | `keyFeatures` | `KeyFeaturesSectionSchema` | `keyFeatures` | `KeyFeatures.tsx` | `_key-features.scss` |
| `mapType` | `mapSection` | `MapSectionSchema` | `mapSection` | `Map.tsx` | `_map.scss` |
| `productsType` | `products` | `ProductsSectionSchema` | `products` | `Products.tsx` | `_products.scss` |
| `solutionsType` | `solutions` | `SolutionsSectionSchema` | `solutions` | `Solutions.tsx` | `_solutions.scss` |
| `stepperType` | `stepper` | `StepperSectionSchema` | `stepper` | `Stepper.tsx` | `_stepper.scss` |
| `tableType` | `table` | `TableSectionSchema` | `table` | `Table.tsx` | `_table.scss` |
| `teamOverviewType` | `teamOverview` | `TeamOverviewSectionSchema` | `teamOverview` | `Team.tsx` | `_team.scss` |
| `textImageType` | `textImage` | `TextImageSectionSchema` | `textImage` | `TextImage.tsx` | `_text-image.scss` |
| `textOnlyType` | `text` | `TextOnlySectionSchema` | `text` | `TextOnly.tsx` | `_text-only.scss` |

Three mappings do not follow the pattern and are the usual source of a
mismatch: **`topHeroType` → `hero`**, **`mapType` → `mapSection`**, and
**`textOnlyType` → `text`**.

Section components live in `components/sections`, with client-only interaction
pieces under `components/sections/partials`.

Notable behaviors:

- `accreditation` supports two display modes (`grid` / `carousel`) driven by
  `accrSettings.displayType`
- `contentBlocks` renders up to 12 blocks through the `ContentBlocksList` client
  partial. `blocksSettings` controls block type (`box` / `card` / `text`), gap,
  icon visibility, alignment, blocks per row, collapsible behavior, and color
  overrides. Collapsible blocks are keyboard-accessible (`role="button"`,
  Enter/Space toggling, `aria-expanded`)
- `stepper` renders up to 10 steps. Below 1024px it is a single vertical column.
  From 1024px up, the `normal` / `reversed` / `revCentered` templates flow the
  steps **7 per row**; `centered` stays vertical at every width.

  **The steps-per-row count lives in two places that must change in lockstep:**
  `--stepsPerRow` in `styles/sections/_stepper.scss` and `STEPS_PER_ROW` in
  `components/sections/Stepper.tsx`. CSS controls how many columns fit per row;
  the constant controls which steps get `row-end` and where separators are
  inserted. Changing only one silently desynchronises the connectors from the
  actual row breaks.

  Do not reintroduce `:nth-child(Xn of S)` for the row-end rule — Blink matches
  that selector on elements but silently refuses to style their pseudo-elements.

## Project Structure

```text
app/
  (content)/            CMS page and blog routes
  api/                  consent, form submission, revalidation
  layout.tsx            globals, analytics, consent
  manifest.ts           web app manifest
  not-found.tsx         global 404 boundary
  robots.ts             robots policy
  sitemap.ts            sitemap generator
components/
  analytics/            GTM and HubSpot loaders
  blog/                 blog listing/detail UI
  consent/              server and client consent flow
  layout/               header, footer, wrappers, body helpers
    partials/           nav dispatch, dropdown/megamenu, NavClientLogic
  sections/             18 section renderers
    partials/           client-only section interaction pieces
  seo/                  JSON-LD emitters
  ui/                   rich text, image, form helpers
lib/
  analytics/            pageview tracking
  consent/              consent parsing and GTM consent updates
  const/                env, consent, section registry, portable text config
    revalidate/         global-docs and section-docs lists for the webhook handler
  data/                 cached loaders and raw fetch helpers
  hooks/                local hooks
  images/               image normalization helpers
  queries/              GROQ queries and fragments
  types/                shared TS types
  utils/                form, Sanity, SEO, and general helpers
  zod/                  runtime schemas for CMS data
styles/
  core/ common/ sections/ blog/ pages/
```

Non-JSX files under `lib/` carry a `.tsx` extension (`lib/const/env.tsx`,
`lib/queries/**/*.groq.tsx`). This is inherited from the reference
implementation and is deliberate — renaming them would rewrite every import.

## Local Development

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Install and run

```bash
npm install
npm run dev
```

The site expects the Studio's content to exist. See
[Required content](#required-content) below.

### Scripts

| Command | Behavior |
| --- | --- |
| `npm run dev` | `next dev --webpack` |
| `npm run build` | `next build --webpack` |
| `npm start` | `next start` — local verification of a production build |
| `npm run lint` | `eslint` (flat config) |
| `npm run type-check` | `tsc --noEmit` |
| `npm run type-check-watch` | `tsc --noEmit --watch` |
| `npm run knip` | unused dependency/export audit |

**`npm start` is for local verification only.** `next.config.mjs` sets
`output: 'standalone'`, and Next warns that `next start` does not honour it. A
real deployment runs the standalone server instead:

```bash
npm run build
node .next/standalone/server.js
```

The standalone output does not include `public/` or `.next/static/` — a host has
to copy both alongside `server.js`.

**The `--webpack` flag is load-bearing.** `next.config.mjs` installs
`@svgr/webpack` so `.svg` imports resolve as React components. Next 16 defaults
to Turbopack, which ignores that block — drop the flag and SVG-as-component
imports break with an error that points at the import rather than the config.
The flag belongs on `dev` and `build` only; `next start` rejects it, since it
serves an already-built bundle and selects no bundler.

**ESLint is pinned to 9.x on purpose.** `eslint-plugin-react@7.37.5` (pulled in
by `eslint-config-next`) declares a peer range topping out at `^9.7`, and
crashes on ESLint 10 with `contextOrFilename.getFilename is not a function`.
Do not bump to 10 until that plugin ships ESLint 10 support.

`npm run lint` currently reports 0 errors and 4 intentional warnings: two
`next/script` advisories (the GTM bootstrap and consent defaults are raw inline
scripts on purpose, so they can carry the CSP nonce and run before GTM), and two
`no-unused-vars` false positives on the `export const X` + `export type X =
z.infer<typeof X>` Zod idiom.

## Environment Variables

Create `.env.local` from `.env.example`.

### Public build-time variables

| Variable | Purpose | Default in `lib/const/env.tsx` |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL for metadata, robots, sitemap, manifest | `https://lyra.jwd-apps.com` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project id | `pg4jpzc7` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version | `2025-12-11` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Client-side reCAPTCHA v3 key for custom forms | none |

### Server-side variables

All are optional. Each unset value disables its feature cleanly rather than
crashing.

| Variable | Effect when unset |
| --- | --- |
| `SANITY_READ_TOKEN` | Draft preview unavailable; published content unaffected |
| `SANITY_WEBHOOK_SECRET` | `/api/revalidate` rejects every request |
| `RECAPTCHA_SECRET_KEY` | Custom form submission fails verification |
| `LEAD_RELAY_URL` | Custom form submission returns 503 at the relay step |

There is no `NEXT_PUBLIC_SITE_ENV`. The site has a single environment;
`isProduction` is simply `NODE_ENV === 'production'`.

GTM and HubSpot enablement do **not** come from env vars. They are read from the
Sanity `trackingSettings` singleton.

## Required content

The layout calls `notFound()` when `getGlobals()` returns null, so the site
renders nothing until these documents exist **and are published** in the Studio:

- **Reading Settings** — `homePage` and `blogPage` are both required by the
  Studio schema and must reference published pages
- **General Settings**, **SEO Settings**, **Tracking Settings**
- **Site Header** (with a Menu) and **Site Footer**
- At least one published `page` matching the Home Page reference

A Zod validation failure anywhere in the globals chain has the same effect: the
whole site 404s rather than degrading. If the home page unexpectedly 404s, log
the `safeParse` failure in `lib/data/utils/fetch-globals.tsx` — the reported
`path` names the field where GROQ and Zod disagree.

## Data, Caching, and Preview

### Data loaders

- `getGlobals()`
- `getPageBySlug(slug)`
- `getPostBySlug(slug)`
- `getBlogList(...)`
- `getBlogTags()`
- `getBlogCategories()`

### Cache behavior

- Published content goes through `cacheByTag()` in
  `lib/data/caching/cache-by-tag.tsx`
- The wrapper uses `unstable_cache()` with `revalidate: 1` — treat that as a
  **minimum revalidation window, not a hard one-second TTL**
- Cache tags in use: `site:globals`, `page:{slug}`, `page:list`, `post:{slug}`,
  `post:list`

### Webhook revalidation

`/api/revalidate` validates the HMAC signature via `next-sanity/webhook`, then
calls `revalidateBodyTags()`, which returns `{tags, paths}`. Both are applied.

| Document type | Tags invalidated | Paths revalidated |
| --- | --- | --- |
| The 7 global types (`lib/const/revalidate/global-docs.tsx`) | `site:globals` | — |
| `page` | `page:{slug}` or `page:list` | `/{slug}` (home slug → `/`) |
| `post` | `post:{slug}` or `post:list` | `/blog/{slug}` |
| The 18 section types (`lib/const/revalidate/section-docs.tsx`) | `page:list`, `post:list` | — |

Setting the webhook up is a one-time operation — see the project's webhook
setup guide (kept locally in `docs/`, which is gitignored).

## Types: Zod, not TypeGen

`lib/zod/**` is hand-written and validates at runtime. It is the single source
of truth for content types.

`sanity.types.ts` is generated by `cd ../studio && npm run typegen` and kept as a
**reference artifact only — no runtime code imports it.** TypeGen reports errors
on the 18 files under `lib/queries/fragments/sections/`, because those export
GROQ *fragments* (`...select(_type == "x" => {...})`) rather than standalone
queries; they are composed into complete queries in
`lib/queries/fragments/sections.groq.tsx`. That is expected, not a defect.

## Forms, Analytics, and Consent

### Forms

Form sections support two modes:

**`customForm`**
- UI: `components/ui/RenderFormClient.tsx`
- Validation: `lib/utils/forms/*`; text, email, telephone, select, radio, and
  checkbox inputs are normalized in `validate-form.tsx`, and suspicious-content
  checks use 12 regex patterns from `validate-regex.ts`
- reCAPTCHA: client token from `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- Submit endpoint: `/api/forms/submit`, which relays to `LEAD_RELAY_URL`

**`hubSpotForm`**
- UI: `components/ui/HubspotFormEmbed.tsx`
- Portal id, region, and form id come from Sanity section data
- Posts directly to HubSpot; unaffected by `LEAD_RELAY_URL`

Note: `portalId` throughout the codebase is the **HubSpot account identifier**.

### Analytics

- GTM bootstrap is rendered by `components/analytics/LyraGtm.tsx`
- CTA button events use `sendGTMEvent()` from `@next/third-parties/google`
- Page views go through `lib/analytics/pageview.tsx`
- Form events go through `lib/utils/forms/tracking-form.tsx`

### Consent

- Defaults are written before interactive scripts in
  `components/consent/ConsentDefaults.tsx`
- Persisted consent is stored in the `cookieConsent` cookie; client code also
  reads a localStorage fallback under the same key for forms
- Version and max age are defined in `lib/const/consent.tsx`
- Categories: `required`, `preferences`, `statistics`, `marketing`
- HubSpot tracking loads immediately only when marketing consent is already
  granted; otherwise `HubspotConsentLoader.tsx` defers it until consent changes
  (via the `lyra-consent-updated` event)

## CSP

`proxy.ts` builds and applies the `Content-Security-Policy` header on every
non-API, non-static request. **CSP is only active when
`NODE_ENV !== 'development'`** — test it with `npm run build && npm start`, not
`npm run dev`.

Directive coverage:

- **Scripts**: self, nonce, strict-dynamic; Google (GA4, GTM, Ads), HubSpot
  stack, reCAPTCHA/gstatic
- **Styles**: self, unsafe-inline (required by HubSpot's inline CSS injection),
  HubSpot assets
- **Images**: self, data, blob, Sanity CDN, Google Analytics/Ads pixels, HubSpot
  assets, doubleclick
- **Connect**: self, Google Analytics, GTM, Google Ads, HubSpot APIs, reCAPTCHA
- **Frames**: GTM, HubSpot forms, reCAPTCHA, Google Ads
- **Forms/fonts**: self, HubSpot, Google, reCAPTCHA

Adding a third-party host means editing the relevant directive in `proxy.ts`.

## Images and Rich Text

- Sanity images are allowed through `next.config.mjs` `images.remotePatterns`
- `components/ui/RenderImage.tsx` uses `next/image`, Sanity blur data, and the
  shared URL builder in `lib/utils/sanity/image.tsx`
- Rich text renders through `components/ui/RichText.tsx` using the shared
  Portable Text components in `lib/const/pt-components.tsx`

## Known Follow-Ups

- **`LEAD_RELAY_URL` is unset.** Custom form submission validates and
  reCAPTCHA-verifies correctly, then returns 503 at the relay step. HubSpot
  embedded forms are unaffected. Point it at a real endpoint to complete the
  custom-form path.
- **`lib/utils/seo/const/defaults.tsx` holds placeholder copy** — `name`,
  `title`, `description`, `keywords`, `twitter`, and `linkedin` are stubs. The
  Studio's `seoSettings` overrides these per page, but the last-resort fallback
  still needs real values.
- **Logo assets are placeholders.** `public/assets/lyra-logo-hor*.svg` and
  `public/logos/lyra_*` are renamed versions of the reference implementation's
  artwork, pending real Lyra branding.
- **No deployment configuration.** `output: 'standalone'` is set as a portable
  default; no hosting target is configured.
- **Rendering is unverified against real content.** At the time of writing the
  dataset holds only two `page` documents and none of the required singletons,
  so `getGlobals()` returns null and every content route 404s. The build,
  typecheck, lint, knip, section-registry consistency, SEO routes
  (robots/sitemap/manifest), CSP, and the full webhook path are all verified.
  These are **not**:
  - the globals GROQ/Zod chain against a populated dataset
  - any of the 18 section components rendering real data, including the
    accreditation grid/carousel modes and contentBlocks block types
  - `/`, `/[slug]`, `/blog`, `/blog/[slug]` rendering, and the four blog
    search params (`page`, `tag`, `category`, `author`)
  - page `<title>` and JSON-LD appearing in served HTML
  - the consent dialog, conditional GTM/HubSpot loading, and both form modes
  - the Stepper's 7-per-row connector geometry at >=1024px

  Populate the Studio as described in [Required content](#required-content),
  then work through that list.

## License

This project is **not** open source. It is published for reference and
evaluation purposes only — see [LICENSE](../LICENSE) at the repository root for
the full terms.
