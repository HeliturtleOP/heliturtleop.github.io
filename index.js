import * as THREE from './three.js-master/build/three.module.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';

const loader = new GLTFLoader();



const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

            loader.load('./models/record.gltf', function (gltf){
                scene.add(gltf.scene)
            })

            const light = new THREE.AmbientLight( 0x404040 ); // soft white light
            scene.add( light );

			const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
			//scene.add( cube );

			camera.position.z = 500;

            const controls = new OrbitControls( camera, renderer.domElement );

            //controls.update() must be called after any manual changes to the camera's transform
            camera.position.set( 0, 20, 100 );
            controls.update();

            renderer.outputEncoding = THREE.sRGBEncoding;

			const animate = function () {
				requestAnimationFrame( animate );



				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

                renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.render( scene, camera );
			};

			animate();