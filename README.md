# bizzners-website — design concept demos

Six full working takes on **bizzners.com** for Bizzners Business Builders (Panamá),
all built from the 2024 brochure (`BizznersBasics.2024.pdf`). The landing page is a
demo selector — send the client one link, let them wander.

**Live demo:** https://callmesilva.github.io/bizzners-website/

## Route map

| Route | Concept | Feel | Motion stack |
| --- | --- | --- | --- |
| `/` | Selector | dark studio presentation | CSS |
| `/simple` | 01·A Quiet | warm paper, airy editorial | CSS-only reveals |
| `/simple-b` | 01·B Swiss | cool white, hairline grid, mono indexes | CSS-only reveals |
| `/modern` | 02·A Editorial | cream, Instrument Serif, bento, live cycle wheel | Motion |
| `/modern-b` | 02·B Aurora | night glass, gradient ink, drifting light | Motion |
| `/wild` | 03·A Command Center | space-navy HUD, three.js trade globe, pinned cycle | GSAP + three.js |
| `/wild-b` | 03·B Manifest | cargo-paper brutalism, container train, stamps | GSAP |

Navigation sugar: press **1 / 2 / 3** to jump concepts, **B** to flip the A/B variant,
**0** to return to the selector. A floating pill rides along on every demo.

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
  content/site.ts        ← the single source of copy
  selector/              ← the "/" concept-picker page
  designs/
    simple/  simpleb/    ← concept 01, variants A/B
    modern/  modernb/    ← concept 02, variants A/B
    wild/    wildb/      ← concept 03, variants A/B  (wild/globe.ts = three.js scene)
  brand/Logo.tsx         ← recreated bizzners® wordmark (HTML/CSS, Baloo 2)
  shared/                ← Placeholder, DemoSwitch pill, reveal + media hooks
PROMPTS.md               ← image-LLM prompts per placeholder slot
COPY-NOTES.md            ← translation + added-microcopy log for client review
DEPLOYMENT.md            ← zero-cost hosting notes
```
