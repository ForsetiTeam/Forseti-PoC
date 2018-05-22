import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAccount } from '../../../services/metamask';

import Register from './Register';
import config from '../../../config/config';

class RegisterContainer extends Component {
  static propTypes = {
    currentUser: PropTypes.shape(),
    onSubmit: PropTypes.func,
    onRequestSig: PropTypes.func,

    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  state = {
    email: '',
    sign: false,
    isSigning: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      account: getAccount(),
      sign: this.state.sign
    };

    this.props.onSubmit(user);
  };

  handleRequestSig = e => {
    e.preventDefault();
    this.setState({ isSigning: true });

    const sigPhrase = config.get('metamask.sigPhrase');

    this.props.onRequestSig(sigPhrase)
      .then(sign =>
        this.setState({
          sign,
          isSigning: false
        })
      )
      .catch(() =>
        this.setState({
          isSigning: false
        })
      );
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };

  isFormValid() {
    return !!this.state.email;
  }

  render() {
    return (
      <Register
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onRequestSig={this.handleRequestSig}
        canSubmit={this.isFormValid()}
        isSigning={this.state.isSigning}
        isSigned={!!this.state.sign}
        errors={this.props.currentUser.error ? this.props.currentUser.error.errors : null}
      />
    );
  }
}

export default RegisterContainer;
