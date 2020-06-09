import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class DefaultRoute extends Component {

  constructor(props) {
    super(props);
    this.state  = {
      redirect: null
    };
  }

  componentDidMount() {
    if (this.timeForLunch()) {
      this.setState({ redirect: "/resistances" });
    } else {
      this.setState({ redirect: "/restaurants" });
    }
  }

  timeForLunch() {
    return (new Date()).getHours() >= 12
  }

  render() {
    return <Redirect to={this.state.redirect} />
  }
}

export default DefaultRoute;
