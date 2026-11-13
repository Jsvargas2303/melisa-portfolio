# Melisa Pardo — Portfolio

Personal portfolio and visual CV for Melisa Pardo, UX/UI designer.

Vite + React + TypeScript, GSAP (ScrollTrigger, `@gsap/react`), Lenis smooth scroll, and a WebGL aurora background (`@react-three/fiber`).

## Run locally

```bash
npm install
npm run dev -- --host 0.0.0.0   # http://localhost:5173
```

## Build a static site

```bash
npm run build
npm run preview                 # preview the `dist/` folder
```

The production build lives in `dist/` and can be served by any static host (Nginx, Netlify, GitHub Pages, S3, etc.). Routing uses **hash URLs**, so it works with no server rewrite rules:

- Home: `/` or `/#/` or `/#/projects` (scrolls to projects)
- PawMate: `/#/projects/pawmate`
- Maze: `/#/projects/maze`
- Public Services: `/#/projects/public-services`

## Base path

By default the build uses a relative base (`./`), so the site works at a domain root **and** if the `dist` folder is opened from a subfolder.

```bash
# default — relative, good for a future domain root
npm run build

# absolute root (https://melisa.example/)
BASE_PATH=/ npm run build

# GitHub Pages project site
BASE_PATH=/melisa-portfolio/ npm run build
```

The setting lives in `vite.config.ts` (`base: process.env.BASE_PATH || './'`).

## Editing content

All copy, projects, links and translations live in tidy data files — you shouldn’t need to touch components for a text or URL change:

| File | What it holds |
|---|---|
| `src/data/site.ts` | Email, Behance, **TODO** LinkedIn / Instagram, optional Figma URLs |
| `src/data/copy.ts` | All UI strings and project case-study copy, in English and Spanish |
| `src/data/images.ts` | Image manifests, `srcset` widths, and alt text (EN/ES) |

Theme (`melisa-theme`) and language (`melisa-lang`) are persisted in `localStorage`. The first visit follows `prefers-color-scheme` and the browser language (`es*` → Spanish, otherwise English). A small inline script in `index.html` applies both before paint, so there is no theme flash.

## Project images

Originals stay **outside** the repo (`/workspace/melisa/images/`). Optimized WebP variants (several widths, for `srcset`) are in `public/projects/`. To regenerate after new screenshots:

```bash
npm run optimize-images
```

The script is `scripts/optimize-images.py` (requires Pillow). Update `src/data/images.ts` if you add, remove, or reorder slides, and write alt text in both languages.

## Accessibility & motion

- Skip link, visible focus, keyboard-operable carousel and lightbox
- `prefers-reduced-motion` disables Lenis, GSAP, aurora animation and slide transitions
- WebGL pauses when the tab is hidden (aurora) or off-screen (orbs)

## License

Work and writing © Melisa Pardo. This codebase is for her portfolio site.
