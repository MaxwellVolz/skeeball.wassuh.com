import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import React, { Component } from 'react';

import Link from 'react-router-dom';

import * as WHS from 'whs';
import * as THREE from 'three';
// import * as OBJLoader from 'three-react-obj-loader';
import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';

import * as UTILS from '../../components/utils';
// import * as AMMO from '../../components/ammo';

import *  as mSquares from '../../3dcomponents/m';


// import modelJSON from '../../3dcomponents/marmelab.json';

OBJLoader(THREE);


export default class Header extends Component {

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
            new WHS.ElementModule(),
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
            new WHS.OrbitControlsModule(),
            mouse
        ]);

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
                    friction: 0,

                }),

            ],

            material: new THREE.MeshPhongMaterial({
                color: 0xF2F2F2
            }),

            position: new THREE.Vector3(-22, 55, -28)
        });

        // sphere.addTo(app);

        // Concave Model
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

        // Text
        const text = new WHS.Text({
            geometry: {
                text: 'hello world',
                parameters: {
                    font: '../gentilis_bold.typeface.json',
                    size: 20,
                    height: 5,
                    curveSegments: 6
                }
            },

            material: new THREE.MeshBasicMaterial({
                color: 0xffffff
            }),

            position: {
                x: -13,
                y: 50,
                z: -25.5

            },
            // rotation: {
            //     y: -Math.PI / 2,
            //     // z: 1cd
            // }
        });

        text.addTo(app);

        (new THREE.FontLoader()).load(`../gentilis_bold.typeface.json`, font => {
            const text2 = new WHS.Text({
              text: 'Secret',
              font,
          
              geometry: {
                size: 3,
                height: 1,
                curveSegments: 6
              },
          
              material: new THREE.MeshBasicMaterial({
                color: 0xffffff
              }),
          
              position: [-15, 22, -26.3]
            }).addTo(app);
          });

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

        // new WHS.Sphere({
        //     material: new THREE.MeshPhongMaterial({
        //         color: 0xF2F2F2,
        //         transparent: true,
        //         opacity: 0
        //     }),
        //     position: [50, 120, 50]
        // }).addTo(app).then(mesh => {
        //     let angle = 0;

        //     new WHS.DirectionalLight({
        //         intensity: 1,
        //         shadow: {
        //             mapSize: {
        //                 width: 4096,
        //                 height: 4096
        //             },
        //             bias: -0.003,
        //             far: 150,
        //             near: 5
        //         },
        //         position: [0, 35, 0]
        //     }).addTo(mesh);

        // });

        // new WHS.DirectionalLight({
        //     color: 0xffffff,
        //     intensity: 1,

        //     position: [10, 200, 10]
        // }).addTo(app);

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

        // mouse.track(sphere);

        // sphere.on('mouseover', () => {
        //     sphere.material.color.set(0xffff00);
        //     console.log('mouseover');
        // });

        // sphere.on('click', () => {
        //     sphere.material.color.set(0xff0000);
        //     console.log('click');
        // });

        mouse.track(concaveModel);

        concaveModel.on('click', () => {
            // sphere.addTo(app);
            makeBall();

        });

        // mouse.track(text);

        // text.on('click', () => {
        //     makeBillboard();
        // });

        // Kickoff

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
