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
import Skeeball from '../../scenes/skeeball';

import Snacks from '../../components/snacks';
import Alerts from '../../components/alerts';
import PowerBar from '../../components/powerBar';
import RightDrawer from '../../components/drawer';
import StepperGuide from '../../components/stepperGuide';


// import modelJSON from '../../3dcomponents/marmelab.json';

OBJLoader(THREE);


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.snack = React.createRef();
        this.stepper = React.createRef();
        this.powerBar = React.createRef();

        this.state ={showPower: false}
    }

    ballReport = (msg) => {
        console.log(msg);
        // console.log(this);
        this.snack.messageFromAbove(msg);
        // this.snack.handleClick('Ball Created');

    }

    stepComplete = (step) => {
        // console.log("One small step..." + step);

        switch (step) {

            case 0:

                break;
            case 1: 
            
                break;
            case 2:
                this.powerBar.showPower();
                // alert("showPower!");

                break;

            case 3: 

                break;
            default:
                console.log("default step?")
                break;
        }


        this.stepper.actionFromAbove(step);
    }



    render() {
        const isPower = this.state.showPower;


        return (
            <div className="App">
                {/* <Mountain ballWasMade={this.ballReport} onRef={ref => (this.mountain = ref)}/> */}
                <Skeeball ballWasMade={this.ballReport} actionCompleted={this.stepComplete} onRef={ref => (this.skeeball = ref)} />
                <Snacks onRef={ref => (this.snack = ref)} />
                <Alerts />



                <header className="App-header">
                    <RightDrawer />

                    {/* <h1 className="App-title"></h1> */}

                </header>
                <div id="PowerBar">

                <PowerBar onRef={ref => (this.powerBar = ref)}/>
                </div>
                    
               


                <div id="whs"></div>
                <div id="bottomContainer" style={{width: '100vw'}}>

                    <StepperGuide onRef={ref => (this.stepper = ref)} />
                </div>


            </div>
        );
    }
}
