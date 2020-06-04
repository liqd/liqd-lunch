import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import  ResistanceList from './ResistanceList'
import  RestaurantsList from './RestaurantsList'
import  RestaurantCreateUpdate  from './RestaurantCreateUpdate'
import './App.css';

const BaseLayout = () => (
  <div className="container-fluid">
      <div className="d-flex justify-content-center navbar__brand m-2">
        <img className="mr-2" src="images/wobble.png" width="30" height="30" alt="">
        </img>
        <span>Liquid Lunch</span>
      </div>

    <div className="content">
      <Route path="/" exact component={RestaurantsList} />
      <Route path="/restaurant/:pk"  component={RestaurantCreateUpdate} />
      <Route path="/restaurant/" exact component={RestaurantCreateUpdate} />
      <Route path="/resistances/" exact component={ResistanceList} />
    </div>
    <nav className="navbar navbar-default d-flex justify-content-center">
      <div className="navbar">
        <a className="nav-item nav-link" href="/">Restaurants</a>
        <a className="nav-item nav-link" href="/restaurant">Create Restaurant</a>
        <a className="nav-item nav-link" href="/resistances">Resistance List</a>
      </div>
    </nav>

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
