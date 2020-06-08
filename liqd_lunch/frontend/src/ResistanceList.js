import  React, { Component } from  'react';
import  ResistanceService from  './ResistanceService';

const resistanceService  =  new  ResistanceService();

class  ResistanceList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            resistances: [],
            nextPageURL:  '',
            showResult: this.timeForLunch(),
            pollingPaused: false,
            isLoading: false
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.setShowResult = this.setShowResult.bind(this);
        this.timer = null;
    }

    componentDidMount() {
        this.getItems()
        this.timer = setInterval(() => this.getItems(), 5000)
        this.timer = setInterval(this.setShowResult, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    nextPage() {
        const  self  =  this;
        resistanceService.getResistancesByURL(this.state.nextPageURL).then((result) => {
            self.setState({ resistances:  result.data, nextPageURL:  result.nextlink})
        });
    }

    getItems () {
      this.setState({ isLoading: true})
      const  self  =  this;
      if (!this.state.pollingPaused) {
        resistanceService.getResistances().then(function (result) {
          self.setState({
            resistances:  result.data,
            nextPageURL:  result.nextlink,
            isLoading: false
          })
        })
      }
    }

    loadSpinner() {
      let spinner
      if (this.state.isLoading) {
        spinner = <div className="loader__position pt-1"><span className="sr-only">Loading...</span><div className="loader"></div></div>
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
        let minResistanceValue = Math.min.apply(Math, this.state.resistances.map(function(r) { return r.total_resistance; }))
        let minResistances = this.state.resistances.filter(function(r){ return r.total_resistance === minResistanceValue })

        let content
        if (this.state.showResult) {
              content =     <div className="restaurants__winner my-5">
                              <div className="row justify-content-center my-3">
                                <div className="checkmark">
                                    <div className="checkmark_stem"></div>
                                    <div className="checkmark_kick"></div>
                                </div>
                              </div>

                                <div className="text__md text-muted">We are going to</div>
                                {minResistances.map( c  =>
                                <div className="row justify-content-center" key={c.pk}>
                                    <h2>{c.name}</h2>
                                </div>)}
                            </div>
        }
        else {
              content =     <div className="col-sm-8 col-md-6 col-lg-4">
                                <h1 className="p-3">Here you go!</h1>
                                <div className="p-3 d-flex justify-content-between">
                                    <span className="text__md">Restaurant</span>
                                    <span className="ml-auto text__md">Total Resistance</span>
                                    { this.loadSpinner() }
                                </div>
                                {this.state.resistances.map( c  =>
                                <div className="p-3 d-flex justify-content-between" key={c.pk}>
                                    <span>{c.name}</span>
                                    <span>{c.total_resistance}</span>
                                </div>)}
                                {this.state.nextPageURL === '' &&
                                <div className="d-flex justify-content-end p-3">
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
