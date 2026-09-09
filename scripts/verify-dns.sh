#!/usr/bin/env bash
# Verify bizzners.com DNS still matches the pre-Cloudflare inventory.
#
#   scripts/verify-dns.sh                       # via your resolver
#   scripts/verify-dns.sh dns1.namecheaphosting.com   # the old authoritative NS
#   scripts/verify-dns.sh <cloudflare-ns>       # after the move
#
# Mail is the thing that breaks silently, so MX / SPF / DKIM are hard failures.
# The apex A is expected to change when Cloudflare proxies it — reported, not failed.
set -uo pipefail

D=bizzners.com
NS="${1:-}"
DIG=(dig +short); [ -n "$NS" ] && DIG=(dig "@$NS" +short)
ORIGIN_IP=199.188.205.31
pass=0; fail=0

ok()   { printf "  \033[32mOK\033[0m    %s\n" "$1"; pass=$((pass+1)); }
bad()  { printf "  \033[31mFAIL\033[0m  %s\n" "$1"; fail=$((fail+1)); }
note() { printf "  ---   %s\n" "$1"; }

echo "== bizzners.com DNS check ${NS:+(via $NS)}"

echo "-- mail routing (hard fail) --"
mx=$("${DIG[@]}" "$D" MX | sort | tr -d '\r')
for want in "5 mx1-hosting.jellyfish.systems." "10 mx2-hosting.jellyfish.systems." "20 mx3-hosting.jellyfish.systems."; do
  grep -qxF "$want" <<<"$mx" && ok "MX $want" || bad "MX missing: $want"
done

echo "-- SPF (hard fail) --"
spf=$("${DIG[@]}" "$D" TXT | tr -d '"' | grep -F 'v=spf1' || true)
if [ -z "$spf" ]; then bad "no SPF record"; else
  for tok in "include:spf.web-hosting.com" "ip4:199.188.205.8" "ip4:199.188.205.15"; do
    grep -qF "$tok" <<<"$spf" && ok "SPF has $tok" || bad "SPF lost $tok"
  done
  if grep -qE '(^| )\+?a( |$)' <<<"$spf"; then
    note "SPF still uses '+a' — once the apex is proxied this authorizes Cloudflare,"
    note "    not the mail server. Replace with ip4:$ORIGIN_IP."
  else
    grep -qF "ip4:$ORIGIN_IP" <<<"$spf" && ok "SPF pins ip4:$ORIGIN_IP (correct post-proxy)" \
      || bad "SPF dropped '+a' without pinning ip4:$ORIGIN_IP — origin can no longer send"
  fi
fi

echo "-- DKIM (hard fail) --"
dkim=$("${DIG[@]}" default._domainkey."$D" TXT | tr -d '"' | tr -d ' ')
if grep -q 'p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvX3qGikghDzP' <<<"$dkim"; then
  ok "DKIM default._domainkey present and unchanged"
else
  bad "DKIM default._domainkey missing or altered"
fi

echo "-- cPanel service hosts (must stay DNS-only) --"
for s in mail ftp cpanel webmail webdisk cpcontacts cpcalendars autodiscover autoconfig whm; do
  got=$("${DIG[@]}" "$s.$D" A | tail -1)
  if [ "$got" = "$ORIGIN_IP" ]; then ok "$s.$D → $ORIGIN_IP"
  elif [ -z "$got" ]; then bad "$s.$D does not resolve"
  else bad "$s.$D → $got (expected $ORIGIN_IP — is it proxied? that breaks it)"; fi
done

echo "-- service discovery --"
for s in _autodiscover._tcp _caldavs._tcp _carddavs._tcp; do
  [ -n "$("${DIG[@]}" "$s.$D" SRV)" ] && ok "SRV $s" || bad "SRV $s missing"
done

echo "-- website (change here is expected) --"
apex=$("${DIG[@]}" "$D" A | tr '\n' ' ')
note "apex A: ${apex:-<none>}"
[ -n "$apex" ] && ok "apex resolves" || bad "apex does not resolve"
[ -n "$("${DIG[@]}" www."$D")" ] && ok "www resolves" || bad "www does not resolve"

echo
echo "== $pass passed, $fail failed"
[ "$fail" -eq 0 ] || exit 1
