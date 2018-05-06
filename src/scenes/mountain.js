import React, { Component } from 'react';

import * as WHS from 'whs';
import * as THREE from 'three';

import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';

import * as UTILS from '../components/utils';

// import {sphere} from '../3dcomponents/sphere';


OBJLoader(THREE);



export default class Mountain extends Component {

    constructor(props) {
        super(props)

        this.runWHS = this.runWHS.bind(this);
    }

    resize = () => this.forceUpdate()

    componentDidMount() {
        // this.THREE = THREE;

        this.runWHS();
    }

    componentDidUpdate() {
        this.runWHS();
    }



    runWHS() {

        var offset = Math.floor(Math.random() * 2) - 1;

        const mouse = new WHS.VirtualMouseModule();
        // const Dragging = new DragModule();

        let changeCam = true;
        let cameraSelected = 1;
        let chaseCam = false;


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
                color: 0xFFF000
            }),
            // position: new THREE.Vector3(-22, 40, -28) // Mountain
            // 22 + offset, 63, -22 + offset
            position: new THREE.Vector3(23.2 + offset, 63, -23 + offset) //Jumps
            // position: new THREE.Vector3(-24, 50, 30) //Jumps
        });

        const camera = new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
            fov: 100,

            position: {
                x: 0,
                y: 80,
                z: 0
            },
        }));

        const orbitControls = new WHS.OrbitControlsModule();


        const app = new WHS.App([
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


        

        // Mountain Model

        const concaveModel = new WHS.Model({
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

        concaveModel.addTo(app);



        // Sphere 
        sphereY.addTo(app);


        // Billboard Boxi

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


        const makeBillboard = () => {

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
        }
        makeBillboard();
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

        const generatorModel = new WHS.Sphere({ // Create sphere comonent.
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

        // generatorModel.addTo(app);

        mouse.track(generatorModel);

        generatorModel.on('click', () => {
            this.props.ballWasMade("Ball created! ");
            makeBall();
        });


        const generatorLight = new WHS.Cone({
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

        generatorLight.addTo(app);

        const generatorGeometry = {
                radiusTop: .2,
                radiusBottom: .2,
                height: 40
        }
        const generatorMaterial =new THREE.MeshBasicMaterial({  
            color: 0x447F8B,
            transparent: true,
            opacity: 0.3
        });
        const generatorScale = [.05, .05, .05];

        const printerControlFront = new WHS.Cone({
            geometry: generatorGeometry,
            material: generatorMaterial,
            position: [22.5 + offset, 68, -16 + offset],
            rotation: [1.5708, 0, 0],
            scale: generatorScale
        });

        printerControlFront.addTo(app);
        mouse.track(printerControlFront);
        printerControlFront.on('click', () => { moveLightFront() });

        const printerControlLeft = new WHS.Cone({
            geometry: generatorGeometry,
            material: generatorMaterial,
            position: [16.5 + offset, 68, -22 + offset],
            rotation: [1.5708, 0, 1.5708],
            scale: generatorScale
        });

        printerControlLeft.addTo(app);
        mouse.track(printerControlLeft);
        printerControlLeft.on('click', () => { moveLightLeft() });

        const printerControlBack = new WHS.Cone({
            geometry: generatorGeometry,
            material: generatorMaterial,
            position: [22.5 + offset, 68, -28 + offset],
            rotation: [1.5708, 0, 3.14159],
            scale: generatorScale
        });

        printerControlBack.addTo(app);
        mouse.track(printerControlBack);
        printerControlBack.on('click', () => { moveLightBack() });

        const printerControlRight = new WHS.Cone({
            geometry: generatorGeometry,
            material: generatorMaterial,
            position: [28.5 + offset, 68, -22 + offset],
            rotation: [1.5708, 0, 4.71239],
            scale: generatorScale
        });

        printerControlRight.addTo(app);
        mouse.track(printerControlRight);
        printerControlRight.on('click', () => { moveLightRight() });

        const printerControlGroup = new WHS.Group(generatorModel, printerControlFront, printerControlBack, printerControlLeft, printerControlRight);
        printerControlGroup.addTo(app);


        // Lights

        new WHS.PointLight({
            light: {
                intensity: 0.5,
                distance: 300
            },
            shadow: {
                fov: 90
            },

            position: new THREE.Vector3(13, 90, -10)
        }).addTo(app);

        // const moodLight = new WHS.SpotLight({
        //     color: 0xfff82d,
        //     intensity: 5,
        //     distance: 5,
        //     target: [22, 0, -23],
        //     position: [22 + offset, 63, -22 + offset]

        // });

        // moodLight.addTo(app);

        new WHS.AmbientLight({
            light: {
                intensity: 0.3
            }
        }).addTo(app);

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

        const loop = new WHS.Loop((clock) => {

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
