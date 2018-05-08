import React, { Component } from 'react';

import * as WHS from 'whs';
import * as THREE from 'three';

import * as OBJLoader from 'three-obj-loader';
import * as PHYSICS from 'physics-module-ammonext';
import * as UTILS from '../component/utils';
import * as MtnModels from '../3dcomponents/mtnModels';
import * as MtnLights from '../3dcomponents/mtnLights';

ObjLoader(THREE);

let app = {}
	camera = {},
	orbitControls = {};

export default class Skeeball extends Component {

	constructor(props){
		super(props);
		this.PlaySkeeball = this.PlaySkeeball.bind(this);
	}

	componentDidMount() {
		this.PlaySkeeball();
		this.props.onRef(this);
	}
	
	componentWillUnmount() {	
		this.props.onRef(this);	
	}

	componentDidUpdate() {
		this.PlaySkeeball();
	}

	PlaySkeeball() {
		
		// init app
		
		// create static models

		// create balls

		// click listeners for balls 
	
		// collision listeners for holes 

		// shooting steps 

		// scorekeeping 

		// reset game

		// 2 player keyboard mode
		
		// loops

		// app start
	}
	
	render() {
		return(<span></span>);
	}
}
