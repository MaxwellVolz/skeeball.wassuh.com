import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import React, { Component } from 'react';

import Link from 'react-router-dom';

import * as WHS from 'whs';
import * as THREE from 'three';
import * as threeObjLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';

import * as UTILS from '../../components/utils';
// import * as AMMO from '../../components/ammo';

import *  as mSquares from '../../3dcomponents/m';

// import modelJSON from '../../3dcomponents/marmelab.json';



export default class Header extends Component {

    constructor(props) {
        super(props)

        this.runWHS = this.runWHS.bind(this);
    }

    resize = () => this.forceUpdate()

    componentDidMount() {
        this.runWHS();
    }

    componentDidUpdate() {
        this.runWHS();
    }

    runWHS() {

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

        sphere.addTo(app);

        // Compound Module ( not working! )

        const objLoader = new threeObjLoader(THREE);


        const compoundModule = new WHS.Importer({
            modules: [
                new PHYSICS.CompoundModule()
            ]
        })

        const part1 = new WHS.Importer({
            path: '../part1.obj',
            loader: objLoader,
            parser(object){
                this.applyBridge({geometry: object.geometry});
                return object;
            },
            modules: [
                new PHYSICS.ConvexModule()
            ]
        })

        const part2 = new WHS.Importer({
            path: '../part2.obj',
            loader: objLoader,
            parser(object){
                this.applyBridge({geometry: object.geometry});
                return object;
            },
            modules: [
                new PHYSICS.ConvexModule()
            ]
        })

        part1.addTo(compoundModule);
        part2.addTo(compoundModule);
        compoundModule.addTo(app);

        // Convex Model

        const convexModel = new WHS.Importer({
            url: `../ballTrack.json`,
            modules: [
                new PHYSICS.ConvexModule({
                    friction: 1,
                    mass: 500,
                    restitution: 0.5,
                    path: `../ballTrack.json`,
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

        convexModel.addTo(app);

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
            if (contactNormal.y < 0.5) sphere.material.color.set(0x0000ff);
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
