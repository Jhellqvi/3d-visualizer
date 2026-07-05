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

function loadGltf(path: string): Promise<THREE.Object3D> {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      path,
      (gltf) => resolve(gltf.scene),
      undefined,
      reject,
    )
  })
}

export const catalog: ModelEntry[] = [
  {
    id: 'cube',
    label: 'Cube',
    category: 'Other',
    load: async () =>
      new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0x4f8cff }),
      ),
  },
  {
    id: 'truck-interior',
    label: 'Interior',
    category: 'Trucks',
    load: () => loadGltf('/models/trucks/interior.glb'),
  },
  {
    id: 'truck-cabin',
    label: 'Cabin',
    category: 'Trucks',
    load: () => loadGltf('/models/trucks/cabin.glb'),
  },
  {
    id: 'truck-chassis',
    label: 'Chassis',
    category: 'Trucks',
    load: () => loadGltf('/models/trucks/chassis.glb'),
  },
]
