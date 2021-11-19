import * as THREE from './three.js-master/build/three.module.js'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.Material({
    color: 0x00ff00
})
const boxMesh = new THREE.Mesh(geometry,material)
scene.add(boxMesh)

//boilerplate code

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 5000)
camera.position.set(0,1,2)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas:canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true
renderer.render(scene,camera)