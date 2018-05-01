import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import HomePage from './pages/home/';

import 'typeface-roboto';


const Home = () =>  <HomePage /> 


export default class App extends Component {
  render() {
    return (
      <Router onUpdate={() => window.scrollTo(0, 0)} >
        <div className="App">
        
          <Route exact path="/" component={Home} />


        </div>
      </Router>
    );
  }
}
