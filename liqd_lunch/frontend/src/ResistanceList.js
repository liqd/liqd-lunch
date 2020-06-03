import  React, { Component } from  'react';
import  ResistanceService from  './ResistanceService';

const  resistanceService  =  new  ResistanceService();

class  ResistanceList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            resistances: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }

    componentDidMount() {
        var  self  =  this;
        resistanceService.getResistances().then(function (result) {
            console.log(result);
            self.setState({ resistances:  result.data, nextPageURL:  result.nextlink})
        });
    }

    handleDelete(e,pk){
        var  self  =  this;
        resistanceService.deleteResistance({pk :  pk}).then(()=>{
            var  newArr  =  self.state.resistances.filter(function(obj) {
                return  obj.pk  !==  pk;
            });

            self.setState({resistances:  newArr})
        });
    }

    nextPage(){
        var  self  =  this;
        console.log(this.state.nextPageURL);
        resistanceService.getResistancesByURL(this.state.nextPageURL).then((result) => {
            self.setState({ resistances:  result.data, nextPageURL:  result.nextlink})
        });
    }

    render() {

        return (
            <div className="restaurants--list row justify-content-center">
              <div className="col-sm-8 col-md-6 col-lg-4">
                <div class="py-3 d-flex justify-content-between">
                  <span>Restaurant</span>
                  <span class="ml-auto">Total Resistance</span>
                </div>
                {this.state.resistances.map( c  =>
                  <div class="py-3 d-flex justify-content-between" key={c.pk}>
                    <span>{c.name}</span>
                    <span>{c.total_resistance}</span>
                  </div>)}
                <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
              </div>
            </div>
        );
    }
}

export  default  ResistanceList;
