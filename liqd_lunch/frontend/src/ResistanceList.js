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

    nextPage() {
        var  self  =  this;
        resistanceService.getResistancesByURL(this.state.nextPageURL).then((result) => {
            self.setState({ resistances:  result.data, nextPageURL:  result.nextlink})
        });
    }

    loadSpinner() {
      var spinner
      if (false) {
        spinner = <div className="pl-1 pt-1"><div className="loader"></div></div>
      }
      return (
        spinner
      )
    }

    render() {

        return (
            <div className="restaurants--list row justify-content-center">
              <div className="col-sm-8 col-md-6 col-lg-4">
                <h1>Here you go!</h1>
                <div className="py-3 d-flex justify-content-between">
                  <span className="text__md">Restaurant</span>
                  <span className="ml-auto text__md">Total Resistance</span>
                  { this.loadSpinner() }
                </div>
                {this.state.resistances.map( c  =>
                  <div className="py-3 d-flex justify-content-between" key={c.pk}>
                    <span>{c.name}</span>
                    <span>{c.total_resistance}</span>
                  </div>)}
                  {this.state.nextPageURL == '' &&
                  <div className="d-flex justify-content-end">
                    <button  className="btn btn-dark text-uppercase"  onClick=  {  this.nextPage  }>Next</button>
                  </div>
                }
              </div>
            </div>
        );
    }
}

export  default  ResistanceList;
