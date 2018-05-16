import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from './Navigation';
import { checkPlugin } from '../../../services/metamask';

class NavigationContainer extends Component {
  static propTypes = {
    isMetamaskLoaded: PropTypes.bool,
    isLogged: PropTypes.bool
  };

  calculateTabs() {
    if (!checkPlugin() || !this.props.isMetamaskLoaded) {
      return [];
    }
    if (this.props.isLogged) {
      return [
        { title: 'Communities', uri: '/community/' },
        { title: 'My Disputes', uri: '/dispute/filter/my' },
        { title: 'Ongoing Disputes', uri: '/dispute/filter/open' },
        { title: 'Finished Disputes', uri: '/dispute/filter/closed' }
      ];
    }
    return [
      { title: 'Register', uri: '/register' },
      { title: 'Login', uri: '/login' },
      { title: 'About', uri: '/about' }
    ];
  }

  render() {
    const tabs = this.calculateTabs();

    return (
      <Navigation tabs={tabs} />
    );
  }
}

export default NavigationContainer;
