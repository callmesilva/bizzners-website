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

### 2. HTTPS — Let's Encrypt, issued from a workstation

**Live since 2026-09-09.** `bizzners.com` and `www.bizzners.com` are covered by a Let's
Encrypt certificate, and `.htaccess` redirects HTTP → HTTPS.

```bash
make ssl-check   # expects subject=CN=bizzners.com, issuer=Let's Encrypt
```

#### Why it is issued from a workstation and not the server

Everything easier was checked first and does not exist on this plan:

| Option | Outcome |
| --- | --- |
| cPanel **AutoSSL** | No "Run AutoSSL" button — disabled by the host. |
| cPanel cert **Wizard** | "There are no SSL/TLS products available at this time." |
| **Namecheap SSL** tool | Installs only certificates *purchased* at Namecheap. |
| The account's own **PositiveSSL** | SSL ID 27323500, pre-paid, but PENDING since 2024-07-21 with its HTTP validation never completed. Watched for 40 minutes on 2026-09-09; never issued. |
| `acme.sh` **on the server** | Impossible — shell access is disabled. |

What does work is SFTP. `scripts/issue-cert-local.sh` and the renewal kit outside the
repo drive **certbot** with a `--manual-auth-hook`: the hook writes the HTTP-01 token
over SFTP and **blocks until the token is actually being served**, then Let's Encrypt
validates.

Two failure modes are baked into that design, both hit for real:

- **404** — the first attempt used an `acme.sh` webroot with a background sync loop.
  Validation fires about a second after the token is written, faster than a new SFTP
  connection opens. A sync loop cannot win that race; the hook must *block*.
- **403** — `mktemp` creates files `0600` and the web server runs as another user.
  Challenge files must be `0644`. Confirmed by uploading one of each: 403 vs 200.

#### Renewal — manual, and the one thing that can break the site

**Expires 2026-12-08.** There is no server shell, so nothing can install a renewed
certificate automatically. The kit lives outside this repo (it holds a private key):

```
~/Documents/GitHub/coworking/bizzners-certbot/
  ./renew.sh                 # no-ops until within 30 days of expiry
  ./renew.sh --force-renewal
```

Then re-paste `latest/` into cPanel → SSL/TLS → **Install and Manage SSL**.

> **The permanent fix is shell access** — free on Stellar, one support ticket. With it,
> `scripts/setup-letsencrypt.sh` runs `acme.sh` on the server, installs through the
> cPanel API, and renews itself with no manual step. Worth doing before December: now
> that the site redirects to HTTPS, an expired certificate is a hard failure for every
> visitor, not a downgrade.

`.htaccess` lets `/.well-known/acme-challenge/` through **ahead of the HTTPS redirect**,
so renewals keep validating over plain HTTP. Verified by probe, not assumed — a blanket
redirect is the usual way people break their own renewals.

**Fallback if this ever becomes unworkable:** [`dns/CLOUDFLARE.md`](dns/CLOUDFLARE.md)
puts Cloudflare in front for free, self-renewing edge TLS. `dns/bizzners.com.zone` and
`make dns-check` exist to make that move safe — the domain carries live email.

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
