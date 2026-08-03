# Deployment — zero-cost setup

The site is a fully static SPA (Vite build output, no server code), so it can be hosted
for **$0** on any static host. The repo ships configured for **GitHub Pages driven by
GitHub Actions** — push to `main` and it deploys.

## How it works

| Piece | What it does |
| --- | --- |
| `.github/workflows/deploy.yml` | On every push to `main`: installs deps with pnpm, builds, publishes `dist/` to GitHub Pages. |
| `--base=/<repo-name>/` build flag | Project sites are served from `https://<user>.github.io/<repo>/`, so assets are prefixed with the repo name. The workflow derives it automatically — renaming the repo keeps working. |
| `BrowserRouter basename={import.meta.env.BASE_URL}` (`src/App.tsx`) | Keeps client-side routes (`/simple`, `/modern`, `/wild`) working under the sub-path. |
| `404.html` copy of `index.html` | GitHub Pages serves `404.html` for unknown paths; the SPA boots from it and the router restores the deep link. That's the standard SPA-on-Pages pattern. |
| `.nojekyll` | Skips the Jekyll pass so nothing in `dist/` gets mangled. |

## One-time setup (after the repo exists)

1. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
   (If the workflow ran first, the `github-pages` environment already exists and this
   is usually pre-selected.)
2. Push to `main` (or run the workflow manually from the Actions tab).
3. The site appears at `https://<user>.github.io/bizzners-website/`.

> **Free-tier note:** GitHub Pages is free for **public** repositories. Private repos
> need a paid plan for Pages — keeping this demo repo public is the $0 path.

## Custom domain later (still $0)

When the client points `bizzners.com` (or a subdomain) at Pages:

1. Settings → Pages → Custom domain → e.g. `demo.bizzners.com` (adds a `CNAME` file).
2. DNS: `CNAME demo → <user>.github.io`.
3. Change the build step in `deploy.yml` to `pnpm build` (base becomes `/` on a custom
   domain).

## Alternative: Cloudflare Pages (also $0)

If you prefer no base-path at all and unlimited bandwidth:

1. Cloudflare dashboard → Workers & Pages → Create → connect the GitHub repo.
2. Build command `pnpm build`, output directory `dist`. No base flag needed.
3. SPA fallback: add a `public/_redirects` file containing `/* /index.html 200`.

Netlify's free tier works the same way (`pnpm build`, publish `dist`, same
`_redirects` line). Vercel's Hobby tier also hosts this with zero config, but Hobby is
restricted to non-commercial use — a client demo sits in a gray zone, which is why the
default here is GitHub Pages.

## Local commands

```bash
pnpm dev        # dev server
pnpm build      # production build → dist/ (base "/", for local preview)
pnpm preview    # serve the production build locally
```
