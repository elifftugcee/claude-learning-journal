# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, single-page personal learning journal (in Turkish) documenting the user's progress learning Claude Code. This project is actively being built up throughout the user's Claude Code training — expect frequent, incremental additions to its sections (new modules, commands, prompts, projects) rather than a finished, static deliverable. No build tooling, no package manager, no framework — plain HTML/CSS/JS opened directly in a browser.

## Files

- `index.html` — the entire page content, organized as `<section>` blocks inside `<main>` (Öğrenme Yolculuğum, Modüller, Komutlar, Promptlar, Projeler).
- `style.css` — all styling: CSS custom properties in `:root` for theming, with a `@media (prefers-color-scheme: dark)` override block redefining the same variables for dark mode. Layout is CSS Grid (`main` is a 2-column grid; the first section spans both columns via `grid-column: 1 / -1`; collapses to 1 column under 640px).
- `script.js` — currently empty.

## Running / previewing

There is no dev server or build step. Open `index.html` directly in a browser to preview changes.

## Conventions to preserve

- All visible content is Turkish; keep new content in Turkish and matching the existing tone (first-person, journal-style).
- Section IDs (`yolculuk`, `moduller`, `komutlar`, `promptlar`, `projeler`) are used as CSS/anchor hooks — don't rename without updating `style.css`.
- List items in `Komutlar` follow the pattern `<code>komut</code> — tek cümlelik açıklama.`
- New theming values (colors, spacing) should go through the CSS variables in `:root` / the dark-mode block in `style.css`, not as hardcoded values in new rules, so dark mode stays consistent.
- The page loads Google Fonts (Inter) via `<link>` tags in `<head>` — an external dependency; keep this in mind if the site ever needs to work fully offline.
