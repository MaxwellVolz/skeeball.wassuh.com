import React, { Component } from 'react';

import * as WHS from 'whs';
import * as THREE from 'three';

import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';


export const sphere = () => {
    let sphereY = new WHS.Sphere({ // Create sphere comonent.
        geometry: {
            radius: 1,
            widthSegments: 32,
            heightSegments: 32
        },
        modules: [
            new PHYSICS.SphereModule({
                mass: 20,
                friction: 0,

            }),

        ],
        material: new THREE.MeshPhongMaterial({
            color: 0xF2F2F2
        }),
        // position: new THREE.Vector3(-22, 40, -28) // Mountain
        // 22 + offset, 63, -22 + offset
        position: new THREE.Vector3(-10, 66 , 0) //Jumps
    });
    
    return sphereY;
}
