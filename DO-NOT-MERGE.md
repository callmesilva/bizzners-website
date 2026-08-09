# ⛔️ DO NOT MERGE THIS BRANCH ⛔️

> **Branch:** `do-not-merge/client-review-layout-first`
> **Purpose:** one-off build for a single client meeting. It is **not** the state
> we want on `main`, and it must never reach the live demo on GitHub Pages.

## 🚫 Why this must not be merged

This branch deliberately **hides most of the work** and **turns motion off** so the
client looks at layout first. Merging it would:

- 🙈 hide the **B variant of every concept** (01·B Swiss, 02·B Aurora, 03·B Manifest)
- 🙈 hide **03·A Wild** (the three.js command center) entirely
- 🧊 freeze **all animation on the A variants** — reveals, parallax, marquees, the
  cycle wheel, the GSAP scroll scenes
- 🇪🇸 switch the selector's instructions to Spanish (intentional here, a decision
  we have not made for `main`)

Nothing is deleted — every concept and every timeline still ships. The state above
is produced entirely by the flags in [`src/config/flags.ts`](src/config/flags.ts).

## 📡 Getting it in front of the client without merging

`.github/workflows/deploy.yml` only auto-deploys `main`, so the live Pages URL still
shows the full six-concept demo. To publish *this* branch for the meeting, run the
**Deploy to GitHub Pages** workflow manually (`workflow_dispatch`) with this branch
selected — no merge needed. Re-run it from `main` afterwards to put the full demo
back.

## ✅ What to do instead

After the meeting, decide what the client actually wants and then either:

1. **Flip flags back on** in `src/config/flags.ts` (or per build:
   `VITE_SHOW_VARIANT_B=true VITE_SHOW_WILD_A=true VITE_ANIMATIONS_A=true pnpm build`)
   and cherry-pick only the pieces worth keeping onto `main`; or
2. **Delete this branch.** It has served its purpose.

## 🔍 Everything this branch changes

| Change | Where |
| --- | --- |
| Feature flags + route visibility | `src/config/flags.ts` (new) |
| Still-mode helper (flag + `prefers-reduced-motion`) | `src/shared/useStill.ts` (new) |
| Flag-gated routes, `html[data-motion]`, keyboard guards | `src/App.tsx` |
| CSS motion kill-switch | `src/styles/global.css` |
| Reveals resolve instantly when still | `src/shared/useReveal.ts` |
| Motion parked, cycle wheel stops auto-advancing | `src/designs/modern/*` |
| GSAP + globe use the shared still flag | `src/designs/wild/WildSite.tsx` |
| Hidden concepts/variants drop out of the pill | `src/shared/DemoSwitch.tsx` |
| Spanish instructions, flag-aware grid + copy | `src/selector/*` |

⛔️ **Reviewers: do not click merge.** ⛔️
