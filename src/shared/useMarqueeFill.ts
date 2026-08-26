import { useLayoutEffect, useRef, useState } from "react";

/**
 * A scrolling marquee animates its track by -50%, so each half has to be at
 * least as wide as the viewport — otherwise the tail of the loop drags an
 * empty band across the screen. Two copies of a short word list are plenty at
 * 1280px and nowhere near enough at 2560px, which is where the blank gap shows
 * up. So measure one set and return an *even* copy count that always overflows.
 *
 * Returns [ref for the track, copy count]. The ref's first child must be one
 * set; the count is what you map over.
 */
export function useMarqueeFill() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const set = track?.firstElementChild as HTMLElement | null;
    if (!set) return;

    const measure = () => {
      const width = set.getBoundingClientRect().width;
      if (!width) return;
      // ×2 keeps the count even, so translateX(-50%) always lands on a set edge
      setCopies(Math.max(2, Math.ceil(window.innerWidth / width) * 2));
    };

    measure();
    // the set itself resizes when the webfont swaps in — catch that too
    const ro = new ResizeObserver(measure);
    ro.observe(set);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return [trackRef, copies] as const;
}
