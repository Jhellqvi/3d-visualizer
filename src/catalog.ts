import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export type Category = 'Other' | 'Trucks'

export type ModelEntry = {
  id: string
  label: string
  category: Category
  group?: string
  load: () => Promise<THREE.Object3D>
}

export type CategoryDef = {
  name: Category
  groups?: string[]
}

export const categories: CategoryDef[] = [
  { name: 'Other' },
  { name: 'Trucks', groups: ['Interior', 'Cabin', 'Chassis'] },
]

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
  group?: string,
): ModelEntry[] {
  return Object.entries(modules).map(([path, url]) => ({
    id: path,
    label: labelFromPath(path),
    category,
    group,
    load: () => loadGltf(url),
  }))
}

const otherModules = import.meta.glob<string>('/src/models/other/*.glb', {
  eager: true,
  query: '?url',
  import: 'default',
})

const interiorModules = import.meta.glob<string>(
  '/src/models/trucks/interior/*.glb',
  { eager: true, query: '?url', import: 'default' },
)

const cabinModules = import.meta.glob<string>('/src/models/trucks/cabin/*.glb', {
  eager: true,
  query: '?url',
  import: 'default',
})

const chassisModules = import.meta.glob<string>(
  '/src/models/trucks/chassis/*.glb',
  { eager: true, query: '?url', import: 'default' },
)

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
  ...entriesFromGlob(interiorModules, 'Trucks', 'Interior'),
  ...entriesFromGlob(cabinModules, 'Trucks', 'Cabin'),
  ...entriesFromGlob(chassisModules, 'Trucks', 'Chassis'),
]
