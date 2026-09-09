#!/bin/sh
# Issue and install a free Let's Encrypt certificate for bizzners.com.
#
# Runs ON the Namecheap server as the cPanel user — piped in over SSH by
# `make ssl-setup`. Not meant to be run locally.
#
# Why this exists: Namecheap's Stellar plan ships with cPanel AutoSSL disabled
# and the cert marketplace switched off, so there is no free certificate in the
# UI. acme.sh fills the gap and renews itself via cron.
set -eu

DOMAIN="bizzners.com"
WWW="www.${DOMAIN}"
WEBROOT="${HOME}/public_html"
ACME_DIR="${HOME}/.acme.sh"
ACME="${ACME_DIR}/acme.sh"

: "${ACME_EMAIL:?ACME_EMAIL not set — run: make ssl-setup ACME_EMAIL=you@example.com}"

say() { printf '\n=== %s ===\n' "$1"; }

say "environment"
echo "user:    $(whoami)"
echo "home:    ${HOME}"
echo "webroot: ${WEBROOT}"
[ -d "${WEBROOT}" ] || { echo "FATAL: ${WEBROOT} does not exist"; exit 1; }

say "install acme.sh"
if [ -f "${ACME}" ]; then
  echo "already installed: $(${ACME} --version 2>/dev/null | tail -1)"
else
  # get.acme.sh installs to ~/.acme.sh and registers a renewal cron entry.
  curl -fsS https://get.acme.sh | sh -s email="${ACME_EMAIL}"
  [ -f "${ACME}" ] || { echo "FATAL: acme.sh install failed"; exit 1; }
fi

say "use Let's Encrypt as the CA"
# acme.sh defaults to ZeroSSL, which needs an account signup. LE does not.
"${ACME}" --set-default-ca --server letsencrypt

say "issue certificate (HTTP-01 over ${WEBROOT})"
# The SPA .htaccess serves real files before the catch-all rewrite, and lets
# /.well-known/acme-challenge/ through explicitly, so the challenge resolves.
set +e
"${ACME}" --issue -d "${DOMAIN}" -d "${WWW}" -w "${WEBROOT}"
issue_rc=$?
set -e
# rc 2 = "cert still valid, skipped" — not a failure.
if [ "${issue_rc}" -ne 0 ] && [ "${issue_rc}" -ne 2 ]; then
  echo "FATAL: issuance failed (rc=${issue_rc})."
  echo "Check that http://${DOMAIN}/.well-known/acme-challenge/ is reachable"
  echo "and that the HTTPS redirect in .htaccess is still commented out."
  exit "${issue_rc}"
fi

say "install into cPanel"
# cpanel_uapi calls `uapi SSL install_ssl`, so cPanel owns the cert and every
# future renewal reinstalls itself without another manual step.
DEPLOY_CPANEL_USER="$(whoami)"
export DEPLOY_CPANEL_USER
"${ACME}" --deploy -d "${DOMAIN}" --deploy-hook cpanel_uapi

say "renewal cron"
crontab -l 2>/dev/null | grep -F 'acme.sh' || echo "WARNING: no acme.sh cron entry found — renewals will not be automatic"

say "result"
"${ACME}" --list
echo
echo "Done. Verify from your machine:  make ssl-status"
echo "Then uncomment the STEP 2 HTTPS redirect in public/.htaccess and redeploy."
