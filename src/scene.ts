import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function createScene(container: HTMLElement) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

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

  const pan = { active: false, lastX: 0, lastY: 0 }

  function panBy(dx: number, dy: number) {
    const distance = camera.position.distanceTo(controls.target)
    const fov = (camera.fov * Math.PI) / 180
    const visibleHeight = 2 * Math.tan(fov / 2) * distance
    const panX = (dx / container.clientHeight) * visibleHeight
    const panY = (dy / container.clientHeight) * visibleHeight

    const xAxis = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0)
    const yAxis = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1)
    const offset = xAxis
      .multiplyScalar(-panX)
      .addScaledVector(yAxis, panY)

    camera.position.add(offset)
    controls.target.add(offset)
  }

  function onContextMenu(event: MouseEvent) {
    event.preventDefault()
  }
  renderer.domElement.addEventListener('contextmenu', onContextMenu)

  function onPointerDown(event: PointerEvent) {
    if (event.buttons === 3) {
      pan.active = true
      pan.lastX = event.clientX
      pan.lastY = event.clientY
      controls.autoRotate = false
      controls.enabled = false
    }
  }
  renderer.domElement.addEventListener('pointerdown', onPointerDown)

  function onPointerMove(event: PointerEvent) {
    if (!pan.active) return
    if (event.buttons !== 3) {
      pan.active = false
      controls.enabled = true
      return
    }
    panBy(event.clientX - pan.lastX, event.clientY - pan.lastY)
    pan.lastX = event.clientX
    pan.lastY = event.clientY
  }
  window.addEventListener('pointermove', onPointerMove)

  function onPointerUp() {
    if (pan.active) {
      pan.active = false
      controls.enabled = true
    }
  }
  window.addEventListener('pointerup', onPointerUp)

  let current: THREE.Object3D[] = []

  function frameObjects(objects: THREE.Object3D[]) {
    const box = new THREE.Box3()
    for (const obj of objects) box.expandByObject(obj)
    if (box.isEmpty()) return

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1

    const fov = (camera.fov * Math.PI) / 180
    const distance = (maxDim / (2 * Math.tan(fov / 2))) * 1.5

    camera.near = distance / 100
    camera.far = distance * 100
    camera.updateProjectionMatrix()

    controls.target.copy(center)
    camera.position.set(center.x, center.y, center.z + distance)
    camera.lookAt(center)
  }

  function setModels(objects: THREE.Object3D[]) {
    for (const obj of current) scene.remove(obj)
    current = objects
    for (const obj of objects) scene.add(obj)
    frameObjects(objects)
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
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('contextmenu', onContextMenu)
      controls.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    },
  }
}
