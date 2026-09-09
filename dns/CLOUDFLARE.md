# Moving bizzners.com to Cloudflare

Goal: free, auto-renewing HTTPS (the Stellar plan has no AutoSSL and no server shell),
plus a CDN for the 646 KB hero video and web fonts.

**The risk is email, not the website.** Live mail runs on this domain — Namecheap
Private Email, with SPF and a DKIM key. Moving nameservers moves *all* of it. Do the
steps in order and verify before switching.

Baseline captured 2026-09-09, all 22 checks green:

```bash
make dns-check NS=dns1.namecheaphosting.com
```

## 1. Add the zone (you — I can't create accounts)

Cloudflare dashboard → **Add a site** → `bizzners.com` → **Free** plan.

Cloudflare auto-scans existing records. **Do not trust the scan** — it misses records
that are not guessable. Instead: DNS → Records → **Import and Export → Import**, and
upload `dns/bizzners.com.zone` from this repo. That file was built by querying the
authoritative nameserver record by record, because AXFR was refused.

Then confirm 22 records exist: 11 A, 1 CNAME, 3 MX, 2 TXT, 3 SRV.

## 2. Set proxy status — this is where mail breaks

| Record | Proxy | Why |
| --- | --- | --- |
| `bizzners.com` (apex) | 🟠 **Proxied** | The website. This is what gets the free edge certificate. |
| `www` | 🟠 **Proxied** | Same. |
| `mail`, `ftp`, `cpanel`, `webmail`, `webdisk`, `cpcontacts`, `cpcalendars`, `autodiscover`, `autoconfig`, `whm` | ⚪ **DNS only** | Cloudflare's proxy only carries HTTP/HTTPS on standard ports. Proxy these and cPanel (2083), webmail (2096), FTP and mail clients all stop working. |
| MX, TXT, SRV | n/a | Not proxiable. |

## 3. Fix the SPF record

The live SPF starts with `+a`, which authorizes *whatever the apex A record points at*.
Once the apex is proxied, that becomes Cloudflare's IPs instead of the mail server.

Replace the apex TXT with the same authorization pinned literally:

```
v=spf1 +ip4:199.188.205.31 +mx +ip4:199.188.205.8 +ip4:199.188.205.15 include:spf.web-hosting.com ~all
```

`199.188.205.31` is exactly what `+a` resolves to today, so this changes nothing about
who may send — it just stops depending on a record that is about to move.

## 4. SSL mode — do not use Flexible

Cloudflare → SSL/TLS → Overview:

- **Full** — start here. Cloudflare serves a valid edge certificate and still encrypts
  to the origin, tolerating the origin's mismatched `*.web-hosting.com` cert.
- **Full (strict)** — the destination. Get there by installing a free Cloudflare
  **Origin CA** certificate (SSL/TLS → Origin Server → Create Certificate, 15-year),
  pasting the cert and key into cPanel → SSL/TLS → **Install and Manage SSL** for
  `bizzners.com`. No shell needed. Then switch the mode.
- **Flexible** — never. It sends plain HTTP to the origin and causes a redirect loop the
  moment anything forces HTTPS.

Enable **Always Use HTTPS** (SSL/TLS → Edge Certificates). That replaces the redirect in
`.htaccess` — **leave the `STEP 2` block commented out**, or with Flexible-style setups
you get a loop. Cloudflare handling it at the edge is strictly better anyway.

## 5. Switch the nameservers (you — registrar change)

Namecheap → Domain List → `bizzners.com` → **Nameservers → Custom DNS**, and enter the
two Cloudflare nameservers the dashboard shows.

Do this **only after** steps 1–3 are done, so the new zone is already correct when it
starts answering. Propagation is usually minutes, up to 24h.

## 6. Verify — email first

```bash
make dns-check                      # via your resolver, once propagated
make dns-check NS=<cloudflare-ns>   # ask Cloudflare directly, immediately
```

All mail checks are hard failures. The apex A changing to Cloudflare IPs is expected and
reported, not failed.

Then, by hand:

- Send a mail **to** an address on the domain, and **from** it. Check the received
  headers show `dkim=pass` and `spf=pass`.
- Open `https://webmail.bizzners.com` and `https://cpanel.bizzners.com` — both must still
  work, which proves they stayed DNS-only.
- `curl -sI https://bizzners.com` → `HTTP/2 200` with a Cloudflare-issued certificate.

## Rollback

Set the nameservers at Namecheap back to `dns1.namecheaphosting.com` /
`dns2.namecheaphosting.com`. The original zone is unchanged at Namecheap and in
`dns/bizzners.com.zone`.
