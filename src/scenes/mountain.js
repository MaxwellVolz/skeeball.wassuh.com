import React, { Component } from 'react';

import * as WHS from 'whs';
import * as THREE from 'three';

import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';

import * as UTILS from '../components/utils';


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

        const mouse = new WHS.VirtualMouseModule();
        // const Dragging = new DragModule();

        const camera = new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
            fov: 90,
            position: {
                x: -45,
                y: 65,
                z: 45
            },
        }));

        const app = new WHS.App([
            new WHS.ElementModule(document.getElementById('whs')),
            new WHS.SceneModule(),
            camera,
            new WHS.RenderingModule({
                bgColor: 0x162129,

                renderer: {
                    antialias: true,
                    shadowmap: {
                        type: THREE.PCFSoftShadowMap
                    }
                }
            }, { shadow: true }),
            new PHYSICS.WorldModule({
                ammo: 'https://cdn.rawgit.com/WhitestormJS/physics-module-ammonext/7a25628e/vendor/ammo.js'
            }),
            new WHS.OrbitControlsModule('follow', sphere),
            new WHS.ResizeModule(),
            mouse,
        ]);

        // Sphere

        // Bridge
        const bridgeModel = new WHS.Model({
            geometry: {
                path: '../bridge.json'
            },

            modules: [
                new PHYSICS.ConcaveModule({
                    friction: 1,
                    mass: 0,
                    path: '../bridge.json',
                    scale: new THREE.Vector3(4, 4, 4)
                })
            ],
            useCustomMaterial: true,
            position: {
                x: 0,
                y: 30,
                
                z: 0,
            },
            rotation: {
                x: 0,
                y:  -1.57079632679,
                z: 0,
            },
            scale: [4, 4, 4]
            // material: new THREE.MeshBasicMaterial({color: 0xff0000})
        });

        bridgeModel.addTo(app);

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
            // material: new THREE.MeshPhongMaterial({
            // shading: THREE.SmoothShading,
            // side: THREE.DoubleSide,
            //     // color: 0xFFD06B
            // }),
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
        const sphere = new WHS.Sphere({ // Create sphere comonent.
            geometry: {
                radius: 1,
                widthSegments: 32,
                heightSegments: 32
            },
            modules: [
                new PHYSICS.SphereModule({
                    mass: 30,
                    // friction: 1,

                }),

            ],
            material: new THREE.MeshPhongMaterial({
                color: 0xF2F2F2
            }),

            position: new THREE.Vector3(-12, 35, -28)
        });

        // sphere.addTo(app);

        // Box

        const newBall = new WHS.Box({ // Create sphere comonent.
            geometry: {
                width: 2,
                height: 2,
                depth: 2
            },
            material: new THREE.MeshBasicMaterial({
                color: 0xffffff
            }),

            position: [-30, 40, -20]
        });

        newBall.addTo(app);

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

                position: new THREE.Vector3(22 + Math.floor(Math.random() * 2) - 1, 80, -23 + Math.floor(Math.random() * 2) - 1) //Jumps
            });

            sphereX.addTo(app);
        }

        // Plane

        const plane = new WHS.Plane({
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
            }
        });
        plane.addTo(app);


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

        //   new WHS.AmbientLight({
        //     light: {
        //       intensity: 0.2
        //     }
        //   }).addTo(app);


        // Collision

        // sphere.on('collision', (otherObject, v, r, contactNormal) => {
        //     if (contactNormal.y < 0.5) sphere.material.color.set(0x0000ff);
        // });

        // Mouse


        mouse.track(newBall);

        newBall.on('click', () => {
            makeBall();
            this.props.ballWasMade("sup");

        });


        mouse.on('move', () => {
            // sphere.setLinearVelocity(mouse.project().sub(sphere.position).multiplyScalar(2));
            // sphere.applyForce(new THREE.Vector3(10, 0, 0))
            // sphere.bo
        });

        let handleKeyDown = (event) => {
            console.log(event)

            switch (event.key) {
                case 'w':
                    bridgeModel.position.y += .2;
                    bridgeModel.rotation.y = 0.0314;
                    // bridgeModel.mass = 5;
                    break;
                case 'ArrowUp':
                    bridgeModel.position.y += .2;
                    break;
                case 'A':
                    bridgeModel.position.x -= .2;
                    break;
                case 'ArrowLeft':
                    bridgeModel.position.x -= .2;
                    break;
                case 'S':
                    bridgeModel.position.y -= .2;
                    break;
                case 'ArrowDown':
                    bridgeModel.position.y -= .2;
                    break;
                case 'D':
                    bridgeModel.position.x += .2;
                    break;
                case 'ArrowRight':
                    bridgeModel.position.x += .2;
                    break;
                default:
                    break;
            }

        };

        document.addEventListener("keydown", handleKeyDown.bind(this));


        // Kickoff

        app.start();

    }


    render() {


        return (<span></span>);
    }
}
