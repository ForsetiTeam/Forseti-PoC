import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from "prop-types";

class PrivateRoute extends Component {
  static propTypes = {
    path: PropTypes.string,
    component: PropTypes.any,
    isLogged: PropTypes.bool
  };

  render() {
    if (this.props.isLogged) {
      return <Route path={this.props.path} component={this.props.component} />;
    }
    return <Redirect from={this.props.path} to={'/'} />;
  }
}

export default PrivateRoute;
