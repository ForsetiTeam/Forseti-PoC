import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Register from './Register';

class RegisterContainer extends Component {
  static propTypes = {
    currentUser: PropTypes.shape(),
    metamask: PropTypes.shape(),

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
    return !!this.state.email && this.props.metamask.sig;
  }

  render() {
    return (
      <Register
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        canSubmit={this.isFormValid()}
        isSigned={!!this.props.metamask.sig}
        errors={this.props.currentUser.error ? this.props.currentUser.error.errors : null}
      />
    );
  }
}

export default RegisterContainer;
