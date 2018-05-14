import React, { Component } from 'react';

class NoMetamaskAccount extends Component {
  render() {
    return (
      <div>
        <h3>Аккаунт не найден</h3>
        <p>Необходимо зарегистрироваться в MetaMask и выбрать аккаунт</p>
      </div>
    );
  }
}

export default NoMetamaskAccount;
