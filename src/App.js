import React, { Component } from 'react';
import './App.css';
import Explore from './Component/explore';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-nav">
          <div className="App-nav-content">
            <div><span></span></div>
            <div><a href="/" className="logo">MY COLLECTION</a></div>
            <ul className="menu-nav">
              <li><a href="/">You</a></li>
              <li><a href="/">Explore</a></li>
              <li><a href="/">Create</a></li>
              <li><a href="/">Get Pro</a></li>
            </ul>
            <ul className="tool-nav">
              <li><a href="/">Login</a></li>
              <li><a href="/">Sign up</a></li>
            </ul>
          </div>
        </div>
        <div className="App-main">
          <div className="title"><h2>Explore</h2></div>
          <Explore />
        </div>
      </div>
    );
  }
}

export default App;