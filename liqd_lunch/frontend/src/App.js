import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'

import  ResistanceList from './ResistanceList'
import  ResistanceCreateUpdate  from './ResistanceCreateUpdate'
import  RestaurantsList from './RestaurantsList'
import  RestaurantCreateUpdate  from './RestaurantCreateUpdate'
import './App.css';

const BaseLayout = () => (
  <div className="container-fluid">
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Django React Demo</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link" href="/">Restaurants</a>
      <a className="nav-item nav-link" href="/restaurant">Create Restaurant</a>
      <a className="nav-item nav-link" href="/resistances">Resistance List</a>
      <a className="nav-item nav-link" href="/resistance">Create Resistance</a>

    </div>
  </div>
</nav>

    <div className="content">
      <Route path="/" exact component={RestaurantsList} />
      <Route path="/restaurant/:pk"  component={RestaurantCreateUpdate} />
      <Route path="/restaurant/" exact component={RestaurantCreateUpdate} />
      <Route path="/resistances/" exact component={ResistanceList} />
      <Route path="/resistance/:pk"  component={ResistanceCreateUpdate} />
      <Route path="/resistance/" exact component={ResistanceCreateUpdate} />

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
