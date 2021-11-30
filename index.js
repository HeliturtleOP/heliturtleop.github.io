import * as THREE from './three.js-master/build/three.module.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
import {loadModel} from './modelLoader.js';

			//const loader = new GLTFLoader();

const area = document.querySelector('scene-container');

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			//loadModel();

var records;

async function init(){
	const model = await loadModel('./models/records.glb');

	//console.log(model.scene.children[0]);

	records = model.scene;

	console.log(records.children[0]);

	scene.add(model.scene);
}

init();

 //var record = loadModel('./models/test.glb');
 //scene.add(record);

//loader.load( './models/test.glb', function ( gltf ) {	
//	record = gltf.scene.children[0];
	
//	record.scale.set(1,1,1)
//	record = scene.add(record)

//});

//scene.add(data)

//console.log(GetData('./models/record.gltf'))

            const light = new THREE.HemisphereLight( 0xFFFF80, 0x4040FF, 1.0); // soft white light
            scene.add( light );
			
            //const controls = new OrbitControls( camera, renderer.domElement );

            //controls.update() must be called after any manual changes to the camera's transform
            camera.position.set( -3, 0, 2);
			camera.rotation.set(0, -0.3926991 ,0)
            //controls.update();


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

var obj;
var last;

window.addEventListener('click', event => {
	if (obj!= null){
		console.log(obj.name)
		window.location.href = "./" + obj.name + ".html";
	}
  });

function render() {

//console.log(records);

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );


	
 if (intersects[0] != null){
	 obj = intersects[0].object;
	 //console.log('touching', obj)



	 obj.selected = true;

	 if (obj.name == "Shelf"){
		obj.selected = false;
	}

	if (last!= null)
	if (last != obj){
		last.selected = false;
	}

	last = obj;




 }else{
	//console.log('nottouching', obj)
	if (obj != null){
		obj.selected = false;
		//obj.position.lerp(new THREE.Vector3(0,0,obj.position.z), 0.05);
	}
 }

 for (let i = 0; i < records.children.length; i ++ ) {
	var record = records.children[i];
	//console.log(i, record.selected)
	if (record.selected != undefined){
		if (record.selected == false)
		record.position.lerp(new THREE.Vector3(0,0,record.position.z), 0.05);
		if (record.selected == true)
		record.position.lerp(new THREE.Vector3(-1.2, 0, record.position.z), 0.05);
	}
}

	//for ( let i = 0; i < intersects.length; i ++ ) {

		//intersects[ i ].object.material.color.set( 0xff0000 );
		//console.log("aaaaa")
		
		//console.log(i, 'hit', intersects[i]);

		//if (intersects[i]!= null){
			//obj = intersects[i].object;
			//obj.move = true;

			//for (let n = 0; n < obj.parent.children.length; n ++){
				//if (obj.parent.children[n].move === false)
				//obj.parent.children[n].position.lerp(new THREE.Vector3(0,0,obj.parent.children[n].position.z), 0.05);
				//obj.parent.children[n].position.lerp(new THREE.Vector3(-1.2, 0, obj.parent.children[n].position.z), 0.05);else
				//obj.parent.children[n].position.lerp(new THREE.Vector3(-1.2, 0, obj.parent.children[n].position.z), 0.05);
			//}	


			//console.log(obj.move)
			//return;
		//}

		
		
		//window.addEventListener('click', event => {
		//	console.log("aaaaa")
		//  });
		
	//}

	//if (obj!= null){
		//obj.move = false;
		//console.log(obj.move)
		//obj.position.lerp(new THREE.Vector3(-1.2, 0, obj.position.z), 0.05);
	
		//for (let n = 0; n < obj.parent.children.length; n ++){
			//obj.parent.children[n].position.lerp(new THREE.Vector3(0,0,obj.parent.children[n].position.z), 0.05);
		//} 

//}

	

}



window.addEventListener( 'mousemove', onMouseMove, false );
//window.addEventListener('mousedown', onmousedown, false);



            renderer.outputEncoding = THREE.sRGBEncoding;

			const animate = function () {
				requestAnimationFrame( animate );

				//record.rotation.x += 0.01;
				//record.rotation.y += 0.01;

                renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.render( scene, camera );
				render();				
				
			};

			function checkFlag() {
				if(records === undefined) {
				   window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
				} else {
				  /* do something*/
				  
				  animate();
				}
			}
			checkFlag();

			