import './style.css'
import { createScene } from './scene'
import { catalog, type ModelEntry } from './catalog'
import { createModelMenu, createControlsHint } from './ui'

const app = document.querySelector<HTMLDivElement>('#app')!
const sceneHandle = createScene(app)

let loadToken = 0

async function selectEntries(entries: ModelEntry[]) {
  const token = ++loadToken
  sceneHandle.clearModels()

  for (const entry of entries) {
    if (token !== loadToken) return
    try {
      const object = await entry.load()
      if (token !== loadToken) return
      sceneHandle.addModel(object)
    } catch (err) {
      console.error(`Failed to load "${entry.label}"`, err)
    }
  }
}

createModelMenu(app, catalog, selectEntries)
createControlsHint(app, sceneHandle.resetView)
