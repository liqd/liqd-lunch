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
    }

    componentDidMount() {
        var  self  =  this;
        resistanceService.getResistances().then(function (result) {
            self.setState({ resistances:  result.data, nextPageURL:  result.nextlink})
        });
    }

    nextPage(){
        var  self  =  this;
        resistanceService.getResistancesByURL(this.state.nextPageURL).then((result) => {
            self.setState({ resistances:  result.data, nextPageURL:  result.nextlink})
        });
    }

    render() {

        return (
            <div className="restaurants--list row justify-content-center">
              <div className="col-sm-8 col-md-6 col-lg-4">
                <div className="py-3 d-flex justify-content-between">
                  <span>Restaurant</span>
                  <span className="ml-auto">Total Resistance</span>
                </div>
                {this.state.resistances.map( c  =>
                  <div className="py-3 d-flex justify-content-between" key={c.pk}>
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
