import * as WHS from 'whs';
import * as THREE from 'three';

import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';

OBJLoader(THREE);

export function SphereY(app, offset){
    return new WHS.Sphere({ // Create sphere comonent.
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
            color: 0xFFF000
        }),
        // position: new THREE.Vector3(-22, 40, -28) // Mountain
        // 22 + offset, 63, -22 + offset
        position: new THREE.Vector3(23.2 + offset, 63, -23 + offset) //Jumps
        // position: new THREE.Vector3(-24, 50, 30) //Jumps
    });
}
export function GeneratorController(app,offset,pos,rot){
    const generatorGeometry = {
        radiusTop: .2,
        radiusBottom: .2,
        height: 40
    }
    const generatorMaterial = new THREE.MeshBasicMaterial({  
        color: 0x447F8B,
        transparent: true,
        opacity: 0.3
    });
    const generatorScale = [.05, .05, .05];

    return  new WHS.Cone({
        geometry: generatorGeometry,
        material: generatorMaterial,
        position: pos,
        rotation: rot,
        scale: generatorScale
    });
}

export function Generator(app,offset){
    return new WHS.Sphere({ // Create sphere comonent.
        geometry: {
            radius: 1,
            widthSegments: 32,
            heightSegments: 32
        },
        modules: [
            new PHYSICS.SphereModule({
                mass: 0,
                friction: 0,

            }),
        ],
        material: new THREE.MeshPhongMaterial({
            color: 0x00FFFF
        }),
        // position: new THREE.Vector3(-22, 40, -28) // Mountain
        // 22 + offset, 63, -22 + offset
        position: new THREE.Vector3(22.5 + offset, 68, -22 + offset) //Jumps
        // position: new THREE.Vector3(-24, 50, 30) //Jumps
    });
}

export function GeneratorLight(app,offset){
    return new WHS.Cone({
        geometry: {
            radiusTop: 1,
            radiusBottom: .6,
            height: 40
        },

        material: new THREE.MeshBasicMaterial({
            color: 0x447F8B,
            transparent: true,
            opacity: 0.125
        }),

        position: [22.5 + offset, 63, -22 + offset],
        scale: [.2, .2, .2]
    });
}
export function Mountain(app){
    return new WHS.Model({
        geometry: {
            path: '../Jumps2.json'
        },

        modules: [
            new PHYSICS.ConcaveModule({
                friction: 1,
                mass: 0,
                path: '../Jumps2.json',
                scale: new THREE.Vector3(4, 4, 4)
            })
        ],
        useCustomMaterial: true,
        position: {
            z: 0,
            y: 0,
            x: 0
        },
        scale: [4, 4, 4]
        // material: new THREE.MeshBasicMaterial({color: 0xff0000})
    });
}

export function MakeBillboard(app) {
    console.log("YO");
    const col1 = [
        {
            pos: [-13, 21.2, -25.5],
            alpha: 1
        },
        {
            pos: [-10.9, 21.2, -25.5],
            alpha: 1
        },
        {
            pos: [-8.9, 21.2, -25.5],
            alpha: 1
        },
        {
            pos: [-6.8, 21.2, -25.5],
            alpha: 1
        },
        {
            pos: [-4.7, 21.2, -25.5],
            alpha: 1
        },
        {
            pos: [-2.5, 21.2, -25.5],
            alpha: 1
        },
    ]
    const col2 = [
        {
            pos: [-13, 23.3, -25.5],
            alpha: 1
        },
        {
            pos: [-10.9, 23.3, -25.5],
            alpha: 1
        },
        {
            pos: [-8.9, 23.3, -25.5],
            alpha: 1
        },
        {
            pos: [-6.8, 23.3, -25.5],
            alpha: 1
        },
        {
            pos: [-4.7, 23.3, -25.5],
            alpha: 1
        },
        {
            pos: [-2.5, 23.3, -25.5],
            alpha: 1
        },
    ]
    const col3 = [
        {
            pos: [-13, 25.4, -25.5],
            alpha: 1
        },
        {
            pos: [-10.9, 25.4, -25.5],
            alpha: 1
        },
        {
            pos: [-8.9, 25.4, -25.5],
            alpha: 1
        },
        {
            pos: [-6.8, 25.4, -25.5],
            alpha: 1
        },
        {
            pos: [-4.7, 25.4, -25.5],
            alpha: 1
        },
        {
            pos: [-2.5, 25.4, -25.5],
            alpha: 1
        },
    ]
    
    const cols = [...col1, ...col2, ...col3];

    for (let n of cols) {

        let box = new WHS.Box({ // Create sphere comonent.
            geometry: [2, 2, 2],

            material: new THREE.MeshPhongMaterial({
                color: 0xF2F2F2,
                transparent: true,
                opacity: n.alpha
            }),
            position: new THREE.Vector3(n.pos[0] - 2, n.pos[1], n.pos[2]),
            // rotation: new THREE.Vector3(0,1,0),
            modules: [
                new PHYSICS.BoxModule({
                    mass: 5,
                    friction: 5,
                })
            ],
        });

        box.addTo(app);
    }
    return app;

        

}