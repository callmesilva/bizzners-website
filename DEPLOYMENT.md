# Deployment

| | Where | URL | Cost |
| --- | --- | --- | --- |
| **Production** | Namecheap Stellar shared hosting (cPanel/LiteSpeed) | https://bizzners.com | Paid through **Jul 21, 2027**, auto-renews |
| **Staging** | Firebase Hosting (Spark plan) | https://bizzners.web.app | $0, no billing account attached |

The site is a static SPA (Vite output, no server code), so it needs nothing from the
host but files and a rewrite rule.

## Deploying

```bash
make deploy          # build + upload to bizzners.com over SFTP   ← the normal one
make ls-remote       # list what is currently in public_html
make purge-old-site  # remove the 2024 template's files (asks first)
make dist-zip        # zip for manual cPanel upload — needs no SSH at all
make deploy-staging  # push to bizzners.web.app
make deploy-preview  # throwaway Firebase URL for a review round
```

`make deploy` rebuilds first, so it can't ship a stale `dist/`. It **adds and overwrites
but never deletes**.

### Why SFTP and not rsync

Shell access is **disabled** on this account. The key authenticates fine, but any remote
command returns:

```
Shell access is not enabled on your account!
If you need shell access please contact support.
```

That rules out `rsync`, which works by executing a remote `rsync` binary. The **SFTP
subsystem is open**, and OpenSSH 9+ `scp` speaks SFTP, so transfers go over that
instead. Confirmed working: `sftp` listing, `scp` upload, recursive `get`.

The cost is that SFTP has no `--delete`, so stale remote files must be removed
explicitly — hence `make purge-old-site`, whose file list
(`scripts/purge-old-site.sftp`) was generated from a real server listing and skips
`cgi-bin/`, `.well-known/` and `.ftpquota`.

Connection details live at the top of the `Makefile` (`NC_HOST`, `NC_USER`, `NC_PORT`,
`NC_PATH`, `NC_KEY`). Namecheap puts SSH on **port 21098**, not 22.

## One-time setup — three things only the account owner can do

### 1. Authorize the deploy key (enables `make deploy`)

A dedicated key was generated at `~/.ssh/bizzners_namecheap`; the private half never
leaves the machine. Authorize the public half:

> cPanel → Security → **SSH Access** → Manage SSH Keys → **Import Key** → paste the
> contents of `~/.ssh/bizzners_namecheap.pub` → then **Manage → Authorize**.

Verify: `ssh bizzners-namecheap 'pwd && ls public_html | head'`

**If you'd rather use the key cPanel generated:** a public key alone cannot
authenticate *from* this machine — cPanel creates the pair server-side, so the private
half has to come down too. cPanel → SSH Access → Manage SSH Keys → **Private Keys** →
Download. Save it as `~/.ssh/bizzners_namecheap_rsa` (**never inside the repo**),
`chmod 600` it, point `IdentityFile` in the `~/.ssh/config` block at it, and make sure
the key shows **Authorized** — generating it does not authorize it. `.gitignore` now
blocks `id_rsa`, `*.pem` and friends so a stray download can't be committed.

Until either key works, use `make dist-zip` and upload through cPanel → File Manager →
`public_html` → Upload → Extract. That path needs no setup at all.

### 2. HTTPS — PositiveSSL, already paid for

There is a **PositiveSSL certificate for `bizzners.com` already on the Namecheap
account** (SSL ID 27323500, CA order 2236918579), covering `bizzners.com` and
`www.bizzners.com`, pre-paid for 1 year — almost certainly the certificate bundled
with the Stellar plan. Nothing further to buy.

It sat **PENDING and unissued since 2024-07-21**, which is why HTTPS has been broken
the whole time. Validation method is **HTTP**: Sectigo fetches a token file from the
site. That file has been in place since the day the hosting started:

```
/.well-known/pki-validation/425B6D0D4ACFDA66EBFDB6A8689C4961.txt
```

As of 2026-09-09 the order is being processed by cPanel's SSL auto-installer.

**Two things must stay true or HTTP validation fails:**

