import * as WHS from 'whs';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';

OBJLoader(THREE);

export function Machine(app){
	return new WHS.Model({
		geometry: {
			path: '../Skeeball.json',
		},
		
		modules: [
			new PHYSICS.ConcaveModule({
				mass: 0,
				path: '../Skeeball.json',
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
