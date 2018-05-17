import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from './Navigation';
import { checkPlugin, getAccount } from '../../../services/metamask';
import { DISPUTE_FILTER_MY, DISPUTE_FILTER_OPEN, DISPUTE_FILTER_CLOSED } from '../../../roterConsts';

class NavigationContainer extends Component {
  static propTypes = {
    isMetamaskLoaded: PropTypes.bool,
    isLogged: PropTypes.bool
  };

  calculateTabs() {
    if (!checkPlugin() || !this.props.isMetamaskLoaded || !getAccount()) {
      return [];
    }
    if (this.props.isLogged) {
      return [
        { title: 'Communities', uri: '/community/' },
        { title: 'My Disputes', uri: `/dispute/filter/${DISPUTE_FILTER_MY}` },
        { title: 'Ongoing Disputes', uri: `/dispute/filter/${DISPUTE_FILTER_OPEN}` },
        { title: 'Finished Disputes', uri: `/dispute/filter/${DISPUTE_FILTER_CLOSED}` }
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
