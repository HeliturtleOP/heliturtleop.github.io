import * as THREE from './three.js-master/build/three.module.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

class World {
    constructor() {
        async function main(){

            const container = document.querySelector('#scene-container');
        
            const world = new World(container)
        
            await world.init();
        
            world.start();
        }

        main().catch((err) => {
            console.error(err);
          });

    }
  
    async init() {

    }
  }



