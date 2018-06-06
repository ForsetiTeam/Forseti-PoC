import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from './Navigation';

class NavigationContainer extends Component {
  static propTypes = {
    isMetamaskLoaded: PropTypes.bool,
    isLogged: PropTypes.bool
  };

  render() {
    return (
      <Navigation isLogged={this.props.isLogged} />
    );
  }
}

export default NavigationContainer;
