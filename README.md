# 3D Visualizer

A starter project for building interactive 3D visualizations in the browser,
using [Three.js](https://threejs.org/).

Right now it shows a single rotating blue cube — that's the "hello world" of
3D graphics, proving the whole pipeline (browser → code → GPU) works. Everything
you build next replaces or extends that cube.

## Adding your own 3D models

The menu lists a fixed set of truck parts: Interior, Cabin, and Chassis.
Drop your `.glb` file into the matching folder, using the exact filename below,
and that menu button starts working:

- `public/models/trucks/interior/interior.glb`
- `public/models/trucks/cabin/cabin.glb`
- `public/models/trucks/chassis/chassis.glb`

To add a new selectable item (a new part, or something under "Other"), add an
entry to `src/catalog.ts` — that's the one place that lists everything the
menu can show.

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
| `src/catalog.ts` | The list of everything selectable in the menu, and where to load each one from. |
| `src/ui.ts` | Builds the model-selector menu. |
| `public/models/` | Your 3D model files, organized by category. |
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
