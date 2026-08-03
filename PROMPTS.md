# Image generation prompts

Every `<Placeholder id="…" />` in the code maps to a slot below. Generate the image
with your preferred model, export as **WebP** (or AVIF) at the listed size, drop it in
`src/assets/`, and swap the `Placeholder` for an `<img>` (keep `width`/`height` attrs
and `loading="lazy"`).

Shared art direction (append to every prompt):

> Corporate editorial photography, cinematic but believable. Cool color grade leaning
> deep navy blue (#232d7d) and steel blue (#4a7fe0) with warm neutral highlights. Real
> textures, natural light, no CGI look. No text, no watermarks, no logos, no visible
> brand names. Composition leaves quiet negative space.

The brochure's original photos were Unsplash shots by Ravi Patel, Caspar Rae, Amin
Khorsan and Bruce Mars — re-downloading those (free) is a valid alternative to
generating new ones.

---

## IMG-M1 — Modern hero · "Panamá canal · containers"

- **Where:** `/modern` hero, right column
- **Aspect / size:** 4:5 portrait · ≥ 1200×1500

> Low-angle view of a container ship stacked with multicolored containers transiting
> the Panama Canal at golden-blue dusk, gantry cranes silhouetted, calm water
> reflections, slight haze. Portrait 4:5 crop with sky headroom in the upper third.

## IMG-M2 — Modern about · "At the table — negotiation"

- **Where:** `/modern` about bento, photo cell
- **Aspect / size:** 3:2 landscape · ≥ 1400×933

> Two business people mid-negotiation at a bright conference table near a window,
> papers and a laptop between them, genuine engaged expressions, shallow depth of
> field, city bokeh outside. Candid documentary feel, not stock-posed.

## IMG-S1 — Simple (optional) · "Panamá skyline"

- **Where:** `/simple` currently ships photo-free by design; optional hero-side image
- **Aspect / size:** 16:9 · ≥ 1600×900

> Panama City skyline across the bay at blue hour, glass towers mirrored in still
> water, a single small vessel crossing the frame, minimalist composition, lots of
> sky.

## IMG-W1 — Wild mobile poster (optional)

- **Where:** `/wild` uses a live WebGL globe; optional static poster for very old
  devices / social cards
- **Aspect / size:** 4:5 · ≥ 1200×1500

> Stylized dark world globe from space centered on the Americas, thin glowing blue
> latitude/longitude grid lines, small bright nodes on major port cities, red arcs of
> light connecting Panamá to distant hubs, deep space-navy background with faint
> stars. Sleek data-visualization aesthetic, not photorealistic Earth.

## IMG-X1 — Factory line (spare)

- **Aspect / size:** 3:2 · ≥ 1400×933

> Modern light-industrial assembly line with workers in the distance, machinery in
> cool blue tones, shallow focus on products moving along the belt (beverage cans or
> packaged goods), clean bright environment.

## IMG-X2 — Product shelf (spare)

- **Aspect / size:** 1:1 · ≥ 1200×1200

> Neatly arranged consumer products (canned drinks, packaged goods) on a minimal
> retail shelf lit with soft directional light, brandless labels, repeating rhythm,
> slight perspective.
