# bizzners-website — design concept demos

Six full working takes on **bizzners.com** for Bizzners Business Builders (Panamá),
all built from the 2024 brochure (`BizznersBasics.2024.pdf`). The landing page is a
demo selector — send the client one link, let them wander.

**Live demo:** https://callmesilva.github.io/bizzners-website/ — ⚠️ currently serving
**this branch** (the client-review build), not `main`.

> ⛔️ **This branch is `do-not-merge/client-review-layout-first`** — a one-off build
> for a client meeting: B variants hidden, 03·A Wild hidden, motion off on the A
> variants, selector fully in Spanish. See [`DO-NOT-MERGE.md`](DO-NOT-MERGE.md)
> before doing anything with it.

## Route map

| Route | Concept | Feel | Motion stack | On this branch |
| --- | --- | --- | --- | --- |
| `/` | Selector | dark studio presentation | CSS | live |
| `/simple` | 01·A Quiet | warm paper, airy editorial | CSS-only reveals | live, motion off |
| `/simple-b` | 01·B Swiss | cool white, hairline grid, mono indexes | CSS-only reveals | hidden |
| `/modern` | 02·A Editorial | cream, Instrument Serif, bento, live cycle wheel | Motion | live, motion off |
| `/modern-b` | 02·B Aurora | night glass, gradient ink, drifting light | Motion | hidden |
| `/wild` | 03·A Command Center | space-navy HUD, three.js trade globe, pinned cycle | GSAP + three.js | hidden |
| `/wild-b` | 03·B Manifest | cargo-paper brutalism, container train, stamps | GSAP | hidden |

Navigation sugar: press **1 / 2 / 3** to jump concepts, **B** to flip the A/B variant,
**0** to return to the selector. A floating pill rides along on every demo. Hidden
routes (see flags below) bounce back to the selector and drop out of both the pill
and the keyboard shortcuts.

## Feature flags

`src/config/flags.ts` decides what the client can reach. Nothing is ever deleted —
a flag only parks a concept, a variant or the motion. Defaults on this branch:

| Flag | Default | Env override | Effect when off |
| --- | --- | --- | --- |
| `showVariantB` | `false` | `VITE_SHOW_VARIANT_B` | 01·B / 02·B / 03·B hidden; A/B toggle disappears |
| `showWildA` | `false` | `VITE_SHOW_WILD_A` | `/wild` hidden (03·B still governed by `showVariantB`) |
| `animationsA` | `false` | `VITE_ANIMATIONS_A` | A variants render their resting state: reveals instant, parallax flat, marquees parked, cycle wheel manual, GSAP scenes set instead of played |

```bash
# everything back on, no code edit
VITE_SHOW_VARIANT_B=true VITE_SHOW_WILD_A=true VITE_ANIMATIONS_A=true make dev
```

Motion-off works the same way `prefers-reduced-motion` already did: `<Chrome>` sets
`html[data-motion="off"]`, global CSS collapses every duration and delay, and
`useStill()` tells the JS timelines (Motion, GSAP, the globe, the reveal observer)
to jump straight to their end state. Every timeline stays in the source.

The selector (`/`) is **fully in Spanish** for the client review — headline, concept
names, pitches, tags, variant blurbs, footer and tab title. The six demos themselves
stay in English (`src/content/site.ts` is unchanged).

## Run it

```bash
make dev          # http://localhost:5173 (installs deps on first run)
make build        # production build → dist/
make build-pages  # same build with the GitHub Pages base path + SPA fallback
make preview      # serve the production build
make help         # every target
```

Or drive pnpm directly: `pnpm install`, then `pnpm dev` / `pnpm build` / `pnpm preview`.

Node ≥ 22 and pnpm (see `packageManager`). Override the port with `make dev PORT=3000`.

## How it's put together

- **One content source** — `src/content/site.ts` holds the full English translation of
  the brochure; every design consumes the same object, so the comparison is honest.
  Added microcopy is flagged in [`COPY-NOTES.md`](COPY-NOTES.md).
- **Route-level code splitting** — each design is a `React.lazy` chunk; three.js and
  GSAP load only on the Wild routes, Motion only on the Modern routes. Fonts are
  self-hosted via Fontsource and imported inside each design's chunk.
- **Placeholders over fake photos** — image slots render a branded `Placeholder`
  component; paste-ready generation prompts live in [`PROMPTS.md`](PROMPTS.md).
- **Accessibility floor** — semantic sections, `prefers-reduced-motion` respected on
  every surface (globe goes static, pins unpin, reveals become instant), keyboard
  shortcuts skip form fields.
- **Deploys free** — GitHub Pages workflow in `.github/workflows/deploy.yml`; see
  [`DEPLOYMENT.md`](DEPLOYMENT.md) for the details and alternatives.

## Repo tour

```
src/
  config/flags.ts        ← what the client can reach right now
  content/site.ts        ← the single source of copy
  selector/              ← the "/" concept-picker page
  designs/
    simple/  simpleb/    ← concept 01, variants A/B
    modern/  modernb/    ← concept 02, variants A/B
    wild/    wildb/      ← concept 03, variants A/B  (wild/globe.ts = three.js scene)
  brand/Logo.tsx         ← recreated bizzners® wordmark (HTML/CSS, Baloo 2)
  shared/                ← Placeholder, DemoSwitch pill, reveal + media + still hooks
DO-NOT-MERGE.md          ← why this branch stays off main
PROMPTS.md               ← image-LLM prompts per placeholder slot
COPY-NOTES.md            ← translation + added-microcopy log for client review
DEPLOYMENT.md            ← zero-cost hosting notes
```
