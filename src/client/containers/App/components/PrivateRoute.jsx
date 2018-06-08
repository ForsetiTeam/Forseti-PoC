import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkPlugin } from '../../../services/metamask';
import { getUser } from '../../../services/localStore';

class PrivateRoute extends Component {
  static propTypes = {
    path: PropTypes.string,
    component: PropTypes.any
  };

  render() {
    const isLogged = checkPlugin() && !!getUser();
    // const isMetamaskLoaded = !!window.web3.eth.coinbase;

    if (isLogged) {
      return <Route path={this.props.path} component={this.props.component}/>;
    }
    return <Redirect from={this.props.path} to={'/'} />;
  }
}

export default PrivateRoute;
