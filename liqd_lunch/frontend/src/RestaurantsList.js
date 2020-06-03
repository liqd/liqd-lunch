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
            resistanceScore: 0,
            resistanceList: []
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
        this.handleResistanceCreate  =  this.handleResistanceCreate.bind(this);
        this.handleResistanceSubmit  =  this.handleResistanceSubmit.bind(this);
    }

    componentDidMount() {
        var  self  =  this;
        restaurantsService.getRestaurants().then(function (result) {
            console.log(result);
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

    handleResistanceCreate(e) {
      this.setState({
        resistanceScore: e.target.value
      })
      var newArray = this.state.resistanceList.slice();
      newArray.push(this.state.resistanceScore);

      this.setState({
        resistanceList: newArray
      })
    }

    handleResistanceSubmit(e,rest_pk){
        resistanceService.createResistance(
          {
            "restaurant": rest_pk,
            "resistance": this.state.resistanceList
        }
        ).then((result)=>{
          'Your answers were submitted successfully!';
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
                        <input type="range" ref='resistance' className="custom-range w-100" defaultValue="0" min="0" max="10" id={"restaurant" + c.pk} onClick={this.handleResistanceCreate.bind(this)}></input>
                        <div className="d-flex justify-content-between">
                          <span>Nope</span>
                          <span>Yeah</span>
                        </div>
                    </div>)}
                    <input className="btn btn-primary" type="submit" value="Submit" onClick={this.handleResistanceSubmit.bind(this)} />
                  </form>
                </div>
            </div>
        );
    }
}

export  default  RestaurantsList;
