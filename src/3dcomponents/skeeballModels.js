import * as WHS from 'whs';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';

OBJLoader(THREE);

export function Machine(app) {
	return new WHS.Model({
		geometry: {
			path: '../skeeball2.json',
		},

		modules: [
			new PHYSICS.ConcaveModule({
				mass: 0,
				path: '../skeeball2.json',
				scale: new THREE.Vector3(3, 3, 3)
			})
		],
		material: new THREE.MeshNormalMaterial({
			color: 0xFFFF00
		}),
		// useCustomMaterial: true,

		position: {
			x: 10,
			y: 0,
			z: 0
		},
		scale: [3, 3, 3]
	});
}

export function GhostBall(position) {
	return new WHS.Sphere({ // Create sphere comonent.
		geometry: {
			radius: 2,
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

export function DeletionPlane(app) {

	return new WHS.Plane({
		geometry: {
			width: 1000,
			height: 1000
		},

		modules: [
			new PHYSICS.PlaneModule({
				mass: 0
			})
		],

		material: new THREE.MeshPhongMaterial({ color: 0x447F8B }),

		rotation: {
			x: -Math.PI / 2,
			// z: 1cd
		},
		position: {
			y: -15
		}
	});
}

export function makeSlotBalls(app, mouse) {
	const slotBalls = [
		{
			pos: [48, 2.8, -17],
			alpha: 1
		},
		{
			pos: [44, 3, -17],
			alpha: 1
		},
		{
			pos: [40, 3.6, -17],
			alpha: 1
		},
		{
			pos: [36, 4, -17],
			alpha: 1
		},
		{
			pos: [32, 4.5, -17],
			alpha: 1
		},
		{
			pos: [28, 5, -17],
			alpha: 1
		}
	]

	for (let n of slotBalls) {

		let box = new WHS.Sphere({ // Create sphere comonent.
			geometry: {
				radius: 2,
				widthSegments: 32,
				heightSegments: 32
			},
			modules: [
				new PHYSICS.SphereModule({
					mass: 20,
					friction: 0.5,
				}),
			],
			material: new THREE.MeshNormalMaterial({
				color: 0xFFFF00
			}),
			position: new THREE.Vector3(n.pos[0], n.pos[1], n.pos[2]),
			// rotation: new THREE.Vector3(0,1,0),

		});

		box.addTo(app);

		mouse.track(box);

		box.on('click', () => {

			app.remove(box);
			// shootBall(ghostBall.position, 120 + (Math.random() * 70), (Math.random() * 8) - 4);

		});

	}
}