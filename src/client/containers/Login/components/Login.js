import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpinnerWaiter from '../../../components/SpinnerWaiter';

class Login extends Component {
  static propTypes = {
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
        <SpinnerWaiter isLoading={this.props.isSigning}/>
      </div>
    );
  }
}

export default Login;
