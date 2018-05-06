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
// import * as DragModule from '../../components/dragModule';
// import * as AMMO from '../../components/ammo';

import Mountain from '../../scenes/mountain';
import Snacks from '../../components/snacks';
import RightDrawer from '../../components/drawer';




// import modelJSON from '../../3dcomponents/marmelab.json';

OBJLoader(THREE);


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    onClick = () => {
        this.child.current.sup();
    };

    ballReport = (msg) => {
        console.log(msg);
        // console.log(this);
        this.child.messageFromAbove(msg);
        // this.child.handleClick('Ball Created');

    }

    render() {


        return (
            <div className="App">
            <Mountain ballWasMade={this.ballReport}/>
            <Snacks onRef={ref => (this.child = ref)} />

            
                <header className="App-header">
                <RightDrawer  />
                
                    {/* <h1 className="App-title"></h1> */}
                    
                </header>

                <div id="whs"></div>

            </div>
        );
    }
}
