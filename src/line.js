import * as THREE from 'three';

export default class Line {
    constructor() {
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

        const points = [];
        points.push(new THREE.Vector3(- 5, 0, 0));
        points.push(new THREE.Vector3(0, 5, 0));
        points.push(new THREE.Vector3(5, 0, 0));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const line = new THREE.Line(geometry, material);
        return line;
    }
}