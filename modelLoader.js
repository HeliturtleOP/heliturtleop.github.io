import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

async function loadModel(path){

    const loader = new GLTFLoader();

    const Data = loader.loadAsync(path);

    console.log("sawuaaaq", Data);    

    return Data;

}

export {loadModel}
