import React, { Component } from 'react';
import  RestaurantsService from  './RestaurantsService';

const  restaurantsService  =  new  RestaurantsService();

class RestaurantCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          restaurantsService.getRestaurant(params.pk).then((c)=>{
            this.refs.name.value = c.name;
            this.refs.link.value = c.link;
          })
        }
      }

      handleCreate(){
        restaurantsService.createRestaurant(
          {
            "name": this.refs.name.value,
            "link": this.refs.link.value
        }
        ).then((result)=>{
          alert("Restaurant created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        restaurantsService.updateRestaurant(
          {
            "pk": pk,
            "name": this.refs.name.value,
            "link": this.refs.link.value
        }
        ).then((result)=>{
          console.log(result);
          alert("Restaurant updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Name:</label>
              <input className="form-control" type="text" ref='name' />

            <label>
              Link:</label>
              <input className="form-control" type="text" ref='link'/>

            <input className="btn btn-dark text-uppercase" type="submit" value="Submit" />
            </div>
          </form>
        );
      }
}

export default RestaurantCreateUpdate;
