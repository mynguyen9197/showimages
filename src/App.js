import React, { Component } from 'react';
import Explore from './Component/explore';
import Tag from './Component/search';
import Photo from './Component/photo';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Explore} />
      <Route path="/search" component={Tag} />
      <Route path="/photo/:farm/:server/:id/:secret/:author/:title/:view" component={Photo} />
    </div>
  </Router>
)
export default App;