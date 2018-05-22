import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../../Navigation';
import { checkPlugin, getAccount } from '../../../services/metamask';
import { getToken } from '../../../services/localStore';
import NoMetamask from '../../Layer/components/noMetamask';
import NoMetamaskAccount from '../../Layer/components/noMetamaskAccount';

class Layer extends Component {
  static propTypes = {
    children: PropTypes.node,
    version: PropTypes.string,
    fetchVersion: PropTypes.func,

    isMetamaskLoaded: PropTypes.bool,
    fetchLogin: PropTypes.func,
    fetchLoadMetamask: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchVersion();
    this.props.fetchLoadMetamask();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isMetamaskLoaded) return;
    const account = getAccount();
    const token = getToken();

    if (account && token) {
      this.props.fetchLogin(account, token);
    }
  }

  render() {
    console.log('LOADED', this.props.isMetamaskLoaded);

    let page = this.props.children;

    if (!checkPlugin()) {
      page = <NoMetamask />;
    } else if (!getAccount()) {
      page = <NoMetamaskAccount />;
    }

    return (
      <div className='Layer'>
        <div className='Layer__sidebar'>
          <div className='Layer__tabs'>
            <Navigation />
          </div>
          <div className='Layer__version'>V {this.props.version || '...'}</div>
        </div>
        <div className='Layer__content border p-3'>
          {page}
        </div>

      </div>
    );
  }
}

export default Layer;
