import { lazy, Suspense, useEffect, useLayoutEffect, type ReactElement } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  CONCEPTS,
  canToggleVariant,
  isRouteVisible,
  isVariantB,
  visibleVariants,
} from "./config/flags";
import { DemoSwitch } from "./shared/DemoSwitch";
import { isStill } from "./shared/useStill";

const Selector = lazy(() => import("./selector/Selector"));
const SimpleSite = lazy(() => import("./designs/simple/SimpleSite"));
const SimpleBSite = lazy(() => import("./designs/simpleb/SimpleBSite"));
const ModernSite = lazy(() => import("./designs/modern/ModernSite"));
const ModernBSite = lazy(() => import("./designs/modernb/ModernBSite"));
const WildSite = lazy(() => import("./designs/wild/WildSite"));
const WildBSite = lazy(() => import("./designs/wildb/WildBSite"));

const TITLES: Record<string, string> = {
  "/": "Bizzners — Design Concepts",
  "/simple": "Bizzners — 01·A Simple · Quiet",
  "/simple-b": "Bizzners — 01·B Simple · Swiss",
  "/modern": "Bizzners — 02·A Modern · Editorial",
  "/modern-b": "Bizzners — 02·B Modern · Aurora",
  "/wild": "Bizzners — 03·A Wild · Command Center",
  "/wild-b": "Bizzners — 03·B Wild · Manifest",
};

const LIGHT_SURFACES = new Set(["/simple", "/simple-b", "/modern", "/wild-b"]);

/** Per-route chrome: title, scroll reset, body surface, keyboard jumps, switcher pill. */
function Chrome() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES["/"];
    document.body.dataset.surface = LIGHT_SURFACES.has(pathname) ? "light" : "dark";
    window.scrollTo(0, 0);
  }, [pathname]);

  // before paint, so a parked route never flashes the first frame of an intro
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = isStill(pathname) ? "off" : "on";
  }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      // keep the current variant when jumping; fall back to whatever the
      // flags leave reachable, and stay put if the concept is parked
      const variant = isVariantB(pathname) ? "-b" : "";
      const jump = (base: string) => {
        const keep = `${base}${variant}`;
        const target = isRouteVisible(keep) ? keep : visibleVariants(base)[0];
        if (target) navigate(target);
      };

      const concept = CONCEPTS.find((c) => c.n === event.key);
      if (concept) jump(concept.base);
      else if (event.key === "b" || event.key === "B") {
        const base = pathname.replace(/-b$/, "");
        if (canToggleVariant(base)) {
          navigate(isVariantB(pathname) ? base : `${base}-b`);
        }
      } else if (event.key === "0" || event.key === "Escape") navigate("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, pathname]);

  return pathname === "/" ? null : <DemoSwitch current={pathname} />;
}

function RouteLoader() {
  return (
    <div className="route-loader" aria-label="Loading concept">
      <span />
    </div>
  );
}

/**
 * Routes stay declared even when a concept is parked — a flagged-off route
 * bounces to the selector instead of disappearing, so old links never 404 and
 * the demo comes back by flipping one flag.
 */
function gated(path: string, element: ReactElement) {
  return (
    <Route
      key={path}
      path={path}
      element={isRouteVisible(path) ? element : <Navigate to="/" replace />}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Chrome />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Selector />} />
          {gated("/simple", <SimpleSite />)}
          {gated("/simple-b", <SimpleBSite />)}
          {gated("/modern", <ModernSite />)}
          {gated("/modern-b", <ModernBSite />)}
          {gated("/wild", <WildSite />)}
          {gated("/wild-b", <WildBSite />)}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
