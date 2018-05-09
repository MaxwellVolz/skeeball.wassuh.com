import React, { Component } from 'react';

import * as WHS from 'whs';
import * as THREE from 'three';

import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';
import * as UTILS from '../components/utils';
import * as MtnModels from '../3dcomponents/mtnModels';
import * as MtnLights from '../3dcomponents/mtnLights';

import * as SkeeballModels from '../3dcomponents/skeeballModels';
import * as SkeeballLights from '../3dcomponents/skeeballLights';
import * as SkeeballControls from '../3dcomponents/skeeballControls';

OBJLoader(THREE);

let app = {},
	camera = {},
	orbitControls = {};

let changeCam = false,
	chaseCam = false,
	cameraSelected = 1;

export default class Skeeball extends Component {

	constructor(props) {
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
		const startPos = new THREE.Vector3(105, 3, -5);

		camera = new WHS.PerspectiveCamera({
			fov: 100,
			position: {
				x: 115,
				y: 5,
				z: 0
			}
		})

		orbitControls = new WHS.OrbitControlsModule();

		app = new WHS.App([
			new WHS.ElementModule(document.getElementById('whs')),
			new WHS.SceneModule(),
			new WHS.DefineModule('camera', camera),
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

		var checkTime = 0;


		// shoot ball
		const shootBall = (shotPosition, shotPower, shotAngle) => {

			var currentTime = new Date()
			if((currentTime.getTime() - checkTime) > 100){
				//do stuff;

				
	
			this.props.ballWasMade("Shot fired!");
			let skeeballball = new WHS.Sphere({
				geometry: {
					radius: 1,
					widthSegments: 32,
					heightSegments: 32
				},
				modules: [
					new PHYSICS.SphereModule({
						mass: 20,
						setLinearVelocity: {
							x: 500,
							y: shotPower / 10,
							z: shotAngle
						}
					}),
				],
				material: new THREE.MeshNormalMaterial({
					color: 0xFFFF00
				}),
				position: shotPosition
			});
			skeeballball.addTo(app);

			// skeeballball.add(camera);


			// skeeballball.use('physics').applyCentralForce({x: 5000, y: 10, z: 0});

			setTimeout(function () {
				skeeballball.use('physics').setLinearVelocity({
					x: -shotPower,
					y: shotPower / 20,
					z: shotAngle
				});
			}, 50);


			checkTime =currentTime.getTime();
			}

			// TEST
			// not sure if camera will need to be removed from previous ball
			// see: https://whs.io/module-core.Component.html
			// need 'chase' camera positioning;
			// camera.addTo(skeeballball);

		};


		// click listeners for balls 

		// collision listeners for holes 

		const ghostBall = SkeeballModels.GhostBall(startPos);


		// shooting steps 
		const createGhostBall = () => {
			// check if ghostBall exists

			cameraSelected = 2;
			changeCam = true;

			// delete ball from slot
			ghostBall.addTo(app);
			// app.remove(camera);
			// ghostBall.add(camera);

			// camera.position = {x: 20, y: 5, z: 0};
			console.log(camera);

			console.log(ghostBall);


		}

		const removeGhostBall = () => {
			app.remove(ghostBall);
		}

		

		// scorekeeping 

		// reset game

		// in game controls
		const title = SkeeballControls.Title();
		title.addTo(app);

		const fireBtn = SkeeballControls.FireButton();
		fireBtn.addTo(app);

        mouse.track(fireBtn);
		
		fireBtn.on('click', () => {

			shootBall(ghostBall.position, 100 + (Math.random() * 70), (Math.random() * 8) - 4);

        });

		// keyboard controls
		var map = {};

		let handleKeyDown = (event) => {

			switch (event.key) {

				case '1':
					createGhostBall();
					break;
				case '2':
				case ' ':
					shootBall(ghostBall.position, 100 + (Math.random() * 70), (Math.random() * 8) - 4);
					removeGhostBall();
					break;
				case '3':
					cameraSelected = 1;
					changeCam = true;
					break;
				case '4':
					break;

				case 'ArrowUp':
				case 'w':
				case 'W':
					if (ghostBall.position.y < 8) ghostBall.position.y += .5;
					break;

				case 'ArrowDown':
				case 's':
				case 'S':
					if (ghostBall.position.y > 0) ghostBall.position.y -= .5;
					break;

				case 'ArrowLeft':
				case 'a':
				case 'A':
					if (ghostBall.position.z < 6.5) ghostBall.position.z += .5;
					break;

				case 'ArrowRight':
				case 'd':
				case 'D':
					if (ghostBall.position.z > -8) ghostBall.position.z -= .5;
					break;

				case 'Control':
					// makeBall();
					break;

				default:
					break;
			}

		};

		document.addEventListener("keydown", handleKeyDown.bind(this));

		// 2 player keyboard mode

		// lights
		SkeeballLights.Lights(app);

		// loops
		let cycle = 2;

		const loop = new WHS.Loop((clock) => {
			if (clock.getElapsedTime() > cycle) {
				// shoot random ball
				// shootBall(startPos, 100 + (Math.random() * 70), (Math.random() * 14) - 7);
				cycle += 2.2;
			}
		});

		loop.start(app);


		// camera controls

		const selectNewCamera = (cam) => {
			switch (cam) {

				case 1:
					chaseCam = false;
					camera.position = { x: -30, y: 80, z: 30 }
					orbitControls.params.target = { x: 0, y: 80, z: 0 };

					break;
				case 2:
					chaseCam = true;
					orbitControls.params.target = ghostBall.position;
					// orbitControls.params.follow = true;

					break;
				default:
					break;
			}
		}

		const constantLoop = new WHS.Loop((clock) => {


			if (changeCam) {
				changeCam = false;

				selectNewCamera(cameraSelected);
			}

			if (chaseCam) {
				camera.position.x = ghostBall.position.x + 10;
				camera.position.y = ghostBall.position.y + 10;
				camera.position.z = ghostBall.position.z;
			}

		});

		constantLoop.start(app);

		// app start
		app.start();
	}


	render() {
		return (<span></span>);
	}
}
