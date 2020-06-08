import  React, { Component } from  'react';
import  ResistanceService from  './ResistanceService';
import  RestaurantsService from  './RestaurantsService';

const  resistanceService  =  new  ResistanceService();
const  restaurantsService  =  new  RestaurantsService();

class  RestaurantsList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            restaurants: [],
            nextPageURL:  '',
            resistanceScore: {}
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
        this.handleFormSubmit  =  this.handleFormSubmit.bind(this);
        this.resistanceRef = React.createRef()
    }

    componentDidMount() {
        var  self  =  this;
        if (this.timeForLunch()) {
          if (window.confirm('Voting is closed, it is LUNCH TIME! See the result?')) {
            window.location.href = "/resistances";
          }
        }
        restaurantsService.getRestaurants().then(function (result) {
            self.setState({
              restaurants:  result.data,
              nextPageURL:  result.nextlink,
            })
        });
    }

    handleDelete(e, pk){
        var  self  =  this;
        restaurantsService.deleteRestaurant({pk :  pk}).then(()=>{
            var  newArr  =  self.state.restaurants.filter(function(obj) {
                return  obj.pk  !==  pk;
            });

            self.setState({restaurants:  newArr})
        });
    }

    handleSliderChange(e, rest_pk) {
      var newResistanceScore = this.state.resistanceScore;
      newResistanceScore[rest_pk] = e.target.value;

      this.setState({
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
        alert('Success');
        window.location.href = "/resistances";
      }).catch(()=>{
        alert('Liquid Lunch is currently offline, please try again when online.');
      });
    }

    nextPage(){
        var  self  =  this;
        console.log(this.state.nextPageURL);
        restaurantsService.getRestaurantsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ restaurants:  result.data, nextPageURL:  result.nextlink})
        });
    }

    timeForLunch() {
      return (new Date()).getHours() >= 12
    }

    render() {

        return (
            <div className="restaurants--list row justify-content-center">
              <div className="col-sm-8 col-md-6 col-lg-4">
                {this.state.restaurants.map( c  =>
                    <div className="py-3 form-group" key={c.pk}>
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
                    </div>)}
                    <div className="d-flex justify-content-end">
                      <button className="btn btn-dark text-uppercase ml-auto" type="submit" value="Submit" onClick={this.handleFormSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export  default  RestaurantsList;
