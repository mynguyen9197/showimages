import React, { Component } from 'react';
import Explore from './Component/explore';
import Tag from './Component/search';
import Photo from './Component/photo';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Explore} />
      <Route exact path="/photo/:id" component={Photo} />
      <Route exact path="/search/:tag" component={Tag} />
      <Route exact path="/search/" component={Tag} />
    </div>
  </Router>
)
export default App;