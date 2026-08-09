import { useEffect, useRef } from "react";
import { useStill } from "./useStill";

/**
 * Scroll-reveal driver: observes every [data-reveal] under the returned ref
 * and adds .is-in the first time it enters the viewport. CSS decides what
 * "revealed" looks like, so each design keeps its own motion language.
 * Optional per-element delay: style={{ "--d": "120ms" }}.
 *
 * In still mode (reduced motion, or motion parked by feature flag) everything
 * is marked revealed up front — same end state, no choreography.
 */
export function useRevealRoot<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const still = useStill();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0) return;

    if (still) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [still]);

  return ref;
}
