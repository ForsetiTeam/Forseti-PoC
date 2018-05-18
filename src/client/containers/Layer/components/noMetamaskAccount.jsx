import React, { Component } from 'react';

class NoMetamaskAccount extends Component {
  render() {
    return (
      <div>
        <h3>Account not found.</h3>
        <p>You should install MetaMask plugin and select account.</p>
      </div>
    );
  }
}

export default NoMetamaskAccount;
