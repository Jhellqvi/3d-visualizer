# 3D Visualizer

A starter project for building interactive 3D visualizations in the browser,
using [Three.js](https://threejs.org/).

Right now it shows a single rotating blue cube — that's the "hello world" of
3D graphics, proving the whole pipeline (browser → code → GPU) works. Everything
you build next replaces or extends that cube.

## Adding your own 3D models

Drop a `.glb` file into `src/models/other/` or `src/models/trucks/<part-name>/`
and it shows up in the on-screen menu automatically — no code changes needed.
The menu label is just the filename (so `cabin.glb` shows up as "Cabin").

## Controls

- The selected model spins slowly on its own.
- Click and drag to rotate it manually (this also stops the auto-spin).
- Scroll to zoom in and out.
- In the menu, hold Shift while clicking to select multiple models at once
  (useful for viewing several truck parts together).

## Running it on your machine

1. Install [Node.js](https://nodejs.org/) (version 18 or later) if you don't have it.
2. Install the project's dependencies (one-time, or after pulling new changes):
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open the URL it prints (usually `http://localhost:5173`) in your browser.

The page auto-refreshes whenever you save a file — no need to restart anything.

## What's in this project

| File | What it does |
|---|---|
| `index.html` | The single HTML page the browser loads. |
| `src/main.ts` | Starts the app. |
| `src/scene.ts` | The 3D scene itself — camera, lighting, mouse controls, and the animation loop. |
| `src/catalog.ts` | Automatically finds every `.glb` file under `src/models/` and lists it. |
| `src/ui.ts` | Builds the model-selector menu. |
| `src/models/` | Your 3D model files, organized by category. |
| `src/style.css` | Makes the 3D view fill the whole browser window, and styles the menu. |

## Other commands

- `npm run build` — produce an optimized version for deploying somewhere (outputs to `dist/`)
- `npm run lint` — check the code for common mistakes
- `npm run format` — auto-tidy code style

## Learning notes

- **TypeScript** adds type-checking on top of JavaScript. If you write code that
  doesn't make sense (e.g. treating a number as text), it tells you immediately
  instead of failing silently later.
- **ESLint** and **Prettier** aren't required to make things work — they catch
  mistakes and keep formatting consistent, which matters more as the project grows.
- Nothing here deploys or connects anywhere automatically. Deployment (making
  this visible on a public URL) is a separate, later step you'll be asked about.
