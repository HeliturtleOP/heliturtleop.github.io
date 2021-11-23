import * as THREE from './three.js-master/build/three.module.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';

			const loader = new GLTFLoader();



			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

 var record = new THREE.Object3D;

loader.load( './models/record.gltf', function ( gltf ) {	
	record = gltf.scene.children[0];
	record.scale.set(1,1,1)
	record = scene.add(record)

});

console.log(record.scale)	

record.updateMatrix();

console.log(record);

//scene.add(data)

//console.log(GetData('./models/record.gltf'))

            const light = new THREE.AmbientLight( 0x404040 ); // soft white light
            scene.add( light );
			
            const controls = new OrbitControls( camera, renderer.domElement );

            //controls.update() must be called after any manual changes to the camera's transform
            camera.position.set( 0, 0, 5 );
            controls.update();


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function render() {

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {

		//intersects[ i ].object.material.color.set( 0xff0000 );
		console.log("aaaaa")
		record.rotation.x += 0.01;
		record.rotation.y += 0.01;
	}

	renderer.render( scene, camera );

}

window.addEventListener( 'mousemove', onMouseMove, false );



            renderer.outputEncoding = THREE.sRGBEncoding;

			const animate = function () {
				requestAnimationFrame( animate );

				//record.rotation.x += 0.01;
				//record.rotation.y += 0.01;

                renderer.outputEncoding = THREE.sRGBEncoding;
				render();				
				
			};

			animate();