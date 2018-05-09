import React, { Component } from 'react';

import * as WHS from 'whs';
import * as THREE from 'three';

import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';

import * as UTILS from '../components/utils';
import * as MtnModels from '../3dcomponents/mtnModels';
import * as MtnLights from '../3dcomponents/mtnLights';


// import {sphere} from '../3dcomponents/sphere';


OBJLoader(THREE);

let app = {},
    camera = {},
    orbitControls = {};

let changeCam = true;
let cameraSelected = 1;
let chaseCam = false;

export default class Mountain extends Component {

    constructor(props) {
        super(props)

        this.runWHS = this.runWHS.bind(this);
    }

    resize = () => this.forceUpdate()

    componentDidMount() {
        // this.THREE = THREE;
        this.runWHS();
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    componentDidUpdate() {
        this.runWHS();
    }

    // Exposed functions for control from parent components
    Cam1(msg) {
        cameraSelected = 1;
        changeCam = true;
    }
    Cam2() {
        cameraSelected = 2;
        changeCam = true;
    }




    runWHS() {

        var offset = Math.floor(Math.random() * 2) - 1;

        const mouse = new WHS.VirtualMouseModule();
        // const Dragging = new DragModule();



        let sphereY = MtnModels.SphereY(app, offset);

        camera = new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
            fov: 100,

            position: {
                x: 0,
                y: 80,
                z: 0
            },
        }));

        orbitControls = new WHS.OrbitControlsModule();

        app = new WHS.App([
            new WHS.ElementModule(document.getElementById('whs')),
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

        sphereY.addTo(app); // add after app init


        // Mountain Model

        const mountainModel = MtnModels.Mountain();

        mountainModel.addTo(app);

        // Billboard

        MtnModels.MakeBillboard(app);

        // Interactivity

        const makeBall = () => {
            this.props.ballWasMade("Ball created! ");
            let sphereX = new WHS.Sphere({ // Create sphere comonent.
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

                position: new THREE.Vector3(generatorLight.position.x, 66, generatorLight.position.z) //Jumps
            });

            sphereX.addTo(app);
        }

        // SphereGhost

        const generatorModel = MtnModels.Generator(app, offset);

        // generatorModel.addTo(app);

        mouse.track(generatorModel);

        generatorModel.on('click', () => {
            this.props.ballWasMade("Ball created! ");
            makeBall();
        });

        const generatorLight = MtnModels.GeneratorLight(app, offset);

        generatorLight.addTo(app);

        const printerControlFront = MtnModels.GeneratorController(
            app,
            offset,
            [22.5 + offset, 68, -16 + offset],
            [1.5708, 0, 0]
        )

        printerControlFront.addTo(app);
        mouse.track(printerControlFront);
        printerControlFront.on('click', () => { moveLightFront() });

        const printerControlLeft = MtnModels.GeneratorController(
            app,
            offset,
            [16.5 + offset, 68, -22 + offset],
            [1.5708, 0, 1.5708]
        );

        printerControlLeft.addTo(app);
        mouse.track(printerControlLeft);
        printerControlLeft.on('click', () => { moveLightLeft() });

        const printerControlBack = MtnModels.GeneratorController(
            app,
            offset,
            [22.5 + offset, 68, -28 + offset],
            [1.5708, 0, 3.14159]
        );

        printerControlBack.addTo(app);
        mouse.track(printerControlBack);
        printerControlBack.on('click', () => { moveLightBack() });

        const printerControlRight = MtnModels.GeneratorController(
            app,
            offset,
            [28.5 + offset, 68, -22 + offset],
            [1.5708, 0, 4.71239],
        );

        printerControlRight.addTo(app);
        mouse.track(printerControlRight);
        printerControlRight.on('click', () => { moveLightRight() });

        const printerControlGroup = new WHS.Group(generatorModel, printerControlFront, printerControlBack, printerControlLeft, printerControlRight);
        printerControlGroup.addTo(app);


        // Lights

        MtnLights.Lights(app);

        // Collision

        // sphere.on('collision', (otherObject, v, r, contactNormal) => {
        //     if (contactNormal.y < 0.5) sphere.material.color.set(0x0000ff);
        // });

        const moveBallBack = () => {
            let currLV = sphereY.use('physics').getLinearVelocity();
            if (currLV.z > -20) currLV.z -= 5;
            sphereY.use('physics').setLinearVelocity(currLV);
        }

        const moveBallFront = () => {
            let currLV = sphereY.use('physics').getLinearVelocity();
            if (currLV.z < 20) currLV.z += 5;
            sphereY.use('physics').setLinearVelocity(currLV);
        }
        const moveBallLeft = () => {
            let currLV = sphereY.use('physics').getLinearVelocity();
            if (currLV.x > -20) currLV.x -= 5;
            sphereY.use('physics').setLinearVelocity(currLV);
        }
        const moveBallRight = () => {
            let currLV = sphereY.use('physics').getLinearVelocity();
            if (currLV.x < 20) currLV.x += 5;
            sphereY.use('physics').setLinearVelocity(currLV);
        }


        const moveLightBack = () => {
            if (generatorLight.position.z > -24.5) {
                generatorLight.position.z -= .2;
                printerControlGroup.position.z -= .2;
            }
        }

        const moveLightFront = () => {
            if (generatorLight.position.z < -19) {
                generatorLight.position.z += .2;
                printerControlGroup.position.z += .2;
            }
        }
        const moveLightLeft = () => {
            if (generatorLight.position.x > 20) {
                generatorLight.position.x -= .2;
                printerControlGroup.position.x -= .2;
            }
        }
        const moveLightRight = () => {
            if (generatorLight.position.x < 24) {
                generatorLight.position.x += .2;
                printerControlGroup.position.x += .2;
            }
        }

        const jumpSphere = () => {
            let currVelocity = sphereY.use('physics').getLinearVelocity();
            sphereY.use('physics').setLinearVelocity({ x: currVelocity.x, y: 30, z: currVelocity.z });
        }

        var map = {};

        let handleKeyDown = (event) => {

            map[event.keyCode] = event.type == 'keydown';
            // console.log(map);
            if (map[87] === true) {
                moveBallBack();
            }
            if (map[83] === true) {
                moveBallFront();
            }
            if (map[65] === true) {
                moveBallLeft();
            }
            if (map[68] === true) {
                moveBallRight();
            }

            if (map[32] === true) {
                jumpSphere();
            }

            if (map[49]) {
                changeCam = true;
                cameraSelected = 1;
            }

            if (map[50]) {
                changeCam = true;
                cameraSelected = 2;
            }

            switch (event.key) {

                case 'ArrowUp':
                    moveLightBack();
                    break;
                case 'ArrowLeft':
                    moveLightLeft();
                    break;
                case 'ArrowDown':
                    moveLightFront();
                    break;
                case 'ArrowRight':
                    moveLightRight();
                    break;

                case 'Control':
                    makeBall();
                    break;

                default:
                    break;
            }

        };

        let handleKeyUp = handleKeyDown;

        document.addEventListener("keydown", handleKeyDown.bind(this));
        document.addEventListener("keyup", handleKeyUp.bind(this));

        const resetSphereY = () => {
            this.props.ballWasMade("Ball reset! ");

            sphereY.use('physics').setLinearVelocity({ x: 0, y: 0, z: 0 });
            sphereY.position = new THREE.Vector3(23.2 + offset, 63, -23 + offset);
        }

        const selectNewCamera = (cam) => {
            switch (cam) {

                case 1:
                    chaseCam = false;
                    camera.data.position = { x: -30, y: 80, z: 30 }
                    orbitControls.params.target = { x: 0, y: 80, z: 0 };

                    break;
                case 2:
                    chaseCam = true;
                    orbitControls.params.target = sphereY.position;
                    // orbitControls.params.follow = true;

                    break;
                default:
                    break;
            }
        }
        let incr = 4;

        const loop = new WHS.Loop((clock) => {

            // if (clock.getElapsedTime() > incr) {
            //     makeBall();
            //     incr += 4.5;
            // }

            if (sphereY.position.y < -20) {
                resetSphereY();
            }

            if (changeCam) {
                changeCam = false;

                selectNewCamera(cameraSelected);
            }

            if (chaseCam) {
                camera.data.position.x = sphereY.position.x;
                camera.data.position.y = sphereY.position.y + 10;
                camera.data.position.z = sphereY.position.z;
            }

        });

        loop.start(app);

        app.start();

    }


    render() {


        return (<span></span>);
    }
}
