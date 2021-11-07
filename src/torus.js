import * as THREE from 'three';

export default class Torus {
    constructor() {
        const geometry = new THREE.TorusGeometry(0.2, 0.06, 20, 20);
        const material = new THREE.MeshBasicMaterial({ color: '#e9e5d9' });

        const mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }
}