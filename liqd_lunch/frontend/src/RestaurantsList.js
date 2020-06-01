import  React, { Component } from  'react';
import  RestaurantsService from  './RestaurantsService';

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
    }

    componentDidMount() {
        var  self  =  this;
        restaurantsService.getRestaurants().then(function (result) {
            console.log(result);
            self.setState({ restaurants:  result.data, nextPageURL:  result.nextlink})
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

    nextPage(){
        var  self  =  this;
        console.log(this.state.nextPageURL);
        restaurantsService.getRestaurantsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ restaurants:  result.data, nextPageURL:  result.nextlink})
        });
    }

    render() {

        return (
            <div className="restaurants--list">
                <table className="table">
                <thead key="thead">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Link</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.state.restaurants.map( c  =>
                    <tr  key={c.pk}>
                    <td>{c.pk}  </td>
                    <td>{c.name}</td>
                    <td>{c.link}</td>
                    <td>
                    <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                    <a  href={"/restaurant/" + c.pk}> Update</a>
                    </td>
                </tr>)}
                </tbody>
                </table>
                <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
            </div>
        );
    }
}

export  default  RestaurantsList;
