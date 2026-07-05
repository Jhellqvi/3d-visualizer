# 3D Visualizer

A Three.js + TypeScript + Vite project for building interactive 3D visualizations
in the browser. The owner is a product manager learning to code, not a professional
developer — explain changes clearly and keep diffs easy to follow.

## Stack

- **Vite** — dev server and build tool
- **TypeScript** — type-checked JavaScript
- **Three.js** — WebGL 3D rendering

## Structure

- `index.html` — entry HTML, loads `src/main.ts`
- `src/main.ts` — app entry point
- `src/scene.ts` — Three.js scene setup (camera, lights, objects, render loop)
- `src/style.css` — global styles

## Commands

- `npm run dev` — start local dev server with hot reload
- `npm run build` — type-check and produce a production build in `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — check code with ESLint
- `npm run format` — auto-format with Prettier

## Conventions

- Keep scene setup (camera/lights/objects/animation) inside `src/scene.ts`,
  exported as a function that takes a container element. Add new 3D objects
  as their own functions in that file (or a new file under `src/`) rather
  than growing one giant function.
- No comments explaining *what* code does — name things clearly instead.
  Comments are only for non-obvious *why*.
- Run `npm run lint` and `npm run build` before committing to catch errors early.
- When adding a UI/visual change, verify it by running the dev server and
  taking a screenshot (or describing what to look for) rather than assuming
  it works from the code alone.

## Working with the owner

The owner is a product manager, first coding project. When making changes:

- Explain *why* a change is needed in plain language before diving into code.
- Flag anything that requires a new external connection (npm registry is fine;
  deployment platforms, APIs, analytics, etc. need explicit confirmation first).
- Point out one relevant "how professional devs work" tip per session when a
  natural opportunity comes up (e.g. why we type-check, why we lint, why we
  keep commits small) — keep it to one or two sentences, not a lecture.
