import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Login from './Login';
import config from '../../../config/config';

class RegisterContainer extends Component {
  static propTypes = {
    curUser: PropTypes.any,
    loadAccount: PropTypes.func,
    requestSig: PropTypes.func,
    login: PropTypes.func
  };

  state = {
    isSigning: false
  };

  componentDidMount() {
    this.getSigAndLogin();
  }

  handleRequestSig = e => {
    e.preventDefault();

    this.getSigAndLogin();
  };

  getSigAndLogin() {
    this.setState({ isSigning: true });

    const sigPhrase = config.get('metamask.sigPhrase');

    this.props.requestSig(sigPhrase)
      .then(sig => {
        this.setState({
          isSigning: false
        });
        this.props.loadAccount()
          .then(account => {
            if (!account) return;
            this.props.login(account, sig);
          });
      })
      .catch(() =>
        this.setState({
          isSigning: false
        })
      );
  }

  render() {
    return (
      <Login
        curUser={this.props.curUser}
        onRequestSig={this.handleRequestSig}
        isSigning={this.state.isSigning}
      />
    );
  }
}

export default RegisterContainer;
