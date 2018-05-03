import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import React, { Component } from 'react';

import Link from 'react-router-dom';

import * as WHS from 'whs';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';

import * as UTILS from '../../components/utils';
// import * as AMMO from '../../components/ammo';

import *  as mSquares from '../../3dcomponents/m';

// import modelJSON from '../../3dcomponents/marmelab.json';



export default class Header extends Component {

    constructor(props) {
        super(props)

        this.runWHS = this.runWHS.bind(this);
        this.terrainPractice = this.terrainPractice.bind(this);
    }

    resize = () => this.forceUpdate()

    componentDidMount() {
        // this.terrainPractice();
        this.runWHS();
        // window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        // window.removeEventListener('resize', this.resize)
    }

    componentDidUpdate() {
        // this.terrainPractice();
        this.runWHS();
    }

    terrainPractice() {
        const mouse = new WHS.VirtualMouseModule();

        const app = new WHS.App([
            new WHS.ElementModule(),
            new WHS.SceneModule(),
            new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
                position: {
                    y: 50,
                    z: 60
                }
            })),
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
            new WHS.OrbitControlsModule(),
            mouse
        ]);


        const sphere = new WHS.Sphere({ // Create sphere comonent.
            geometry: {
                radius: 8,
                widthSegments: 32,
                heightSegments: 32
            },

            modules: [
                new PHYSICS.SphereModule({
                    mass: 30,
                    restitution: 1
                }),

            ],

            material: new THREE.MeshPhongMaterial({
                color: 0xF2F2F2
            }),

            position: new THREE.Vector3(-30, 200, -5)
        });

        sphere.addTo(app);

        mouse.track(sphere);

        sphere.on('mouseover', () => {
            sphere.material.color.set(0xffff00);
            console.log('mouseover');
        });

        sphere.on('click', () => {
            sphere.material.color.set(0xff0000);
            console.log('click');
        });

        // Terrain

        const func = (u, v) =>
            new THREE.Vector3(u * 300, Math.sin(u * 10) * 4, v * 300);

        const terrain = new WHS.Parametric({
            geometry: {
                func,
                slices: 80,
                stacks: 80
            },

            shadow: {
                cast: false
            },

            material: new THREE.MeshPhongMaterial({
                color: UTILS.$colors.mesh,
                side: THREE.DoubleSide
            }),

            modules: [
                new PHYSICS.HeightfieldModule({
                    mass: 0,
                    size: new THREE.Vector2(80, 80),
                    autoAlign: true
                })
            ],
            position: new THREE.Vector3(0, 0, 0)

        });

        terrain.addTo(app);

        mouse.track(terrain);

        // terrain.on('mouseover', () => {
        //     terrain.material.color.set(0xffff00);
        //     console.log('mouseover');
        // });

        terrain.on('click', () => {
            // terrain.material.color.set(0xffff00);
            const sphere = new WHS.Sphere({ // Create sphere comonent.
                geometry: {
                    radius: 8,
                    widthSegments: 32,
                    heightSegments: 32
                },
    
                modules: [
                    new PHYSICS.SphereModule({
                        mass: 30,
                        restitution: 1
                    }),
    
                ],
    
                material: new THREE.MeshPhongMaterial({
                    color: 0xF2F2F2
                }),
    
                position: new THREE.Vector3(Math.floor(Math.random()*100)-50, 200, Math.floor(Math.random()*100)-50)
            });
    
            sphere.addTo(app);
            
        });


        //lights

        new WHS.Sphere({
            material: new THREE.MeshPhongMaterial({
                color: 0xF2F2F2,
                transparent: true,
                opacity: 0
            }),

            position: [0, 120, 110]
        }).addTo(app).then(mesh => {
            let angle = 0;

            new WHS.DirectionalLight({
                intensity: 1,

                shadow: {
                    mapSize: {
                        width: 4096,
                        height: 4096
                    },

                    bias: -0.003,
                    far: 150,
                    near: 5
                },

                position: [70, 35, 0]
            }).addTo(mesh);

        });

        
        

        

        app.start();
    }

    runWHS() {

        // console.log(modelJSON);

        const mouse = new WHS.VirtualMouseModule();

        const app = new WHS.App([
            new WHS.ElementModule(),
            new WHS.SceneModule(),
            new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
                position: {
                    y: 50,
                    z: 60
                }
            })),
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
            new WHS.OrbitControlsModule(),
            mouse
        ]);


        // Sphere
        const sphere = new WHS.Sphere({ // Create sphere comonent.
            geometry: {
                radius: 8,
                widthSegments: 32,
                heightSegments: 32
            },

            modules: [
                new PHYSICS.SphereModule({
                    mass: 30,
                    restitution: 1
                }),

            ],

            material: new THREE.MeshPhongMaterial({
                color: 0xF2F2F2
            }),

            position: new THREE.Vector3(-30, 200, -5)
        });

        sphere.addTo(app);

        const sphere2 = new WHS.Sphere({ // Create sphere comonent.
            geometry: {
                radius: 8,
                widthSegments: 32,
                heightSegments: 32
            },

            modules: [
                new PHYSICS.SphereModule({
                    mass: 30,
                    restitution: 1
                }),

            ],

            material: new THREE.MeshPhongMaterial({
                color: 0xF2F2F2
            }),

            position: new THREE.Vector3(20, 320, 5)
        });

        sphere2.addTo(app);
        sphere2.position.z -= 0.5;

        const sphere3 = new WHS.Sphere({ // Create sphere comonent.
            geometry: {
                radius: 1,
                widthSegments: 32,
                heightSegments: 32
            },

            modules: [
                new PHYSICS.SphereModule({
                    mass: 500,
                    friction: 0,
                    
                }),

            ],

            material: new THREE.MeshPhongMaterial({
                color: 0xF2F2F2
            }),

            position: new THREE.Vector3(4, 60, 55)
        });

        sphere3.addTo(app);

        const func = (u, v) =>
            new THREE.Vector3(u * 200, Math.sin(u * 10) * 4, v * 200);

        const terrain = new WHS.Parametric({
            geometry: {
                func,
                slices: 80,
                stacks: 80
            },

            shadow: {
                cast: false
            },

            material: new THREE.MeshPhongMaterial({
                color: UTILS.$colors.mesh,
                side: THREE.DoubleSide
            }),

            modules: [
                new PHYSICS.HeightfieldModule({
                    mass: 0,
                    size: new THREE.Vector2(80, 80),
                    autoAlign: true
                })
            ],
            position: new THREE.Vector3(0, 5, -130)

        });

        terrain.addTo(app);
        

        const objLoader = new OBJLoader(THREE);

        const compoundModule = new WHS.Importer({
            modules: [
                new PHYSICS.CompoundModule()
            ]
        })

        const part1 = new WHS.Importer({
            path: '../test.obj',
            loader: objLoader,
            parser(object){
                this.applyBridge({geometry: object.geometry});
                return object;
            },
            modules: [
                new PHYSICS.ConvexModule()
            ]
        })

        // const part2 = new WHS.Importer({
        //     path: '../part2.obj',
        //     loader: objLoader,
        //     parser(object){
        //         this.applyBridge({geometry: object.geometry});
        //         return object;
        //     },
        //     modules: [
        //         new PHYSICS.ConvexModule()
        //     ]
        // })

        part1.addTo(compoundModule);
        // part2.addTo(compoundModule);

        const teapot = new WHS.Importer({
            url: `../hvacd.json`,

            modules: [
                new PHYSICS.ConvexModule({
                    friction: 1,
                    mass: 500,
                    restitution: 0.5,
                    path: `../hvacd.json`,

                    scale: new THREE.Vector3(3, 3, 3)
                }),
            ],

            useCustomMaterial: true,

            

            material: new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                color: 0x0000ff
                
            }),

            position: {
                z:50,
                y: 0
            },

            scale: [3, 3, 3]
        });

        teapot.addTo(app);



        const col1 = [
            {
                pos: [-42, 29, 0],
                alpha: 1
            },
            {
                pos: [-42, 23, 0],
                alpha: 1
            },
            {
                pos: [-42, 17, 0],
                alpha: 1
            },
            {
                pos: [-42, 11, 0],
                alpha: 1
            },
            {
                pos: [-42, 5, 0],
                alpha: 1
            },

        ]
        const col2 = [
            {
                pos: [-36, 29, 0],
                alpha: 1
            },
            {
                pos: [-36, 23, 0],
                alpha: .4
            },
            {
                pos: [-36, 17, 0],
                alpha: .4
            },

            {
                pos: [-36, 11, 0],
                alpha: .4
            },
            {
                pos: [-36, 5, 0],
                alpha: .4
            },

        ]
        const col3 = [
            {
                pos: [-30, 29, 0],
                alpha: 1
            },
            {
                pos: [-30, 23, 0],
                alpha: 1
            },
            {
                pos: [-30, 17, 0],
                alpha: 1
            },

            {
                pos: [-30, 11, 0],
                alpha: .4
            },
            {
                pos: [-30, 5, 0],
                alpha: .4
            },

        ]
        const col4 = [
            {
                pos: [-24, 29, 0],
                alpha: 1
            },
            {
                pos: [-24, 23, 0],
                alpha: .4
            },
            {
                pos: [-24, 17, 0],
                alpha: .4
            },

            {
                pos: [-24, 11, 0],
                alpha: .4
            },
            {
                pos: [-24, 5, 0],
                alpha: .4
            },

        ]
        const col5 = [
            {
                pos: [-18, 29, 0],
                alpha: 1
            },
            {
                pos: [-18, 23, 0],
                alpha: 1
            },
            {
                pos: [-18, 17, 0],
                alpha: 1
            },

            {
                pos: [-18, 11, 0],
                alpha: 1
            },
            {
                pos: [-18, 5, 0],
                alpha: 1
            },

        ]
        const col6 = [
            {
                pos: [-12, 29, 0],
                alpha: .4
            },
            {
                pos: [-12, 23, 0],
                alpha: .4
            },
            {
                pos: [-12, 17, 0],
                alpha: .4
            },

            {
                pos: [-12, 11, 0],
                alpha: .4
            },
            {
                pos: [-12, 5, 0],
                alpha: .4
            },

        ]
        const col7 = [
            {
                pos: [-6, 29, 0],
                alpha: 1
            },
            {
                pos: [-6, 23, 0],
                alpha: .4
            },
            {
                pos: [-6, 17, 0],
                alpha: 1
            },

            {
                pos: [-6, 11, 0],
                alpha: 1
            },
            {
                pos: [-6, 5, 0],
                alpha: 1
            },

        ]
        const col8 = [
            {
                pos: [0, 29, 0],
                alpha: 1
            },
            {
                pos: [0, 23, 0],
                alpha: .4
            },
            {
                pos: [0, 17, 0],
                alpha: 1
            },

            {
                pos: [0, 11, 0],
                alpha: .4
            },
            {
                pos: [0, 5, 0],
                alpha: 1
            },

        ]
        const col9 = [
            {
                pos: [6, 29, 0],
                alpha: 1
            },
            {
                pos: [6, 23, 0],
                alpha: .4
            },
            {
                pos: [6, 17, 0],
                alpha: 1
            },

            {
                pos: [6, 11, 0],
                alpha: .4
            },
            {
                pos: [6, 5, 0],
                alpha: 1
            },

        ]
        const col10 = [
            {
                pos: [12, 29, 0],
                alpha: 1
            },
            {
                pos: [12, 23, 0],
                alpha: 1
            },
            {
                pos: [12, 17, 0],
                alpha: 1
            },

            {
                pos: [12, 11, 0],
                alpha: 1
            },
            {
                pos: [12, 5, 0],
                alpha: 1
            },

        ]
        const col11 = [
            {
                pos: [18, 29, 0],
                alpha: .4
            },
            {
                pos: [18, 23, 0],
                alpha: .4
            },
            {
                pos: [18, 17, 0],
                alpha: .4
            },

            {
                pos: [18, 11, 0],
                alpha: .4
            },
            {
                pos: [18, 5, 0],
                alpha: .4
            },

        ]
        const col12 = [
            {
                pos: [24, 29, 0],
                alpha: 1
            },
            {
                pos: [24, 23, 0],
                alpha: .4
            },
            {
                pos: [24, 17, 0],
                alpha: .4
            },

            {
                pos: [24, 11, 0],
                alpha: .4
            },
            {
                pos: [24, 5, 0],
                alpha: 1
            },

        ]
        const col13 = [
            {
                pos: [30, 29, 0],
                alpha: .4
            },
            {
                pos: [30, 23, 0],
                alpha: 1
            },
            {
                pos: [30, 17, 0],
                alpha: .4
            },

            {
                pos: [30, 11, 0],
                alpha: 1
            },
            {
                pos: [30, 5, 0],
                alpha: .4
            },

        ]
        const col14 = [
            {
                pos: [36, 29, 0],
                alpha: .4
            },
            {
                pos: [36, 23, 0],
                alpha: .4
            },
            {
                pos: [36, 17, 0],
                alpha: 1
            },

            {
                pos: [36, 11, 0],
                alpha: .4
            },
            {
                pos: [36, 5, 0],
                alpha: .4
            },

        ]
        const col15 = [
            {
                pos: [42, 29, 0],
                alpha: .4
            },
            {
                pos: [42, 23, 0],
                alpha: 1
            },
            {
                pos: [42, 17, 0],
                alpha: .4
            },

            {
                pos: [42, 11, 0],
                alpha: 1
            },
            {
                pos: [42, 5, 0],
                alpha: .4
            },

        ]
        const col16 = [
            {
                pos: [48, 29, 0],
                alpha: 1
            },
            {
                pos: [48, 23, 0],
                alpha: .4
            },
            {
                pos: [48, 17, 0],
                alpha: .4
            },

            {
                pos: [48, 11, 0],
                alpha: .4
            },
            {
                pos: [48, 5, 0],
                alpha: 1
            },

        ]

        const cols = [...col1, ...col2, ...col3, ...col4, ...col5, ...col6, ...col7, ...col8, ...col9, ...col10, ...col11, ...col12, ...col13, ...col14, ...col15, ...col16];

        for (let n of cols) {

            let box = new WHS.Box({ // Create sphere comonent.
                geometry: [5.9, 5.9, 5.9],

                material: new THREE.MeshPhongMaterial({
                    color: 0xF2F2F2,
                    transparent: true,
                    opacity: n.alpha
                }),
                position: new THREE.Vector3(n.pos[0] - 2, n.pos[1], n.pos[2]),
                // rotation: new THREE.Vector3(0,1,0),
                modules: [
                    new PHYSICS.BoxModule({
                        mass: 1
                    })
                ],
            });



            // box.addTo(app);


        }


        // Loop
        const loop = new WHS.Loop((clock) => {
            // box.rotation.y += 0.01;
            // sphere2.position.z -= 0.5;
            // sphere3.position.z += 2;

            if (clock.getElapsedTime() > 4) {
                loop.stop(app);
                reloop.start(app);
            }


        });

        const reloop = new WHS.Loop((clock) => {


            if (clock.getElapsedTime() > 3) {

                reloop.stop(app);
                reloop2.start(app);

            }
        });

        const reloop2 = new WHS.Loop((clock) => {


            if (clock.getElapsedTime() > 3) {

                reloop2.stop(app);
                reloop.start(app);

            }
        });

        loop.start(app);

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

        new WHS.Sphere({
            material: new THREE.MeshPhongMaterial({
                color: 0xF2F2F2,
                transparent: true,
                opacity: 0
            }),

            position: [0, 120, 110]
        }).addTo(app).then(mesh => {
            let angle = 0;

            new WHS.DirectionalLight({
                intensity: 1,

                shadow: {
                    mapSize: {
                        width: 4096,
                        height: 4096
                    },

                    bias: -0.003,
                    far: 150,
                    near: 5
                },

                position: [70, 35, 0]
            }).addTo(mesh);

        });


        // Collision
        sphere.on('collision', (otherObject, v, r, contactNormal) => {
            if (contactNormal.y < 0.5) { // Use a "good" threshold value between 0 and 1 here!
                sphere.material.color.set(0x0000ff);
                // otherObject.material.color.set(0x0000ff);
            }
        });

        sphere2.on('collision', (otherObject, v, r, contactNormal) => {
            if (contactNormal.y < 0.5) { // Use a "good" threshold value between 0 and 1 here!
                sphere2.material.color.set(0x0000ff);
                // otherObject.material.color.set(0x0000ff);
            }
        });

        sphere3.on('collision', (otherObject, v, r, contactNormal) => {
            if (contactNormal.y < 0.5) { // Use a "good" threshold value between 0 and 1 here!
                sphere3.material.color.set(0x0000ff);
                // otherObject.material.color.set(0x0000ff);
            }
        });

        // Mouse
        mouse.track(sphere);

        sphere.on('mouseover', () => {
            sphere.material.color.set(0xffff00);
            console.log('mouseover');
        });

        sphere.on('click', () => {
            sphere.material.color.set(0xff0000);
            console.log('click');
        });

        mouse.track(sphere2);

        sphere2.on('mouseover', () => {
            sphere2.material.color.set(0xffff00);
            console.log('mouseover');
        });

        sphere2.on('click', () => {
            sphere2.material.color.set(0xff0000);
            console.log('click');
        });

        mouse.track(sphere3);

        sphere3.on('mouseover', () => {
            sphere3.material.color.set(0xffff00);
            console.log('mouseover');
        });

        sphere3.on('click', () => {
            sphere3.material.color.set(0xff0000);
            console.log('click');
        });

        app.start();

    }



    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">WHS Practice</h1>
                </header>

            </div>
        );
    }
}
