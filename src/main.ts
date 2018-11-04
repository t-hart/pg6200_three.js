import * as three from 'three'
import { OrbitControls } from 'three-orbitcontrols-ts'

export const init = (canvas: HTMLCanvasElement) => {

  const width = window.innerWidth
  const height = window.innerHeight
  const scene = new three.Scene()
  const camera = new three.PerspectiveCamera(75, width / height, .1, 1000)

  const renderer = new three.WebGLRenderer({
    canvas
  })
  renderer.setSize(width, height)
  renderer.shadowMap.enabled = true

  const controls = new OrbitControls(camera, renderer.domElement)

  controls.minDistance = 0
  controls.maxDistance = Infinity

  camera.enableZoom = true
  camera.zoomSpeed = 1


  controls.enablePan = true
  controls.enableDamping = false

  const makeCube = (pos, color) => {
    const geometry = new three.DodecahedronGeometry()
    const material = new three.MeshStandardMaterial({
      color
    })
    const x = new three.Mesh(geometry, material)
    x.position.x = pos.x || 0
    x.position.y = pos.y || 0
    x.position.z = pos.z || 0
    x.castShadow = true
    x.receiveShadow = true
    return x
  }

  const shapes = [
    [{ x: 2 }, 0xFFCC00],
    [{ z: -2 }, 0xFF00BB],
    [{ z: -.5, y: 1, x: -2 }, 0x00AABB]
  ].map(([pos, color]) => makeCube(pos, color))
  shapes.forEach(x => scene.add(x))

  const makePlane = () => {
    const geometry = new three.PlaneBufferGeometry(20, 20, 32, 32)
    const material = new three.MeshStandardMaterial({ color: 0x00ff00 })
    const plane = new three.Mesh(geometry, material)
    plane.position.z = -4
    plane.receiveShadow = true
    return plane
  }

  scene.add(makePlane())

  camera.position.z = 5

  // const ambient = new three.AmbientLight(0x202020)
  // scene.add(ambient)

  const point = new three.PointLight(0xff0000, 1, 100)
  point.position.set(-2, -2, 2)
  point.castShadow = true
  scene.add(point)

  const directional = new three.DirectionalLight(0xffffff, .5)
  directional.position.set(10, 10, 10)
  directional.castShadow = true
  scene.add(directional)
  directional.shadow.mapSize.width = 1024
  directional.shadow.mapSize.height = 1024
  // directional.shadow.camera.near = .5
  // directional.shadow.camera.far = 500

  const helper = new three.CameraHelper(point.shadow.camera)
  scene.add(helper)

  const animate = () => {
    requestAnimationFrame(animate)
    shapes.forEach(x => {
      x.rotation.x += 0.01
      x.rotation.y += 0.01
    })
    renderer.render(scene, camera)
  }
  animate()
}
