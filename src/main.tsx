// The type is settled: "Cercana" = Baloo 2 (display, same face as the logo)
// + Figtree (body). Those are the only two the site can ask for, so those are
// the only two we ship.
import "@fontsource-variable/baloo-2";
import "@fontsource-variable/figtree";
// The pairings the client compared against — Editorial, Técnica, Rotunda, and
// the shell's original Archivo. Every package is still in package.json and the
// remaps are still in styles/typography.css; uncomment this block to load their
// faces again if a pairing is ever reopened (see config/typography.ts).
// import "@fontsource-variable/archivo/wdth.css";
// import "@fontsource-variable/fraunces";
// import "@fontsource-variable/fraunces/wght-italic.css";
// import "@fontsource-variable/manrope";
// import "@fontsource-variable/space-grotesk";
// import "@fontsource-variable/plus-jakarta-sans";
// import "@fontsource-variable/jetbrains-mono";
// import "@fontsource-variable/fredoka";
// import "@fontsource-variable/nunito";
// import "@fontsource-variable/martian-mono";
// import "@fontsource/ibm-plex-mono/400.css";
// import "@fontsource/ibm-plex-mono/500.css";
import "./styles/global.css";
import "./styles/typography.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initTypeSet } from "./config/typography";

initTypeSet();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
