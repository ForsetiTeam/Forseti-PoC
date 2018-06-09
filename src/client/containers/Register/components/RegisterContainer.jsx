import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Register from './Register';

class RegisterContainer extends Component {
  static propTypes = {
    currentUser: PropTypes.shape(),
    metamask: PropTypes.shape(),
    isMetamaskInstalled: PropTypes.bool,

    onSubmit: PropTypes.func,
    onRequestSig: PropTypes.func,

    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  state = {
    email: ''
  };

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
    console.log('this.props.currentUser.error', this.props.currentUser.error);
    return (
      <Register
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        canSubmit={this.isFormValid()}
        isSigned={!!this.props.metamask.sig}
        isMetamaskInstalled={this.props.isMetamaskInstalled}
        error={this.props.currentUser.error}
      />
    );
  }
}

export default RegisterContainer;
