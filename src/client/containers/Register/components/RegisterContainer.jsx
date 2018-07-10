import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Register from './Register';

class RegisterContainer extends Component {
  static propTypes = {
    currentUser: PropTypes.shape(),
    metamask: PropTypes.shape(),
    isMetamaskInstalled: PropTypes.bool,

    onSubmit: PropTypes.func,
    fetchRequestSig: PropTypes.func,

    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  state = {
    email: ''
  };

  componentWillUpdate(newProps) {
    if (this.props.metamask.account !== newProps.metamask.account) {
      this.props.fetchRequestSig();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      account: this.props.metamask.account,
      sig: this.props.metamask.sig
    };

    this.props.onSubmit(user);
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };

  isFormValid() {
    return !!this.state.email && !!this.props.metamask.sig && this.props.isMetamaskInstalled;
  }

  render() {
    const user = this.props.currentUser;
    const error = user.validatorError && user.validatorError.account ?
      `${user.error}: ${user.validatorError.account.msg}` :
      user.error;

    return (
      <Register
        isLoginFailed={user.loginFailed}
        isSigned={!!this.props.metamask.sig}
        isMetamaskInstalled={this.props.isMetamaskInstalled}
        error={error}
        canSubmit={this.isFormValid()}

        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default RegisterContainer;
