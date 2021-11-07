import './style.scss';
import SimplexNoise from 'simplex-noise';
import * as THREE from 'three';
import Torus from './src/torus';
import { Line } from 'three';
import * as dat from 'dat.gui'


// import Canvas from './src/canvas';

'use strict';

// Initial vars
const cell = 10;
const simplex = new SimplexNoise();


let camera, scene, renderer;
let geometry, material, mesh;
let torus;
let line;


function init() {
    const gui = new dat.GUI();
    scene = new THREE.Scene();

    setUpCamera();
    setUpRenderer();
    setUpLight();

    torus = new Torus();
    line = new Line();


    scene.add(torus);
    scene.add(line);
}

function setUpCamera() {
        // PARAMETERS OF CAMERA
    // FOV in deg, aspect ratio, near clipping limit (minimum distance of the camera visible to the camera), far clipping limit
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 500);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
};

function setUpRenderer() {
     // render engine
     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
     renderer.setClearColor(0xffffff, 0);
     // Size of the canvas and resolution
     renderer.setSize(window.innerWidth, window.innerHeight);
     // Animation function, just like native JS requestAnimationFrame
     renderer.setAnimationLoop(animation);
     // append the canvas element to the DOM
     document.body.appendChild(renderer.domElement);
 
     window.addEventListener('resize', () => {
         renderer.setSize(window.innerWidth, window.innerHeight);
     })
};

function setUpLight() {
    const PointLight = new THREE.PointLight(0xffffff, 0.1);
    PointLight.position.set(10, 10, 10);

    scene.add(PointLight);
}


function animation(time) {
    // mesh.rotation.x = time / 2000;
    // mesh.rotation.y = time / 1000;
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    renderer.render(scene, camera);
}

/*--------------------
INIT
--------------------*/
// const canvas = new Canvas({
//     id: 'canvas',
// });


init();