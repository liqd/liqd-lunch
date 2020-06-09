import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import ResistanceService from './ResistanceService';
import RestaurantsService from './RestaurantsService';

const resistanceService = new ResistanceService();
const restaurantsService = new RestaurantsService();

class RestaurantsList extends Component {

  constructor(props) {
    super(props);
    this.state  = {
      restaurants: [],
      nextPageURL: '',
      resistanceScore: {},
      redirect: null
    };
    this.nextPage = this.nextPage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.getItems = this.getItems.bind(this);
    this.resistanceRef = React.createRef()
    this.itemTimer = null;
  }

  componentDidMount() {
    this.getItems();
    this.itemTimer = setInterval(this.getItems, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.itemTimer)
  }

  getItems () {
    const  self  =  this;
    restaurantsService.getRestaurants().then(function (result) {
      self.setState({
        restaurants: result.data,
        nextPageURL: result.nextlink
      })
    })
  }

  handleDelete(e, pk){
    const self = this
    restaurantsService.deleteRestaurant({pk: pk}).then(function () {
      const newArr = self.state.restaurants.filter(function(obj) {
        return  obj.pk !== pk;
      });

      self.setState({restaurants: newArr})
    });
  }

  handleSliderChange(e, rest_pk) {
    const self = this
    const newResistanceScore = self.state.resistanceScore;
    newResistanceScore[rest_pk] = e.target.value;

    self.setState({
      resistanceScore:  newResistanceScore
    })
  }

  handleFormSubmit(){
    const promiseList = []
    for (const [rest_pk, resistance] of Object.entries(this.state.resistanceScore)) {
      let promise = resistanceService.createResistance({
        "restaurant": rest_pk,
        "resistance": resistance
      });
      promiseList.push(promise)
    }
    Promise.all(promiseList).then((values) => {
      if(this.timeForLunch()) {
        alert('Voting is closed already! Redirecting to result')
      }
      this.setState({ redirect: "/resistances" });
    }).catch(()=>{
      alert('Liquid Lunch is currently offline, please try again when online.');
    });
  }

  nextPage(){
    const self = this;
    console.log(self.state.nextPageURL);
    restaurantsService.getRestaurantsByURL(this.state.nextPageURL).then((result) => {
      self.setState({ restaurants:  result.data, nextPageURL:  result.nextlink})
    });
  }

  timeForLunch() {
    return (new Date()).getHours() >= 12
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div className="restaurants--list row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4">
          {this.state.restaurants.map( c  =>
            <div className="p-3 form-group" key={c.pk}>
              <div className="d-flex justify-content-between">
                <label htmlFor={"restaurant" + c.pk}>{c.name}</label>
                <span>
                  <a className="btn btn-link btn-sm text-muted" href={"/restaurant/" + c.pk}> Update</a>
                  <button className="btn btn-link btn-sm text-muted" onClick={(e)=>  this.handleDelete(e, c.pk) }> Delete</button>
                </span>
              </div>
              <input type="range" ref={this.resistanceRef} className="custom-range mt-2 w-100" defaultValue="0" min="0" max="10" id={"restaurant" + c.pk} onClick={(e)=> this.handleSliderChange(e, c.pk)}></input>
              <div className="d-flex justify-content-between">
                <span>Yeah</span>
                <span>Nope</span>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-end px-3">
            <button className="btn btn-dark text-uppercase ml-auto" type="submit" value="Submit" onClick={this.handleFormSubmit}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantsList;
