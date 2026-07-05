import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function createScene(container: HTMLElement) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x101014)

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    100,
  )
  camera.position.set(0, 1.5, 4)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)

  const light = new THREE.DirectionalLight(0xffffff, 2)
  light.position.set(3, 4, 2)
  scene.add(light)
  scene.add(new THREE.AmbientLight(0xffffff, 0.4))

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.enableDamping = true
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.6
  controls.addEventListener('start', () => {
    controls.autoRotate = false
  })

  let current: THREE.Object3D[] = []

  function setModels(objects: THREE.Object3D[]) {
    for (const obj of current) scene.remove(obj)
    current = objects
    for (const obj of objects) scene.add(obj)
    controls.autoRotate = true
  }

  function onResize() {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
  }
  window.addEventListener('resize', onResize)

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  return {
    setModels,
    dispose() {
      window.removeEventListener('resize', onResize)
      controls.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    },
  }
}
