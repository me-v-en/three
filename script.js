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
let dirLight;
let pointLight;


function init() {
    scene = new THREE.Scene();

    setUpCamera();
    setUpRenderer();
    setUpLight();

    torus = new Torus();
    line = new Line();


    scene.add(torus);
    scene.add(line);

    setUpGUI();
}

function setUpGUI() {
    const gui = new dat.GUI();
    const cameraFolder = gui.addFolder('Camera')
    cameraFolder.add(camera, 'fov', 0, 100).step(5).onChange(function (value) { camera.fov = value; camera.updateProjectionMatrix() });
    cameraFolder.add(camera.position, 'x', -10, 10).step(.1);
    cameraFolder.add(camera.position, 'y', -10, 10).step(.1);
    cameraFolder.add(camera.position, 'z', -50, 50).step(.1);
    cameraFolder.open()

    const dirLightFolder = gui.addFolder('Directional light')
    dirLightFolder.add(dirLight, 'intensity', 0, 5);
    dirLightFolder.add(dirLight.position, 'x', -10, 10);
    dirLightFolder.add(dirLight.position, 'y', -10, 10);
    dirLightFolder.add(dirLight.position, 'z', -50, 50);
    dirLightFolder.open();


    const pointLightFolder = gui.addFolder('Point light')
    pointLightFolder.add(pointLight, 'intensity', 0, 5)
    pointLightFolder.add(pointLight.position, 'x', -10, 10);
    pointLightFolder.add(pointLight.position, 'y', -10, 10);
    pointLightFolder.add(pointLight.position, 'z', -50, 50);
    pointLightFolder.open();
}

function setUpCamera() {
    // PARAMETERS OF CAMERA
    // FOV in deg, aspect ratio, near clipping limit (minimum distance of the camera visible to the camera), far clipping limit
    camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, .1, 100);
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
    setUpPointlight();
    setUpDirectionalLight();
}

function setUpDirectionalLight() {
    dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(-1, -1, 3);

    const sphereSize = 10;
    const DirectionalLightHelper = new THREE.DirectionalLightHelper(dirLight, sphereSize);

    scene.add(DirectionalLightHelper);
    scene.add(dirLight);
}

function setUpPointlight() {
    pointLight = new THREE.PointLight(0xff0000, 1);
    pointLight.position.set(10, 10, 5);

    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);

    scene.add(pointLightHelper);
    scene.add(pointLight);
}


function animation(time) {
    // mesh.rotation.x = time / 2000;
    // mesh.rotation.y = time / 1000;
    const cosLoop = Math.cos(time / 1000);
    torus.rotation.x = (cosLoop + 1) * 2 * Math.PI;
    torus.rotation.y = (cosLoop + 1) * 2 * Math.PI;

    const scaleFactor = 1 + cosLoop/2;
    torus.scale.set(scaleFactor, scaleFactor, scaleFactor);

    renderer.render(scene, camera);
}

/*--------------------
INIT
--------------------*/
// const canvas = new Canvas({
//     id: 'canvas',
// });


init();