import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../../Navigation';

class Layer extends Component {
  static propTypes = {
    children: PropTypes.node,
    version: PropTypes.string,
    fetchVersion: PropTypes.func,

    isLogged: PropTypes.bool,
    isMetamaskLoaded: PropTypes.bool,
    fetchProcessMetamaskAccount: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchVersion();
    this.props.fetchProcessMetamaskAccount();
  }

  render() {
    if (this.props.isLogged) {
      return (
        <div className='Layer'>
          <div className='Layer__sidebar'>
            <a href='https://forseti.im/' target='_blank'>
              <div className='Layer__logo' />
            </a>
            <div className='Layer__tabs'>
              <Navigation />
            </div>
          </div>
          <div className='Layer__center'>
            {this.props.children}
            <div className='Layer__footer text-muted'>
              2018 © Forseti. v{this.props.version || '...'}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default Layer;
