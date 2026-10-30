# Melisa — Portfolio
Vite + React + TS, GSAP (ScrollTrigger, @gsap/react), Lenis smooth scroll, @react-three/fiber + drei (aurora shader background + glass transmission orbs).
```
npm install
npm run dev -- --host 0.0.0.0   # http://localhost:5173
npm run build && npm run preview
```
Assets in `public/assets` (cropped from the mockup; replace with original high-res photos for production). Sections: 01 Hero · 02 Projects · 03 About · 04 Contact. Respects prefers-reduced-motion; WebGL pauses when tab hidden / offscreen.

## Assets
Run `./scripts/copy-assets.sh [attachments_dir]` to copy/crop the reference photos (hero, plant, workspace, project mockups) into `public/assets`. Without them, images fall back to soft aurora gradients.
