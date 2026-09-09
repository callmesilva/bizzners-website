# Bizzners website — task runner
#
#   make dev     start the local dev server
#   make build   production build into dist/
#   make help    list every target
#
# Wraps pnpm so the common flows are one word. Dependencies install
# automatically on first use via the node_modules sentinel.

PNPM      ?= pnpm
PORT      ?= 5173
REPO_NAME ?= $(notdir $(CURDIR))
# GitHub Pages serves from /<repo>/, so the Pages build needs a scoped base.
BASE      ?= /$(REPO_NAME)/
# Production: Namecheap shared hosting (cPanel/LiteSpeed) serving bizzners.com.
# Host and username identify the hosting account and this repo is PUBLIC, so they
# live in deploy.local.mk, which is gitignored. Copy deploy.local.mk.example to
# deploy.local.mk and fill it in from the cPanel dashboard. Namecheap puts SSH on
# port 21098, not 22.
-include deploy.local.mk
NC_HOST   ?=
NC_USER   ?=
NC_PORT   ?= 21098
NC_PATH   ?= public_html
NC_KEY    ?= $(HOME)/.ssh/bizzners_namecheap
# Shell access is DISABLED on this account, so rsync (which runs a remote
# binary) cannot work. The SFTP subsystem is open, and OpenSSH 9+ scp speaks
# SFTP, so transfers go through scp/sftp instead.
SFTP_OPTS = -i $(NC_KEY) -P $(NC_PORT) -o BatchMode=yes
SSH_OPTS  = -i $(NC_KEY) -p $(NC_PORT) -o BatchMode=yes
# Staging: Firebase Hosting. The CLI reads the project from .firebaserc.
FIREBASE  ?= firebase
CHANNEL   ?= preview
EXPIRES   ?= 7d

.DEFAULT_GOAL := help
.PHONY: require-remote help dev build build-pages preview typecheck deploy deploy-clean dist-zip \
        purge-old-site ls-remote dns-check ssl-setup ssl-check deploy-staging deploy-preview install reinstall clean distclean

## help: show this list
help:
	@echo "Bizzners website"
	@echo
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/^## /  make /' | column -t -s ':'
	@echo
	@echo "  Vars: PORT=$(PORT)  BASE=$(BASE)  CHANNEL=$(CHANNEL)"
	@echo "  Prod: $(if $(NC_USER),$(NC_USER)@$(NC_HOST):$(NC_PATH),<set deploy.local.mk>)"

## dev: run the local dev server (PORT=5173)
dev: node_modules
	$(PNPM) vite --port $(PORT)

## build: production build into dist/ (root base path)
build: node_modules
	$(PNPM) build

## build-pages: production build for GitHub Pages (scoped BASE + SPA fallback)
build-pages: node_modules
	$(PNPM) build --base=$(BASE)
	cp dist/index.html dist/404.html
	touch dist/.nojekyll

## preview: serve the built dist/ locally
preview: build
	$(PNPM) vite preview --port $(PORT)

## typecheck: run tsc with no emit
typecheck: node_modules
	$(PNPM) typecheck

# Fails loudly rather than attempting a half-configured connection.
require-remote:
	@[ -n "$(NC_HOST)" ] && [ -n "$(NC_USER)" ] || { \
	  echo "Remote not configured. cp deploy.local.mk.example deploy.local.mk"; \
	  echo "then fill in NC_HOST and NC_USER from the cPanel dashboard."; exit 1; }

## deploy: publish to bizzners.com over SFTP (adds/overwrites, never deletes)
deploy: require-remote build
	scp -r $(SFTP_OPTS) dist/. $(NC_USER)@$(NC_HOST):$(NC_PATH)/
	@echo "Deployed. Check: curl -sI http://bizzners.com/"

## purge-old-site: remove the 2024 template's files (backed up first — see DEPLOYMENT.md)
purge-old-site: require-remote
	@[ "$(CONFIRM)" = "yes" ] || { \
	  echo "Removes the 2024 template from $(NC_PATH)/ — only the paths listed in"; \
	  echo "scripts/purge-old-site.sftp, all of which are in the 2026-09-09 backup."; \
	  echo "Protected: cgi-bin/, .well-known/, .ftpquota, and your deployed files."; \
	  echo; echo "Re-run to confirm:  make purge-old-site CONFIRM=yes"; exit 1; }
	-sftp -b scripts/purge-old-site.sftp $(SFTP_OPTS) $(NC_USER)@$(NC_HOST)
	@echo "Purge finished (missing-file errors above are harmless)."

## ls-remote: list what is currently in public_html
ls-remote: require-remote
	@printf 'ls -l $(NC_PATH)\nbye\n' | sftp -b - $(SFTP_OPTS) $(NC_USER)@$(NC_HOST)

## dist-zip: package dist/ for manual upload via cPanel File Manager (no SSH needed)
dist-zip: build
	rm -f bizzners-site.zip
	cd dist && zip -rq ../bizzners-site.zip . -x '.DS_Store'
	@echo "bizzners-site.zip ready — upload into public_html, then Extract."

## dns-check: verify DNS still matches the pre-Cloudflare inventory (NS=... optional)
dns-check:
	@scripts/verify-dns.sh $(NS)

## ssl-setup: Let's Encrypt via acme.sh — REQUIRES shell access (currently disabled)
ssl-setup:
	@ssh $(SSH_OPTS) $(NC_USER)@$(NC_HOST) true 2>/dev/null || { echo "Shell access is disabled on this account — acme.sh cannot run server-side."; echo "Ask Namecheap support to enable SSH/shell access, then re-run."; exit 1; }
	@[ -n "$(ACME_EMAIL)" ] || { echo "Usage: make ssl-setup ACME_EMAIL=you@example.com"; exit 1; }
	ssh -p $(NC_PORT) $(NC_USER)@$(NC_HOST) "ACME_EMAIL='$(ACME_EMAIL)' sh -s" < scripts/setup-letsencrypt.sh

## ssl-check: show the certificate bizzners.com is actually serving on 443
ssl-check:
	@echo | openssl s_client -connect bizzners.com:443 -servername bizzners.com 2>/dev/null \
	  | openssl x509 -noout -subject -issuer -dates 2>/dev/null \
	  || echo "(could not read a certificate)"
	@echo "--- DCV token still reachable? HTTP validation depends on it ---"
	@curl -so /dev/null -w '  HTTP %{http_code}\n' \
	  http://bizzners.com/.well-known/pki-validation/425B6D0D4ACFDA66EBFDB6A8689C4961.txt

## deploy-staging: publish to Firebase staging (bizzners.web.app)
deploy-staging: node_modules
	$(FIREBASE) deploy --only hosting

## deploy-preview: publish to a temporary preview URL (CHANNEL=preview EXPIRES=7d)
deploy-preview: node_modules
	$(FIREBASE) hosting:channel:deploy $(CHANNEL) --expires $(EXPIRES)

## install: install dependencies from the lockfile
install: node_modules

node_modules: package.json pnpm-lock.yaml
	$(PNPM) install
	@touch node_modules

## reinstall: wipe node_modules and install fresh
reinstall: distclean install

## clean: remove build output
clean:
	rm -rf dist tsconfig.tsbuildinfo

## distclean: remove build output and node_modules
distclean: clean
	rm -rf node_modules
