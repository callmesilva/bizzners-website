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
const CONCEPT_BASES = ["/simple", "/modern", "/wild"];

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
      const variant = pathname.endsWith("-b") ? "-b" : "";
      if (event.key === "1") navigate(`/simple${variant}`);
      else if (event.key === "2") navigate(`/modern${variant}`);
      else if (event.key === "3") navigate(`/wild${variant}`);
      else if (event.key === "b" || event.key === "B") {
        const base = pathname.replace(/-b$/, "");
        if (CONCEPT_BASES.includes(base)) {
          navigate(pathname.endsWith("-b") ? base : `${base}-b`);
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

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Chrome />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Selector />} />
          <Route path="/simple" element={<SimpleSite />} />
          <Route path="/simple-b" element={<SimpleBSite />} />
          <Route path="/modern" element={<ModernSite />} />
          <Route path="/modern-b" element={<ModernBSite />} />
          <Route path="/wild" element={<WildSite />} />
          <Route path="/wild-b" element={<WildBSite />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
