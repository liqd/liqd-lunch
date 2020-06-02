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
            <div className="restaurants--list">
                <table className="table">
                <thead key="thead">
                <tr>
                    <th>#</th>
                    <th>Restaurant</th>
                    <th>Resistance</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.state.resistances.map( c  =>
                    <tr  key={c.pk}>
                    <td>{c.pk}  </td>
                    <td>{c.restaurant}</td>
                    <td>{c.resistance}</td>
                    <td>{c.created}</td>
                    <td>
                    <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                    <a  href={"/resistance/" + c.pk}> Update</a>
                    </td>
                </tr>)}
                </tbody>
                </table>
                <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
            </div>
        );
    }
}

export  default  ResistanceList;
