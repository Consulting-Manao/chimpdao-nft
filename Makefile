.PHONY: help pages-init pages-build deploy-pages live
SHELL := /bin/bash

help:  ## list the targets
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | awk -F':.*## ' '{printf "  %-14s %s\n", $$1, $$2}'

# --------- Radicle Pages --------- #

# The site is the whole content of the `pages` branch, which Radicle Pages
# serves. That branch is checked out once as an orphan worktree in `pages/`,
# so a deployment is a build copied there, committed and pushed.
override pages_dir = pages
override build_dir = dist

# The viewer lives at nft.chimpdao.xyz, so the build is for `/`. Until that domain's
# `_git-pages-repository` TXT record points at this repository, `make live` compares
# against whatever serves it today. The router is client-side, so `_redirects` (copied
# from public/) rewrites every path to index.html.
ifndef site
   override site = https://nft.chimpdao.xyz/
endif

pages-init:  ## one-time: the canonical pages branch and the worktree that builds into it
	rad id update \
		--title "Configure the pages canonical branch" \
		--description "Radicle Pages serves the site from refs/heads/pages" \
		--payload xyz.radicle.crefs rules \
		'{"refs/heads/pages": {"allow": "delegates", "threshold": 1}}'
	rad sync
	git worktree add --orphan -b $(pages_dir) $(pages_dir)

pages-build:  ## build the site into the pages worktree and commit it there, without pushing
	@test -e $(pages_dir)/.git || { echo "run 'make pages-init' first"; exit 1; }
	@test -z "$$(git status --porcelain --untracked-files=no)" \
		|| { echo "commit first: a publish names the commit it was built from"; exit 1; }
	npm run build
	find $(pages_dir) -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
	cp -R $(build_dir)/. $(pages_dir)/
	git -C $(pages_dir) add -A
	git -C $(pages_dir) commit -q -m "Publish $(shell git rev-parse --short HEAD)" \
		|| echo "the build is identical, publishing it again"

deploy-pages: pages-build  ## build the site and publish it to Radicle Pages
	git -C $(pages_dir) push rad $(pages_dir)

# The entry page names the hashed assets of the build, so the live one is this
# build when the two pages are identical. Run this after a publish, or after
# the same build.
live:  ## whether the published site is the build in dist/
	@diff <(curl -fsS $(site)) $(build_dir)/index.html \
		&& echo "live is this build"

.PHONY: og
og:  ## render the social preview (og/og.html) to public/og.jpg
	./og/render.sh
