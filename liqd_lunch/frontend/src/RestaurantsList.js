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
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
        this.handleResistanceCreate  =  this.handleResistanceCreate.bind(this);
        this.resistanceRef = React.createRef()
    }

    componentDidMount() {
        var  self  =  this;
        restaurantsService.getRestaurants().then(function (result) {
            self.setState({
              restaurants:  result.data,
              nextPageURL:  result.nextlink,
            })
        });
    }

    handleDelete(e,pk){
        var  self  =  this;
        restaurantsService.deleteRestaurant({pk :  pk}).then(()=>{
            var  newArr  =  self.state.restaurants.filter(function(obj) {
                return  obj.pk  !==  pk;
            });

            self.setState({restaurants:  newArr})
        });
    }

    handleResistanceCreate(e,rest_pk){
        //var  self  =  this;
        resistanceService.createResistance(
          {
            "restaurant": rest_pk,
            "resistance": e.target.value
        }
        ).then((result)=>{
          '';
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
    }

    nextPage(){
        var  self  =  this;
        console.log(this.state.nextPageURL);
        restaurantsService.getRestaurantsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ restaurants:  result.data, nextPageURL:  result.nextlink})
        });
    }

    render() {

        return (
            <div className="restaurants--list row justify-content-center">
              <div className="col-sm-8 col-md-6 col-lg-4">
                <form onSubmit={this.handleResistanceCreate}>
                {this.state.restaurants.map( c  =>
                    <div className="py-3 form-group" key={c.pk}>
                        <div className="d-flex justify-content-between">
                            <label htmlFor={"restaurant" + c.pk}>{c.name}</label>
                            <button className="btn btn-link" onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                            <a className="btn btn-link" href={"/restaurant/" + c.pk}> Update</a>
                        </div>
                        <input type="range" ref='resistance' className="custom-range w-100" defaultValue="0" min="0" max="10" id={"restaurant" + c.pk} onClick={(e)=>  this.handleResistanceCreate(e,c.pk) }></input>
                        <div className="d-flex justify-content-between">
                          <span>Nope</span>
                          <span>Yeah</span>
                        </div>
                    </div>)}
                    <input className="btn btn-primary" type="submit" value="Submit" />
                  </form>
                </div>
            </div>
        );
    }
}

export  default  RestaurantsList;
