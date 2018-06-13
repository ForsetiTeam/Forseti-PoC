const cc = require('cryptocompare');

export function checkPlugin() {
  return !!window.web3;
}

export function getAccount() {
  return checkPlugin ? window.web3.eth.accounts[0] : null;
}

export function getBalance() {
  return new Promise((resolve, reject) => {
    const account = getAccount();

    if (!account) return reject('No account');

    window.web3.eth.getBalance(account, (error, value) => {
      if (error) return reject(error);
      resolve(value.toNumber() * 1e-18);
    });
  });
}

export function getEthConversion() {
  const currency = 'USD';

  return cc.price('ETH', [ currency ])
    .then(conversions => Promise.resolve(conversions[currency]));
}
