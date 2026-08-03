import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { DemoSwitch } from "./shared/DemoSwitch";

const Selector = lazy(() => import("./selector/Selector"));
const SimpleSite = lazy(() => import("./designs/simple/SimpleSite"));
const ModernSite = lazy(() => import("./designs/modern/ModernSite"));
const WildSite = lazy(() => import("./designs/wild/WildSite"));

const TITLES: Record<string, string> = {
  "/": "Bizzners — Design Concepts",
  "/simple": "Bizzners — Concept 01 · Simple",
  "/modern": "Bizzners — Concept 02 · Modern",
  "/wild": "Bizzners — Concept 03 · Wild",
};

const LIGHT_SURFACES = new Set(["/simple", "/modern"]);

/** Per-route chrome: title, scroll reset, body surface, keyboard jumps, switcher pill. */
function Chrome() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES["/"];
    document.body.dataset.surface = LIGHT_SURFACES.has(pathname) ? "light" : "dark";
    window.scrollTo(0, 0);
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
      if (event.key === "1") navigate("/simple");
      else if (event.key === "2") navigate("/modern");
      else if (event.key === "3") navigate("/wild");
      else if (event.key === "0" || event.key === "Escape") navigate("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return pathname === "/" ? null : <DemoSwitch current={pathname} />;
}

function RouteLoader() {
  return (
    <div className="route-loader" aria-label="Loading concept">
      <span />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Chrome />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Selector />} />
          <Route path="/simple" element={<SimpleSite />} />
          <Route path="/modern" element={<ModernSite />} />
          <Route path="/wild" element={<WildSite />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