1. `.well-known/` must survive deploys. `make purge-old-site` protects it explicitly,
   and `make deploy` never deletes.
2. The SPA catch-all must not swallow the token. It doesn't — `.htaccess` serves real
   files before rewriting, verified by fetching the token and getting `200 text/plain`
   rather than the app's HTML.

Check progress any time:

```bash
make ssl-check
```

When the subject reads `bizzners.com` instead of `*.web-hosting.com`, the certificate
is live. Then uncomment the HTTPS redirect in `public/.htaccess` and redeploy.

**What cPanel does *not* offer here** (checked 2026-09-09): SSL/TLS → Status has no
"Run AutoSSL" button, the Wizard reports no products available, and the Namecheap SSL
tool only installs certificates purchased at Namecheap. `acme.sh` was the fallback, but
it must run on the server and shell access is disabled — `make ssl-setup` refuses early
and the script stays in `scripts/` in case shell is ever enabled.

**Fallback if this certificate never issues:** [`dns/CLOUDFLARE.md`](dns/CLOUDFLARE.md)
puts Cloudflare in front for free edge TLS. Not needed if the PositiveSSL lands, but the
runbook and the full DNS inventory in `dns/bizzners.com.zone` are worth keeping either
way — `make dns-check` verifies the zone against a known-good 22-record baseline.

### 3. Then turn on the HTTPS redirect

`public/.htaccess` ships with its force-HTTPS block commented out. Enable it only after
`make ssl-check` shows the real certificate, then redeploy.

## What `.htaccess` does

It lives in `public/`, so `vite build` copies it into `dist/` and every deploy ships it.
**Editing it on the server is pointless** — the next deploy overwrites it.

| Rule | Why |
| --- | --- |
| SPA rewrite to `index.html` | Deep links (`/modern`, old review links) must boot the app, not 404. Real files and directories are served first, so assets still resolve. |
| `-XXXXXXXX.ext` → `immutable`, 1 year | Vite fingerprints asset filenames, so the name changes whenever the bytes do. Verified to match all 22 built assets. |
| `*.html` → `no-cache` | `index.html` is the one unhashed file. Cache it and a deploy stays invisible while browsers request assets that no longer exist. |
| `Options -Indexes` | No directory listings. |

## Do not touch the MX records

**Live email runs on this domain.** MX points at Namecheap Private Email
(`mx1/2/3-hosting.jellyfish.systems`), with SPF
`v=spf1 +a +mx +ip4:199.188.205.8 ... include:spf.web-hosting.com ~all`.

Since the site now serves from the same host the DNS already points at, nothing needs
to change — which is the quiet advantage of this option. If the A record is ever moved,
note that SPF begins with `+a`: it authorizes whatever the A record points at, so
moving the site would silently re-point that term. `+mx` and the `include` still cover
the real mail servers, but the record should be tidied rather than left dangling.

## The site being replaced

`bizzners.com` served a Bootstrap 4 / jQuery template dated **2024-07-27** until this
deploy. A backup sits outside the repo at:

```
~/Documents/GitHub/coworking/bizzners-com-backup-2026-09-09/
```

That is an HTTP mirror — public, linked files only (23 files, 2.6 MB). It does **not**
include server-side files, dotfiles, databases, or mail. Before the first
`make deploy-clean`, take a real one: cPanel → Files → **Backup** → *Download a Home
Directory Backup*.

One page in the old site, `cfaccess.html`, gated itself with a client-side `prompt()`
loop against a hardcoded keyword visible in view-source. Its `<body>` was empty, so
nothing was actually behind it — but the pattern shouldn't come back.

## Custom domain / staging

`bizzners.com` already resolves to this host (`A → 199.188.205.31`, NS
`dns1/dns2.namecheaphosting.com`), so there is no DNS work.

Firebase stays wired up as a staging URL and costs nothing. `make deploy-staging`
publishes there; `make deploy-preview` gives an auto-expiring URL for a review round
without touching production. Delete `firebase.json` and `.firebaserc` to drop it.

## Local commands

```bash
make dev       # dev server
make build     # production build → dist/
make preview   # serve the production build locally
make help      # every target
```
