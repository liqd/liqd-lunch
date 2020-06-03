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
        resistanceService.getResistancesByURL(this.state.nextPageURL).then((result) => {
            self.setState({ resistances:  result.data, nextPageURL:  result.nextlink})
        });
    }

    render() {

        return (
            <div className="restaurants--list">
                <table className="table">
                <thead key="thead">
                <tr>
                    <th>Restaurant</th>
                    <th>Total Resistance</th>
                </tr>
                </thead>
                <tbody>
                {this.state.resistances.map( c  =>
                    <tr  key={c.pk}>
                    <td>{c.name}  </td>
                    <td>{c.total_resistance}</td>
                </tr>)}
                </tbody>
                </table>
                <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
            </div>
        );
    }
}

export  default  ResistanceList;
