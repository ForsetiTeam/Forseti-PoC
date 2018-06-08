import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../../Navigation';
import { checkPlugin } from '../../../services/metamask';
import NoMetamask from '../../Layer/components/noMetamask';

class Layer extends Component {
  static propTypes = {
    children: PropTypes.node,
    version: PropTypes.string,
    fetchVersion: PropTypes.func,

    isMetamaskLoaded: PropTypes.bool,
    fetchProcessMetamaskAccount: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchVersion();
    this.props.fetchProcessMetamaskAccount();
  }

  render() {
    let page = this.props.children;

    if (!checkPlugin()) {
      page = <NoMetamask />;
    }

    return (
      <div className='Layer'>
        <div className='Layer__sidebar'>
          <div className='Layer__logo' />
          <div className='Layer__tabs'>
            <Navigation />
          </div>
        </div>
        <div className='Layer__center'>
          {page}
          <div className='Layer__footer frsMuted'>
            2018 © Forseti. v{this.props.version || '...'}
          </div>
        </div>
      </div>
    );
  }
}

export default Layer;
