import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import  ResistanceList from './ResistanceList'
import  RestaurantsList from './RestaurantsList'
import  RestaurantCreateUpdate  from './RestaurantCreateUpdate'
import './App.css';

const BaseLayout = () => (
  <div className="container-fluid">
    <nav className="navbar navbar-default">
      <a className="navbar-brand" href="/"><img src="images/wobble.png" width="30" height="30" alt=""></img>Liquid Lunch</a>
      <div className="navbar">
        <a className="nav-item nav-link" href="/">Restaurants</a>
        <a className="nav-item nav-link" href="/restaurant">Create Restaurant</a>
        <a className="nav-item nav-link" href="/resistances">Resistance List</a>
      </div>
    </nav>

    <div className="content">
      <Route path="/" exact component={RestaurantsList} />
      <Route path="/restaurant/:pk"  component={RestaurantCreateUpdate} />
      <Route path="/restaurant/" exact component={RestaurantCreateUpdate} />
      <Route path="/resistances/" exact component={ResistanceList} />
    </div>

  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout/>
      </BrowserRouter>
    );
  }
}

export default App;
