import './style.scss';
import SimplexNoise from 'simplex-noise';
import * as THREE from 'three';
// import Canvas from './src/canvas';

'use strict';

// Initial vars
const cell = 10;
const simplex = new SimplexNoise();


let camera, scene, renderer;
let geometry, material, mesh;


function init() {
    // PARAMETERS OF CAMERA
    // FOV in deg, aspect ratio, near clipping limit (minimum distance of the camera visible to the camera), far clipping limit
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 0.95);
    camera.position.z = 1;

    scene = new THREE.Scene();

    // render engine
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor( 0xffffff, 0);
    // Size of the canvas and resolution
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Animation function, just like native JS requestAnimationFrame
    renderer.setAnimationLoop(animation);
    // append the canvas element to the DOM
    document.body.appendChild(renderer.domElement);



    // geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    geometry = new THREE.TorusGeometry(0.2, 0.06, 20, 20);
    // material = new THREE.MeshNormalMaterial();
    material = new THREE.MeshBasicMaterial({ color: '#e9e5d9' });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

}

function animation(time) {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render(scene, camera);
}

/*--------------------
INIT
--------------------*/
// const canvas = new Canvas({
//     id: 'canvas',
// });


init();