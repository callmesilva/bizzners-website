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

.DEFAULT_GOAL := help
.PHONY: help dev build build-pages preview typecheck install reinstall clean distclean

## help: show this list
help:
	@echo "Bizzners website"
	@echo
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/^## /  make /' | column -t -s ':'
	@echo
	@echo "  Vars: PORT=$(PORT)  BASE=$(BASE)"

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
