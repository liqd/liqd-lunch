import  React, { Component } from  'react';
import  ResistanceService from  './ResistanceService';

const resistanceService  =  new  ResistanceService();

class  ResistanceList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            resistances: [],
            nextPageURL:  '',
            showResult: this.timeForLunch()
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.setShowResult = this.setShowResult.bind(this);
        this.timer = null;
    }

    componentDidMount() {
        var  self  =  this;
        resistanceService.getResistances().then(function (result) {
            self.setState({ resistances:  result.data.sort((a,b) => a.total_resistance - b.total_resistance), nextPageURL:  result.nextlink})
        });
        this.timer = setInterval(this.setShowResult, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
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

    timeForLunch() {
      var now = new Date();
      if (now.getHours() >= 12) {
        return (true)
      }
      else {
        return (false)
      }
    }

    setShowResult() {
      this.setState({showResult: this.timeForLunch()})
    }

    render() {
        var minResistanceValue = Math.min.apply(Math, this.state.resistances.map(function(r) { return r.total_resistance; }))
        var minResistances = this.state.resistances.filter(function(r){ return r.total_resistance === minResistanceValue })

        var content;
        if (this.state.showResult) {
              content =     <div className="restaurants--list">
                                <span className="text-muted">We are going to</span>
                                {minResistances.map( c  =>
                                <div className="row justify-content-center" key={c.pk}>
                                    <h2>{c.name}</h2>
                                </div>)}
                            </div>
        }
        else {
              content =     <div className="col-sm-8 col-md-6 col-lg-4">
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
                                {this.state.nextPageURL === '' &&
                                <div className="d-flex justify-content-end">
                                    <button  className="btn btn-dark text-uppercase"  onClick=  {  this.nextPage  }>Next</button>
                                </div>
                                }
                            </div>
        }

        return (
            <div className="restaurants--list row justify-content-center">
            {content}
            </div>
        );
    }
}

export  default  ResistanceList;
