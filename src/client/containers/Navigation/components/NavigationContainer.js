import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from './Navigation';

class NavigationContainer extends Component {
  static propTypes = {
    auth: PropTypes.any
  };

  calcTabs() {
    if (this.props.auth.loaded) {
      return [
        { title: 'Ongoing Disputes', uri: '/dispute/' },
        { title: 'Finished Disputes', uri: '/dispute/finished' },
        { title: 'Log Out', uri: '/logout' }
      ];
    }
    return [
      { title: 'Register', uri: '/register' },
      { title: 'Sign Up', uri: '/login' },
      { title: 'About', uri: '/about' }
    ];
  }

  render() {
    const tabs = this.calcTabs();

    return (
      <Navigation tabs={tabs} />
    );
  }
}

export default NavigationContainer;
