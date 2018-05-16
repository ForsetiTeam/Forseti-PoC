import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpinnerWaiter from '../../../components/SpinnerWaiter';
import ErrorRequest from '../../../components/ErrorRequest';

class Login extends Component {
  static propTypes = {
    curUser: PropTypes.any,
    isSigning: PropTypes.bool,
    onRequestSig: PropTypes.func
  };

  render() {
    return (
      <div>
        <h2 className='text-center pt-3'>Login</h2>
        <p>Sign in in MetaMask, please</p>
        <button className='btn btn-warning' onClick={this.props.onRequestSig} disabled={this.props.isSigning}>
          Request sign
        </button>
        <SpinnerWaiter isLoading={this.props.isSigning} />
        <ErrorRequest error={this.props.curUser.error} />
      </div>
    );
  }
}

export default Login;
