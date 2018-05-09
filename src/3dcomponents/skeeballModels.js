import * as WHS from 'whs';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';

OBJLoader(THREE);

export function Machine(app){
	return new WHS.Model({
		geometry: {
			path: '../skeeball2.json',
		},
		
		modules: [
			new PHYSICS.ConcaveModule({
				mass: 0,
				path: '../skeeball2.json',
				scale: new THREE.Vector3(3,3,3)
			})
		],
		material: new THREE.MeshNormalMaterial({
			color: 0xFFFF00
		}),
		position: {
			x: 10,
			y: 0,
			z: 0
		},
		scale: [3,3,3]
	});
}

export function GhostBall(position){
    return new WHS.Sphere({ // Create sphere comonent.
        geometry: {
            radius: 1,
            widthSegments: 32,
            heightSegments: 32
        },
        material: new THREE.MeshNormalMaterial({
			color: 0xFFFF00
		}),
        // position: new THREE.Vector3(-22, 40, -28) // Mountain
        // 22 + offset, 63, -22 + offset
        position: position //Jumps
        // position: new THREE.Vector3(-24, 50, 30) //Jumps
    });
}
