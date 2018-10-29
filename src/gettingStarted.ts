import * as three from 'three'

const height = window.innerHeight
const width = window.innerWidth
const scene = new three.Scene()
const camera = new three.PerspectiveCamera(75, width / height, .1, 1000)

const renderer = new three.WebGLRenderer()
renderer.setSize(width, height)

document.body.appendChild(renderer.domElement)

const geometry = new three.BoxGeometry(1, 1, 1)
const material = new three.MeshBasicMaterial({
  color: 0xFFCC00
})
const cube = new three.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

const animate = () => {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate()
