import * as THREE from 'three';

export default class Torus {
    constructor() {
        const geometry = new THREE.TorusGeometry(0.2, 0.06, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: '#e7ca23' });
        material.metalness = 1;
        material.roughness = 0.5;

        const mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }
}