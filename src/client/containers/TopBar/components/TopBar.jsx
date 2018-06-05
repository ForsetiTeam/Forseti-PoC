import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TopBar extends Component {
  static propTypes = {
    hasPlugin: PropTypes.bool,
    account: PropTypes.string,
    loading: PropTypes.bool,
    sig: PropTypes.string,

    isLogging: PropTypes.bool,
    isLogged: PropTypes.bool,
    logginError: PropTypes.string,

    onSign: PropTypes.func
  };

  render() {
    if (!this.props.hasPlugin) return <span className='text-danger'>Metamask plugin not found</span>;

    const accountMessage = this.props.account || <span className='text-danger'>MetaMask account not selected</span>;

    let sigMessage = '';

    if (this.props.sig) sigMessage = 'received';
    else if (this.props.loading) sigMessage = 'waiting';
    else sigMessage = <button onClick={this.props.onSign}>Sign</button>;

    let userMessage = 'not done';

    if (this.props.isLogged) userMessage = 'done';
    if (this.props.isLogging) userMessage = 'waiting';
    if (this.props.logginError) userMessage = this.props.logginError;

    return (
      <div>
        <div>Account: {accountMessage}</div>
        <div>Signature: {sigMessage}</div>
        <div>Login: {userMessage}</div>
      </div>
    );
  }
}

export default TopBar;
