import './style.css'
import { createScene } from './scene'
import { catalog, type ModelEntry } from './catalog'
import { createModelMenu } from './ui'

const app = document.querySelector<HTMLDivElement>('#app')!
const sceneHandle = createScene(app)

async function selectEntry(entry: ModelEntry) {
  try {
    const object = await entry.load()
    sceneHandle.setModel(object)
  } catch (err) {
    console.error(`Failed to load "${entry.label}"`, err)
  }
}

createModelMenu(app, catalog, selectEntry)
selectEntry(catalog[0])
