import * as WHS from 'whs';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';

OBJLoader(THREE);

export function Title(app) {

    const textGroup = new WHS.Group();

    const newText = (text, position) => {

        return new WHS.Text({
            text: text,
            font: WHS.Text.load(`../font.typeface.json`),
    
            geometry: {
                size: 5,
                height: 1,
                curveSegments: 6
            },
    
            material: new THREE.MeshBasicMaterial({
                color: 0xffffff
            }),
            rotation: [-(Math.PI / 4), (Math.PI / 2.3) ,(Math.PI / 4)],
            position: position
        })
    }

    const title = newText('Skeeball',[60, 10, -30]);
    const body = newText('Coming Soon!',[61, 4, -30]);

    title.addTo(textGroup);
    body.addTo(textGroup);

    return textGroup;
}

