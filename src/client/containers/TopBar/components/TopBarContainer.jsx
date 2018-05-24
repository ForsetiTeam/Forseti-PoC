import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TopBar from './TopBar';

class TopBarContainer extends Component {
  static propTypes = {
    hasPlugin: PropTypes.bool,
    metamask: PropTypes.shape(),
    currentUser: PropTypes.shape(),
    fetchRequestSig: PropTypes.func
  };

  handleRequestSig = e => {
    e.preventDefault();
    this.props.fetchRequestSig();
  };

  render() {
    return (
      <TopBar
        hasPlugin={this.props.hasPlugin}
        {...this.props.metamask}
        isLogging={this.props.currentUser.loading}
        isLogged={!!this.props.currentUser.user}
        logginError={this.props.currentUser.error}
        onSign={this.handleRequestSig}
      />
    );
  }
}

export default TopBarContainer;
