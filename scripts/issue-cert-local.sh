#!/usr/bin/env bash
# Issue a Let's Encrypt certificate for bizzners.com from THIS machine.
#
# Why not on the server: Namecheap has shell access disabled, so acme.sh cannot
# run there (see scripts/setup-letsencrypt.sh, which is the version for when
# shell access is enabled). HTTP-01 still works because we can write the
# challenge file over SFTP — acme.sh writes it to a local webroot and a sync
# loop mirrors that directory to the server while validation is in flight.
#
# Output is written OUTSIDE the repo: a private key must never be committed.
set -euo pipefail

D=bizzners.com
WWW="www.${D}"
ACME="${HOME}/.acme.sh/acme.sh"
KEY="${NC_KEY:-$HOME/.ssh/bizzners_namecheap}"
HOST="${NC_HOST:?NC_HOST not set}"; USER_="${NC_USER:?NC_USER not set}"; PORT="${NC_PORT:-21098}"
SFTP=(sftp -q -b - -i "$KEY" -o BatchMode=yes -P "$PORT" "${USER_}@${HOST}")

WEBROOT="$(mktemp -d)/webroot"
CHAL="${WEBROOT}/.well-known/acme-challenge"
OUT="${HOME}/Documents/GitHub/coworking/bizzners-certs-$(date +%Y-%m-%d)"
mkdir -p "$CHAL" "$OUT"

[ -x "$ACME" ] || { echo "acme.sh not installed at $ACME"; exit 1; }

echo "== syncing challenge files to ${USER_}@${HOST}:public_html/.well-known/acme-challenge/"
sync_loop() {
  while :; do
    shopt -s nullglob
    for f in "$CHAL"/*; do
      printf 'put "%s" "public_html/.well-known/acme-challenge/%s"\nbye\n' "$f" "$(basename "$f")" \
        | "${SFTP[@]}" >/dev/null 2>&1 || true
    done
    sleep 1
  done
}
sync_loop & SYNC_PID=$!
cleanup() {
  kill "$SYNC_PID" 2>/dev/null || true
  # Remove challenge files from the live server — they are single-use.
  shopt -s nullglob
  for f in "$CHAL"/*; do
    printf 'rm "public_html/.well-known/acme-challenge/%s"\nbye\n' "$(basename "$f")" \
      | "${SFTP[@]}" >/dev/null 2>&1 || true
  done
}
trap cleanup EXIT

echo "== issuing for ${D} + ${WWW} (Let's Encrypt, HTTP-01)"
"$ACME" --set-default-ca --server letsencrypt >/dev/null 2>&1 || true
"$ACME" --issue -d "$D" -d "$WWW" -w "$WEBROOT" --server letsencrypt --force

echo "== exporting to ${OUT}"
"$ACME" --install-cert -d "$D" \
  --cert-file      "${OUT}/${D}.crt" \
  --key-file       "${OUT}/${D}.key" \
  --ca-file        "${OUT}/${D}.ca-bundle" \
  --fullchain-file "${OUT}/${D}.fullchain.crt"
chmod 600 "${OUT}/${D}.key"

echo
echo "Files for cPanel → SSL/TLS → Install and Manage SSL:"
ls -l "$OUT"
