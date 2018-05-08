import * as WHS from 'whs';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';

OBJLoader(THREE);

export function Machine(app){
	return new WHS.Model({
		geometry: {
			path: '../skeeball.json',
		},
		
		modules: [
			new PHYSICS.ConcaveModule({
				mass: 0,
				path: '../skeeball.json',
				scale: new THREE.Vector3(1,1,1)
			})
		],
		useCustomMaterial: true,
		position: {
			x: 0,
			y: 0,
			z: 0
		},
		scale: [1,1,1]
	});
}

export function GhostBall(position){
    return new WHS.Sphere({ // Create sphere comonent.
        geometry: {
            radius: 1,
            widthSegments: 32,
            heightSegments: 32
        },
        material: new THREE.MeshPhongMaterial({
            color: 0xFFF000
        }),
        // position: new THREE.Vector3(-22, 40, -28) // Mountain
        // 22 + offset, 63, -22 + offset
        position: position //Jumps
        // position: new THREE.Vector3(-24, 50, 30) //Jumps
    });
}
