import React, { Component } from 'react';

import * as WHS from 'whs';
import * as THREE from 'three';

import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';
import * as UTILS from '../component/utils';
import * as MtnModels from '../3dcomponents/mtnModels';
import * as MtnLights from '../3dcomponents/mtnLights';

import * as SkeeballModels from '../3dcomponents/skeeballModels';

ObjLoader(THREE);

let app = {}
	camera = {},
	orbitControls = {};

export default class Skeeball extends Component {

	constructor(props){
		super(props);
		this.PlaySkeeball = this.PlaySkeeball.bind(this);
	}

	componentDidMount() {
		this.PlaySkeeball();
		this.props.onRef(this);
	}
	
	componentWillUnmount() {	
		this.props.onRef(this);	
	}

	componentDidUpdate() {
		this.PlaySkeeball();
	}

	PlaySkeeball() {
		
		// init app
	const mouse = new WHS.VirtualMouseModule();
		const startPos = new THREE.Vector3(20,10,0);

		camera = new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
			fov: 100,
			position: {
				x: 0,
				y: 40,
				z: 60
			}
		}));

		app = new WHS.App([
			new WHS.ElementModule(document.getElementById('whs2')),
			new WHS.SceneModule(),
			camera,
			new WHS.RenderingModule({
				bgColor: 0x162129,
				renderer: {
					antialias: true,
					shadowmap: {
						type: THREE.PCFShadowMap
					}
				}
			}, { shadow: true }),
			new PHYSICS.WorldModule({
				ammo: 'https://cdn.rawgit.com/WhitestormJS/physics-module-ammonext/7a25628e/vendor/ammo.js'
			}),
			new WHS.ResizeModule(),
			mouse,
			orbitControls
		]);
				
		// create static models

		const skeeballMachine = SkeeballModels.Machine();

		skeeballMachine.addTo(app);

		// create balls in slot
		// ref them in order
		// on click of area 
		
		// shoot ball
		const shootBall = (shotPosition, shotPower, shotAngle) => {
			this.props.ballWasMade("Shot fired!");
			let skeeballball = new WHS.Sphere({
				geometry: {
					radius: 1,
					widthSegments: 32,
					heightSegments: 32
				},
				modules: [
					new PHYSICS.SphereModule({
						mass: 20
					}),
				material: new THREE.MeshPhongMaterial({
					color: 0xFFFF00
				}),
				position: shotPosition
			});
			skeeballball.addTo(app);
			
			skeeballball.use('physics').setLinearVelocity({
				x: shotPower,
				y: shotPower / 10,
				z: shotAngle
			});

			// TEST
			// not sure if camera will need to be removed from previous ball
			// see: https://whs.io/module-core.Component.html
			// need 'chase' camera positioning;
			camera.addTo(skeeballball);

		};  			


		// click listeners for balls 
	
		// collision listeners for holes 

		// shooting steps 

		// scorekeeping 

		// reset game

		// 2 player keyboard mode
		
		// loops
		let cycle = 3;
		
		const loop = new WHS.Loop((clock) => {
			if (clock.getElapsedTime() > cycle){	
				// shoot random ball
				shootBall(startPos, 20, 5);
				cycle += 3.2;
			}
		});
		
		loop.start(app);

		// app start
		app.start();		
	}	
	
	
	render() {
		return(<span></span>);
	}
}
