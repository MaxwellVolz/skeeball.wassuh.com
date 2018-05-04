import * as WHS from 'whs';
import * as THREE from 'three';




export const box2 = new WHS.Box({ // Create sphere comonent.
    geometry: [10, 10, 10],

    material: new THREE.MeshPhongMaterial({
        color: 0xF2F2F2
    }),
    position: new THREE.Vector3(12, 5, 0)

});
