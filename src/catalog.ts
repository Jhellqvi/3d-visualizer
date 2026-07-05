import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export type Category = 'Other' | 'Trucks'

export type ModelEntry = {
  id: string
  label: string
  category: Category
  load: () => Promise<THREE.Object3D>
}

const gltfLoader = new GLTFLoader()

function loadGltf(url: string): Promise<THREE.Object3D> {
  return new Promise((resolve, reject) => {
    gltfLoader.load(url, (gltf) => resolve(gltf.scene), undefined, reject)
  })
}

function labelFromPath(path: string): string {
  const filename = path.split('/').pop()!.replace(/\.glb$/, '')
  return filename.charAt(0).toUpperCase() + filename.slice(1)
}

function entriesFromGlob(
  modules: Record<string, string>,
  category: Category,
): ModelEntry[] {
  return Object.entries(modules).map(([path, url]) => ({
    id: path,
    label: labelFromPath(path),
    category,
    load: () => loadGltf(url),
  }))
}

const otherModules = import.meta.glob<string>('/src/models/other/**/*.glb', {
  eager: true,
  query: '?url',
  import: 'default',
})

const truckModules = import.meta.glob<string>('/src/models/trucks/**/*.glb', {
  eager: true,
  query: '?url',
  import: 'default',
})

const cubeEntry: ModelEntry = {
  id: 'cube',
  label: 'Cube',
  category: 'Other',
  load: async () =>
    new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0x4f8cff }),
    ),
}

export const catalog: ModelEntry[] = [
  cubeEntry,
  ...entriesFromGlob(otherModules, 'Other'),
  ...entriesFromGlob(truckModules, 'Trucks'),
]
