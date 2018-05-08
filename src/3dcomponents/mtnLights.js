import * as WHS from 'whs';
import * as THREE from 'three';

export function Lights(app) {

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

    // new WHS.AmbientLight({
    //     light: {
    //         intensity: 0.3
    //     }
    // }).addTo(app);
    return app;
}