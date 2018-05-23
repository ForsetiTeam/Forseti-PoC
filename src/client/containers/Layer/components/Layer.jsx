import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../../Navigation';
import TopBar from '../../TopBar';
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
          <div className='Layer__tabs'>
            <Navigation />
          </div>
          <div className='Layer__version'>V {this.props.version || '...'}</div>
        </div>
        <div className='Layer__topbar'>
          <TopBar />
        </div>
        <div className='Layer__content border'>
          <div className='p-3'>
            {page}
          </div>
        </div>

      </div>
    );
  }
}

export default Layer;
