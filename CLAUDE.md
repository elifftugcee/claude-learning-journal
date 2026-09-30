# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, single-page personal learning journal (in Turkish) documenting the user's progress learning Claude Code. This project is actively being built up throughout the user's Claude Code training — expect frequent, incremental additions to its sections (new modules, commands, prompts, projects) rather than a finished, static deliverable. No build tooling, no package manager, no framework — plain HTML/CSS/JS plus one Netlify Function. Hosted on Netlify; the main branch is `main`.

## Files

- `index.html` — the entire page content, organized as `<section>` blocks inside `<main>` (Öğrenme Yolculuğum, Modüller, Komutlar, Promptlar, Projeler).
- `style.css` — all styling: CSS custom properties in `:root` for theming, with a `@media (prefers-color-scheme: dark)` override block redefining the same variables for dark mode. Layout is CSS Grid (`main` is a 2-column grid; the first section spans both columns via `grid-column: 1 / -1`; collapses to 1 column under 640px).
- `script.js` — fetches `/.netlify/functions/site-env` and shows the returned `SITE_ENV` value in the `#site-env-badge` span in the header; shows "SITE_ENV kullanılamıyor" if the request fails or the value is empty.
- `netlify/functions/site-env.mjs` — Netlify Function that returns `{ siteEnv }` from `process.env.SITE_ENV` (200), or `{ error }` with 500 if it is not set. There is intentionally no fallback value.

`SITE_ENV` is provided by Netlify (Site configuration → Environment variables, with the Functions scope enabled) and is never committed to the repo. Redeploy after changing it.

## Running / previewing

There is no build step. For a quick look at the static page, open `index.html` in a browser. To test the whole project locally, including the function and the badge, run `netlify dev` with `SITE_ENV` set (Netlify CLI required).

## Checking changes

There are no automated tests. After a change, check by hand (locally with `netlify dev`):

- The page opens with its styling intact (no plain unstyled text).
- The main sections are visible: Öğrenme Yolculuğum, Modüller, Komutlar, Promptlar, Projeler.
- The `SITE_ENV` badge in the header shows the real value.

On the live Netlify URL, open `/.netlify/functions/site-env` and confirm it returns `{"siteEnv": "..."}`.

## Gotchas

- If `index.html` is opened directly as a file, the Netlify Function does not run and the badge shows "SITE_ENV kullanılamıyor". Use `netlify dev` for a full local test.

## Conventions to preserve

- All visible content is Turkish; keep new content in Turkish and matching the existing tone (first-person, journal-style).
- Section IDs (`yolculuk`, `moduller`, `komutlar`, `promptlar`, `projeler`, `claude-md`, `slash-komutlar`, `hooks`, `mcp`, `subagents`, `agent-sdk`) are used as CSS/anchor hooks — don't rename without updating `style.css`.
- List items in `Komutlar` follow the pattern `<code>komut</code> — tek cümlelik açıklama.`
- New theming values (colors, spacing) should go through the CSS variables in `:root` / the dark-mode block in `style.css`, not as hardcoded values in new rules, so dark mode stays consistent.
- The page loads Google Fonts (Inter) via `<link>` tags in `<head>` — an external dependency; keep this in mind if the site ever needs to work fully offline.
