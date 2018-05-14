const ethUtil = require('ethereumjs-util');

function checkPlugin() {
  return !!window.web3;
}

function getAccount() {
  return checkPlugin ? window.web3.eth.accounts[0] : null;
}

function loadAccount() {
  return new Promise((resolve, reject) => {
    if (!checkPlugin()) return reject();
    window.web3.eth.getAccounts((error, accounts) => {
      if (error || !accounts) return reject();
      resolve(accounts[0]);
    });
  });
}

function requestSig(message) {
  return new Promise((resolve, reject) => {
    const account = getAccount();

    if (!account) return reject();
    const data = ethUtil.bufferToHex(new Buffer(message, 'utf8'));

    window.web3.currentProvider.sendAsync(
      {
        method: 'personal_sign',
        params: [data, account],
        from: account
      },
      (error, result) => {
        const error2 = error || result.error;

        if (error2) {
          reject();
        } else {
          const sign = result.result;

          resolve(sign);
        }
      }
    );
  });
}

export {
  checkPlugin,
  getAccount,
  requestSig,
  loadAccount
};
