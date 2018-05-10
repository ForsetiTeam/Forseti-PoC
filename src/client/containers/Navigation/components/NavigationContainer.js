import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from './Navigation';
import { checkPlugin, getAccount } from '../../../services/metamask';

class NavigationContainer extends Component {
  static propTypes = {
    isLogged: PropTypes.bool
  };

  calcTabs() {
    if (!checkPlugin() || !getAccount()) {
      return [];
    }
    if (this.props.isLogged) {
      return [
        { title: 'Ongoing Disputes', uri: '/dispute/' },
        { title: 'Finished Disputes', uri: '/dispute/finished' },
        { title: 'Log Out', uri: '/logout' }
      ];
    }
    return [
      { title: 'Register', uri: '/register' },
      { title: 'Login', uri: '/login' },
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
