import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAccount } from '../../../services/metamask';

import Register from './Register';

class RegisterContainer extends Component {
  static propTypes = {
    auth: PropTypes.any,
    onSubmit: PropTypes.func,
    onRequestSign: PropTypes.func
  };

  state = {
    email: '',
    poolAddress: '',
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

  handleRequestSign = e => {
    e.preventDefault();
    this.setState({ isSigning: true });
    this.props.onRequestSign('Forseti greets you!')
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
    return !!this.state.email && !!this.state.poolAddress;
  }

  render() {
    return (
      <Register
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onRequestSign={this.handleRequestSign}
        canSubmit={this.isFormValid()}
        isSigning={this.state.isSigning}
        isSigned={!!this.state.sign}
        errors={this.props.auth.error ? this.props.auth.error.errors : null}
      />
    );
  }
}

export default RegisterContainer;
