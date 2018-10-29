import * as three from 'three'

export const init = (canvasId: string) => {
  const canvas = document.querySelector(`#${canvasId}`)
  console.log('this is new')

  const height = window.innerHeight
  const width = window.innerWidth
  const scene = new three.Scene()
  const camera = new three.PerspectiveCamera(75, width / height, .1, 1000)

  camera.position.z = 5

  const renderer = new three.WebGLRenderer({
    canvas
  })
  renderer.setSize(width, height)

  document.body.appendChild(renderer.domElement)

  const loader = new three.ObjectLoader()

  loader.load('assets/obj/male02/male02.obj',
    obj => scene.add(obj), xhr => console.log(xhr.loaded / xhr.total * 100) + '% loaded',
    err => console.error('An error occurred', err)
  )
}
