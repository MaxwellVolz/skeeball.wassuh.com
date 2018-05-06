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

        const orbitControls = new WHS.OrbitControlsModule({
            // object: sphereY,
            // target: {x:-20,y:50,z:-20},
            // target: sphereY.position,
            // follow: true
        });





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

        // Sphere

        // console.log(sphere);
        // sphere.addTo(app);


        // SphereGhost
        
        const printerModel = new WHS.Sphere({ // Create sphere comonent.
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
            position: new THREE.Vector3(23.2 + offset, 66, -23 + offset) //Jumps
            // position: new THREE.Vector3(-24, 50, 30) //Jumps
        });
        
        

        // printerModel.addTo(app);

        mouse.track(printerModel);

        printerModel.on('click', () => {
            this.props.ballWasMade("Ball created! ");
            makeBall();
        });

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

        // const concaveModel2 = new WHS.Model({
        //     geometry: {
        //         path: '../cuburo.json'
        //     },

        //     modules: [
        //         new PHYSICS.ConcaveModule({
        //             friction: 1,
        //             mass: 0,
        //             path: '../cuburo.json',
        //             scale: new THREE.Vector3(8, 8, 8)
        //         })
        //     ],
        //     useCustomMaterial: true,
        //     // material: new THREE.MeshPhongMaterial({
        //     // shading: THREE.SmoothShading,
        //     // side: THREE.DoubleSide,
        //     //     // color: 0xFFD06B
        //     // }),
        //     position: {
        //         z: 20,
        //         y: 15,
        //         x: -20
        //     },
        //     scale: [8, 8, 8]
        //     // material: new THREE.MeshBasicMaterial({color: 0xff0000})
        // });

        // concaveModel2.addTo(app);

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

                position: new THREE.Vector3(ballLight.position.x, 66, ballLight.position.z) //Jumps
            });

            sphereX.addTo(app);
        }

        // Moveaball

        

        sphereY.addTo(app);



        // Plane

        // const plane = new WHS.Plane({
        //     geometry: {
        //         width: 1000,
        //         height: 1000
        //     },
        //     modules: [
        //         new PHYSICS.PlaneModule({
        //             mass: 0
        //         })
        //     ],
        //     material: new THREE.MeshPhongMaterial({ color: 0x447F8B }),
        //     rotation: {
        //         x: -Math.PI / 2,
        //         // z: 1cd
        //     }
        // });
        // plane.addTo(app);


        const ballLight = new WHS.Cone({
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

            position: [23.5 + offset, 63, -23 + offset],
            scale: [.2, .2, .2]
        });

        ballLight.addTo(app);



        const printerControlFront = new WHS.Cone({
            geometry: {
                radiusTop: .2,
                radiusBottom: .2,
                height: 40
            },

            material: new THREE.MeshBasicMaterial({
                color: 0x42f4e8,

            }),

            position: [22.5 + offset, 68, -16 + offset],
            rotation: [1.5708, 0, 0],
            scale: [.05, .05, .05]
        });

        printerControlFront.addTo(app);

        mouse.track(printerControlFront);

        printerControlFront.on('click', () => {
            moveLightFront();

        });

        const printerControlLeft = new WHS.Cone({
            geometry: {
                radiusTop: .2,
                radiusBottom: .2,
                height: 40
            },

            material: new THREE.MeshBasicMaterial({
                color: 0x42f4e8,

            }),

            position: [16.5 + offset, 68, -22 + offset],
            rotation: [1.5708, 0, 1.5708],
            scale: [.05, .05, .05]
        });

        printerControlLeft.addTo(app);

        mouse.track(printerControlLeft);

        printerControlLeft.on('click', () => {
            moveLightLeft();

        });

        const printerControlBack = new WHS.Cone({
            geometry: {
                radiusTop: .2,
                radiusBottom: .2,
                height: 40
            },

            material: new THREE.MeshBasicMaterial({
                color: 0x42f4e8,

            }),

            position: [22.5 + offset, 68, -28 + offset],
            rotation: [1.5708, 0, 3.14159],
            scale: [.05, .05, .05]
        });

        printerControlBack.addTo(app);

        mouse.track(printerControlBack);

        printerControlBack.on('click', () => {
            moveLightBack();

        });

        const printerControlRight = new WHS.Cone({
            geometry: {
                radiusTop: .2,
                radiusBottom: .2,
                height: 40
            },

            material: new THREE.MeshBasicMaterial({
                color: 0x42f4e8,

            }),
            position: [28.5 + offset, 68, -22 + offset],
            rotation: [1.5708, 0, 4.71239],
            scale: [.05, .05, .05]
        });

        printerControlRight.addTo(app);

        mouse.track(printerControlRight);

        printerControlRight.on('click', () => {
            moveLightRight();

        });

        const printerControlGroup = new WHS.Group(printerModel, printerControlFront, printerControlBack, printerControlLeft, printerControlRight);
        printerControlGroup.addTo(app);

        // 
        // 3.14159
        // 4.71239


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

        // const ballLight = new WHS.SpotLight({
        //     color: 0xfff82d,
        //     intensity: 5,
        //     distance: 5,
        //     target: [22, 0, -23],
        //     position: [22 + offset, 63, -22 + offset]

        // });

        // ballLight.addTo(app);

          new WHS.AmbientLight({
            light: {
              intensity: 0.2
            }
          }).addTo(app);


        // Collision

        // sphere.on('collision', (otherObject, v, r, contactNormal) => {
        //     if (contactNormal.y < 0.5) sphere.material.color.set(0x0000ff);
        // });

        // Mouse

        mouse.on('move', () => {
            // sphere.setLinearVelocity(mouse.project().sub(sphere.position).multiplyScalar(2));
            // sphere.applyForce(new THREE.Vector3(10, 0, 0))
            // sphere.bo
        });




        const moveBallBack = () => {
            let currLV = sphereY.use('physics').getLinearVelocity();
            if(currLV.z > -20) currLV.z -=5;
            sphereY.use('physics').setLinearVelocity(currLV);
        }

        const moveBallFront = () => {
            let currLV = sphereY.use('physics').getLinearVelocity();
            if(currLV.z < 20) currLV.z +=5;
            sphereY.use('physics').setLinearVelocity(currLV);
        }
        const moveBallLeft = () => {
            let currLV = sphereY.use('physics').getLinearVelocity();
            if(currLV.x > -20) currLV.x -=5;
            sphereY.use('physics').setLinearVelocity(currLV);
        }
        const moveBallRight = () => {
            let currLV = sphereY.use('physics').getLinearVelocity();
            if(currLV.x < 20) currLV.x +=5;
            sphereY.use('physics').setLinearVelocity(currLV);
        }


        const moveLightBack = () => {

            if (ballLight.position.z > -24.5) {
                ballLight.position.z -= .2;
                printerControlGroup.position.z -= .2;
                // sphereY.use('physics').applyCentralForce({x: 10, y: 100, z: 10});
                // sphereY.use('physics').setLinearVelocity({x: 0, y: 50, z: 0});
                // sphereY.use('physics').setAngularVelocity({x: 0, y: 50, z: 0});
            }

        }
        const moveLightFront = () => {
            console.log(orbitControls)
            orbitControls.params.target = { x: sphere.position.x, y: sphere.position.y, z: sphere.position.z}

            if (ballLight.position.z < -19) {
                ballLight.position.z += .2;
                printerControlGroup.position.z += .2;
            }
        }
        const moveLightLeft = () => {

            if (ballLight.position.x > 20) {
                ballLight.position.x -= .2;
                printerControlGroup.position.x -= .2;
            }

        }
        const moveLightRight = () => {
            if (ballLight.position.x < 24) {
                ballLight.position.x += .2;
                printerControlGroup.position.x += .2;
            }

        }
        const jumpSphere = () => {
            let currVelocity = sphereY.use('physics').getLinearVelocity();

            sphereY.use('physics').setLinearVelocity({ x: currVelocity.x, y: 30, z: currVelocity.z });
        }

        var map = {};


        let handleKeyDown = (event) => {
            // console.log(event);

            map[event.keyCode] = event.type == 'keydown';
            console.log(map);
            if(map[87] === true){
                moveBallBack();
                console.log(camera.rotation);
                console.log(camera.data.rotation);
                // camera.setTarget(sphereY);
            }
            if(map[83] === true){
                moveBallFront();
            }
            if(map[65] === true){ // CTRL+SHIFT+A
                moveBallLeft();
            }
            if(map[68] === true){
                moveBallRight();
            }

            if(map[32] === true){
                jumpSphere();
            }

            if(map[49]){
                changeCam = true;
                cameraSelected = 1;
            }

            if(map[50]){
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
            sphereY.position =  new THREE.Vector3(23.2 + offset, 63, -23 + offset);
        }

        const selectNewCamera = (cam) =>{
            console.log(cam);
            switch (cam) {
               
                case 1:
                    chaseCam = false;
                    camera.data.position = {x: -30, y:80, z:30}
                    orbitControls.params.target = {x: 0, y:80, z:0};
                    
                    break;
                case 2:
                    // Chase Cam
                    chaseCam = true;
                    orbitControls.params.target =  sphereY.position;
                    orbitControls.params.follow =  true;
                    console.log("hello");

                                // target: sphereY.position,
            // follow: true
                    
                    break;
                default:
                    break;
            }
        }

        const loop = new WHS.Loop((clock) => {
            // box.rotation.y += 0.01;
            // sphere2.position.z -= 0.5;
            // sphere3.position.z += 2;

            if(sphereY.position.y < -20){ 
                resetSphereY();
            }

            if(changeCam){
                changeCam = false;

                selectNewCamera(cameraSelected);
            }

            if(chaseCam){
                camera.data.position.x = sphereY.position.x;
                camera.data.position.y = sphereY.position.y + 10;
                camera.data.position.z = sphereY.position.z;
            }

            


            // if (clock.getElapsedTime() > 4) {
            //     loop.stop(app);
            //     // reloop.start(app);
            // }


        });

        loop.start(app);

        // Kickoff

        app.start();

    }


    render() {


        return (<span></span>);
    }
}
