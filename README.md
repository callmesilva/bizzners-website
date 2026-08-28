# bizzners-website

The site for **Bizzners Business Builders** (Panamá) — international trade
facilitation, built from the 2024 brochure (`BizznersBasics.2024.pdf`).

**Live:** https://callmesilva.github.io/bizzners-website/ — staging on GitHub Pages,
carrying `<meta name="robots" content="noindex">` until it moves to bizzners.com.

## The design is settled

Six concepts were built and reviewed. The client picked **02·A Modern** with the
**"Cercana"** type pairing (Baloo 2 + Figtree), so that design *is* the site: it
serves at `/`, and every other path redirects there.

The five parked concepts are still in `src/designs` — nothing routes to them, so
they no longer ship in the bundle either. `screenshots/` is the visual record of
all six. To reopen a direction, add its `<Route>` back in `src/App.tsx`; the env
flags alone will not do it any more.

| Parked | Concept | Feel | Motion stack |
| --- | --- | --- | --- |
| `src/designs/simple` | 01·A Quiet | warm paper, airy editorial | CSS-only reveals |
| `src/designs/simpleb` | 01·B Swiss | cool white, hairline grid, mono indexes | CSS-only reveals |
| `src/designs/modernb` | 02·B Aurora | night glass, gradient ink, drifting light | Motion |
| `src/designs/wild` | 03·A Command Center | space-navy HUD, three.js trade globe | GSAP + three.js |
| `src/designs/wildb` | 03·B Manifest | cargo-paper brutalism, container train, stamps | GSAP |

Also parked, for the same reason: `src/selector/` (the old concept picker that was
`/`), `src/shared/TypeSwitch.tsx` and `src/shared/DemoSwitch.tsx`. They are
unreachable from the live entry point and only reference each other.

## The tweak panel (review round, temporary)

The owner's second-round notes came in as adjectives — *"más grande, más
imponente"*, *"probar el color morado con otro color"*, *"el recuadro a lo
mejor no redondeado"*. Rather than pick numbers on his behalf and mail
screenshots back and forth, `src/tweaks/` puts every ambiguous note on the live
site as a control: an **Ajustes** button, bottom right of every page.

One accordion group per bullet of his email, each quoting the bullet verbatim:

| # | Group | What it moves |
| --- | --- | --- |
| 1 | El logo | Nav wordmark size, weight, "Business Builders" line |
| 2 | La palabra «Panamá» | Hero kicker and the chip over the video |
| 3 | El color de acento | `--m-cobalt` — "projected", the button, dots, links |
| 4 | Colores por sección | "every level" + numerals 01–07, and the cycle block, each on its own colour |
| 5 | El recuadro del video | Corner radius (the bullet's actual subject), frame shape, shadow |
| 6 | Los textos | Hero title and standfirst, the two "Who we are" paragraphs, both lower headings |

Editable strings take `*asterisks*` for the serif-italic accent (`shared/Rich.tsx`)
— plain text in, no HTML he could break.

**`Copiar datos`** is the point of the whole thing: it puts a Spanish summary on
his clipboard — only what he actually moved, each change next to the note that
prompted it, followed by a JSON payload we replay on our side. The panel holds
his state in `localStorage`, so he can leave and come back; *Mantener pulsado:
ver el original* flips to the untouched site for as long as the button is held.

How it plugs in, and how it comes out:

- `src/tweaks/tweaks.ts` — the schema. `defaults` **is** what ships, so an
  untouched panel renders precisely what the site rendered before it existed
  (the hero grid still resolves to 7fr/5fr, the card still to 26px).
- `cssVarsFor()` sets the custom properties inline on `.d-modern`; `modern.css`
  derives every accent from `--m-cobalt` via `color-mix()`, so one override
  retints the design.
- `?tweaks=0` takes the panel off the page — use it for screenshots.
- **Removing it** once the values are agreed: fold the settled numbers into
  `modern.css` / `content/site.ts`, drop `src/tweaks/`, and unwrap
  `<TweaksProvider>` in `App.tsx`. Nothing else depends on it.

## Run it

```bash
make dev          # http://localhost:5173 (installs deps on first run)
make build        # production build → dist/
make build-pages  # same build with the GitHub Pages base path + SPA fallback
make preview      # serve the production build
make typecheck    # tsc --noEmit
make help         # every target
```

Or drive pnpm directly: `pnpm install`, then `pnpm dev` / `pnpm build` / `pnpm preview`.

Node ≥ 22 and pnpm (see `packageManager`). Override the port with `make dev PORT=3000`.

## How it's put together

- **One content source** — `src/content/site.ts` holds the full English translation of
  the brochure. Added microcopy is flagged in [`COPY-NOTES.md`](COPY-NOTES.md).
- **Real media** — the hero runs a muted looping `backdrop.mp4` behind a poster frame;
  the growth panel and the About bento use photography. All in `src/assets`. The
  branded `Placeholder` component survives for the parked designs only; generation
  prompts are still in [`PROMPTS.md`](PROMPTS.md).
- **Type is fixed** — `main.tsx` ships only Baloo 2 and Figtree. The other pairings'
  Fontsource imports are commented out there (packages still in `package.json`) and
  their remaps still sit in `src/styles/typography.css`, so reopening a pairing is
  uncommenting, not reinstalling.
- **Accessibility floor** — semantic sections, `prefers-reduced-motion` respected
  everywhere (reveals become instant, parallax flattens, the cycle wheel stops
  auto-advancing).
- **Deploys free** — GitHub Pages workflow in `.github/workflows/deploy.yml`; every
  push to `main` publishes. See [`DEPLOYMENT.md`](DEPLOYMENT.md).

### Vestigial config

`src/config/flags.ts` and `src/config/typography.ts` were the client-review control
surface. They are no longer one — `showVariantB`, `showWildA` and `showTypeSets` all
default off, and `DEFAULT_TYPE_SET` is pinned to Cercana. Both files stay because the
parked designs still import them, and because they document what was compared.

## Repo tour

```
src/
  content/site.ts        ← the single source of copy
  designs/modern/        ← THE SITE (ModernSite.tsx, modern.css, CycleWheel.tsx)
  designs/               ← simple, simpleb, modernb, wild, wildb — parked
  selector/              ← the old "/" concept picker — parked
  tweaks/                ← the client tweak panel (temporary — see above)
  brand/Logo.tsx         ← recreated bizzners® wordmark (HTML/CSS, Baloo 2)
  shared/                ← reveal / media / still hooks, marquee fill, Rich, Placeholder
  config/                ← flags + typography sets (vestigial, see above)
  styles/                ← global.css, typography.css
  assets/                ← hero video + poster, photography
video/                   ← five AI-video scripts + style bible (see video/README.md)
screenshots/             ← all six concepts as reviewed
PROMPTS.md               ← image-LLM prompts per placeholder slot
COPY-NOTES.md            ← translation + added-microcopy log
DEPLOYMENT.md            ← zero-cost hosting notes
```
