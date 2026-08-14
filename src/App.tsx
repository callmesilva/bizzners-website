import { useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import ModernSite from "./designs/modern/ModernSite";
import { isStill } from "./shared/useStill";

/**
 * One site, one route.
 *
 * The concept review is over: the client picked 02·A Modern with the "Cercana"
 * pairing, so `/` *is* that design — no selector, no A/B toggle, no font
 * switcher, no keyboard shortcuts. The other five concepts still live in
 * `src/designs`, but nothing routes to them, so they no longer ship in the
 * bundle either. Bringing one back = adding its `<Route>` here again.
 *
 * The router stays because the design reads the current path through
 * `useStill`, and because it keeps old review links (`/modern`, `/wild-b`, …)
 * landing on the site instead of a blank page.
 */

/** Page chrome: body surface and the motion attribute, both before paint. */
function Chrome() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Modern is cream paper, so the page behind it is never the dark shell
    document.body.dataset.surface = "light";
    // don't fight a deep link like /#contact
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);

  // before paint, so an intro never plays a first frame it should have skipped
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = isStill(pathname) ? "off" : "on";
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Chrome />
      <Routes>
        <Route path="/" element={<ModernSite />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
