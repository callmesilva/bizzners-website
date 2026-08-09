import { useLocation } from "react-router-dom";
import { FLAGS, isVariantA } from "../config/flags";

/** OS-level "please stop moving things". */
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * "Still" = render the resting state, skip the choreography.
 *
 * True when the visitor asked for reduced motion, or when FLAGS.animationsA
 * parks motion on an A variant for a layout-first review. Every timeline still
 * exists in the source — it just resolves instantly.
 */
export function isStill(pathname: string) {
  return prefersReducedMotion() || (!FLAGS.animationsA && isVariantA(pathname));
}

/** Route-aware `isStill` for components. Requires router context. */
export function useStill() {
  return isStill(useLocation().pathname);
}
