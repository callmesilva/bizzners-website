/**
 * Demo feature flags — the switches we flip around client meetings.
 *
 * Nothing is ever deleted: every concept, variant and animation still ships in
 * the bundle. A flag only decides what the client can reach right now, so a
 * direction can come back by flipping one boolean (or one env var at build /
 * dev time, when we don't want to touch the committed defaults):
 *
 *   VITE_SHOW_VARIANT_B=true VITE_ANIMATIONS_A=true pnpm dev
 *
 * Committed defaults = the "layout-first review" setup:
 *   · only the A variant of each concept is reachable
 *   · 03·A Wild is parked
 *   · motion on the A variants is off, so the client reads layout first
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
  /** Motion on the A variants. Off ⇒ reveals, parallax and loops resolve instantly. */
  animationsA: envFlag(import.meta.env.VITE_ANIMATIONS_A, false),
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
