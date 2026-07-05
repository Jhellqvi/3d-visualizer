import './style.css'
import { createScene } from './scene'
import { catalog, type ModelEntry } from './catalog'
import { createModelMenu, createControlsHint } from './ui'

const app = document.querySelector<HTMLDivElement>('#app')!
const sceneHandle = createScene(app)

async function selectEntries(entries: ModelEntry[]) {
  try {
    const objects = await Promise.all(entries.map((entry) => entry.load()))
    sceneHandle.setModels(objects)
  } catch (err) {
    console.error('Failed to load selection', err)
  }
}

createModelMenu(app, catalog, selectEntries)
createControlsHint(app)
