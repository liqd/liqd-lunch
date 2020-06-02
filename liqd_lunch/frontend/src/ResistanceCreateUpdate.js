import React, { Component } from 'react';
import  ResistanceService from  './ResistanceService';

const  resistanceService  =  new  ResistanceService();

class ResistanceCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          resistanceService.getResistance(params.pk).then((c)=>{
            this.refs.restaurant.value = c.restaurant;
            this.refs.resistance.value = c.resistance;
          })
        }
      }

      handleCreate(){
        resistanceService.createResistance(
          {
            "restaurant": this.refs.restaurant.value,
            "resistance": this.refs.resistance.value
        }
        ).then((result)=>{
          alert("Resistance created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        resistanceService.updateResistance(
          {
            "pk": pk,
            "restaurant": this.refs.restaurant.value,
            "resistance": this.refs.resistance.value
        }
        ).then((result)=>{
          console.log(result);
          alert("Resistance updated!");
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
              Restaurant:</label>
              <input className="form-control" type="text" ref='restaurant' />

            <label>
              Resistance:</label>
              <input className="form-control" type="text" ref='resistance'/>

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }
}

export default ResistanceCreateUpdate;
