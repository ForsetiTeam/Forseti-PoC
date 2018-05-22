import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from './Navigation';
import { DISPUTE_FILTER_MY, DISPUTE_FILTER_OPEN, DISPUTE_FILTER_CLOSED } from '../../../consts';

class NavigationContainer extends Component {
  static propTypes = {
    isMetamaskLoaded: PropTypes.bool,
    isLogged: PropTypes.bool
  };

  calculateTabs() {
    if (this.props.isLogged) {
      return [
        { title: 'Communities', uri: '/community/' },
        { title: 'My Disputes', uri: `/dispute/filter/${DISPUTE_FILTER_MY}` },
        { title: 'Ongoing Disputes', uri: `/dispute/filter/${DISPUTE_FILTER_OPEN}` },
        { title: 'Finished Disputes', uri: `/dispute/filter/${DISPUTE_FILTER_CLOSED}` },
        { title: 'About', uri: '/about' }
      ];
    }
    return [
      { title: 'Register', uri: '/register' },
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
