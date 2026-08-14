/**
 * Demo feature flags — left over from the concept review, now mostly settled.
 *
 * The client picked **02·A Modern with the "Cercana" pairing (Baloo 2 +
 * Figtree)**, so this branch serves that one design at `/` and nothing else:
 * no selector, no A/B toggle, no font switcher. See `src/App.tsx`.
 *
 * Nothing is deleted, though — every other concept and every timeline is still
 * in `src/designs`, it just has no route pointing at it. These flags survive
 * because those files still import them; they are no longer a client-facing
 * control surface. To look at a parked direction again, add its route back in
 * `App.tsx` (an env var alone will not do it any more):
 *
 *   VITE_SHOW_VARIANT_B=true pnpm dev
 */

/** `undefined`/empty → the committed default; otherwise "true"/"1" wins. */
function envFlag(raw: string | undefined, fallback: boolean): boolean {
  if (raw === undefined || raw === "") return fallback;
  return raw === "true" || raw === "1";
}

export const FLAGS = {
  /** B variants: 01·B Swiss, 02·B Aurora, 03·B Manifest. */
  showVariantB: envFlag(import.meta.env.VITE_SHOW_VARIANT_B, false),
  /** 03·A Wild — the three.js command center. Parked until after the review. */
  showWildA: envFlag(import.meta.env.VITE_SHOW_WILD_A, false),
  /**
   * Motion on the A-variant *demo routes*. On ⇒ reveals, parallax and loops
   * play as designed. Note this no longer reaches the live site: `useStill`
   * only consults it for paths in DEMO_ROUTES, and `/` is not one, so the
   * site animates unless the visitor asks for reduced motion.
   */
  animationsA: envFlag(import.meta.env.VITE_ANIMATIONS_A, true),
  /** The font-pairing *switcher*. Off ⇒ the type is fixed (see config/typography). */
  showTypeSets: envFlag(import.meta.env.VITE_SHOW_TYPE_SETS, false),
} as const;

export type ConceptKey = "simple" | "modern" | "wild";

export interface ConceptRoute {
  key: ConceptKey;
  /** display number and keyboard shortcut */
  n: string;
  name: string;
  /** path of the A variant; the B variant is `${base}-b` */
  base: string;
}

export const CONCEPTS: ConceptRoute[] = [
  { key: "simple", n: "1", name: "Simple", base: "/simple" },
  { key: "modern", n: "2", name: "Modern", base: "/modern" },
  { key: "wild", n: "3", name: "Wild", base: "/wild" },
];

/** Every demo route, flags aside. */
export const DEMO_ROUTES = CONCEPTS.flatMap((c) => [c.base, `${c.base}-b`]);

export const isVariantB = (path: string) => path.endsWith("-b");

/** True only for the A variant of a real demo route (never for "/"). */
export const isVariantA = (path: string) =>
  !isVariantB(path) && DEMO_ROUTES.includes(path);

export const baseOf = (path: string) => path.replace(/-b$/, "");

/** Can the client reach this route under the current flags? */
export function isRouteVisible(path: string): boolean {
  if (isVariantB(path) && !FLAGS.showVariantB) return false;
  if (path === "/wild" && !FLAGS.showWildA) return false;
  return true;
}

/** Reachable variants of a concept, A first. Empty ⇒ the concept is parked. */
export function visibleVariants(base: string): string[] {
  return [base, `${base}-b`].filter(isRouteVisible);
}

/** Concepts with at least one reachable variant. */
export const VISIBLE_CONCEPTS = CONCEPTS.filter(
  (c) => visibleVariants(c.base).length > 0,
);

/** Both variants of a concept reachable ⇒ the A/B toggle is worth showing. */
export const canToggleVariant = (base: string) =>
  CONCEPTS.some((c) => c.base === base) && visibleVariants(base).length > 1;
