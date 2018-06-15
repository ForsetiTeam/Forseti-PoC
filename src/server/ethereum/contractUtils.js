import contracts from '../../ethereum/index';
import config from '../config';

const Web3 = require('web3');

function getWeb3() {
  const web3 = new Web3();

  // web3.setProvider(new web3.providers.HttpProvider('https://rinkeby.infura.io/'));
  // web3.setProvider(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'));
  web3.setProvider(new Web3.providers.HttpProvider('http://ethereum-test.aspirity.com:80'));

  const account = config.get('metamask.poolMasterAccount');
  const phrase = config.get('metamask.poolMasterPassphrase');
  const key = config.get('metamask.poolMasterKey');

  web3.eth.personal.importRawKey(key, phrase)
    .then(result => console.log('IMPORT ACCOUNT', result))
    .catch(() => {});// it's ok if account exists

  web3.eth.personal.unlockAccount(account, phrase)
    .then(result => console.log('UNLOCKED', result))
    .catch(console.log);

  return web3;
}

function getSmartContract(contractName, address) {
  const contractData = contracts[contractName];

  const abi = contractData.abi;
  address = address || contractData.address;

  return new web3.eth.Contract(abi, address);
}

function getTransactionFinish(transactionAddress, resolve, reject) {
  const int = setInterval(() =>
    web3.eth.getTransactionReceipt(transactionAddress, (err, transaction) => {
      if (err) {
        clearInterval(int);
        return reject(err);
      }
      if (transaction) {
        clearInterval(int);
        if (transaction.status === '0x1') {
          resolve(transaction);
        } else {
          reject(`Fail transaction status ${transaction.status}`);
        }
      }
    }), 1000);
}

/* eslint-disable max-params */
function runSigned(contract, methodName, params, resolve, reject, useSend = false) {
  const myAccount = config.get('metamask.poolMasterAccount');
  const logParams = { address: contract._address, methodName, params, useSend };

  console.log('req transaction', logParams);
  contract.methods[methodName](...params)
    [useSend ? 'send' : 'call']({ from: myAccount })
    .then(response => {
      console.log('get transaction - success', logParams, response);
      resolve(response);
    })
    .catch(error => {
      console.log('get transaction - error', logParams, error);
      reject(error);
    });
}

function runSignedTillResolve(contract, methodName, params, resolve, reject, useSend = false) {
  runSigned(
    contract,
    methodName,
    params,
    transactionAddress => getTransactionFinish(transactionAddress, resolve, reject),
    reject,
    useSend);
}

const web3 = getWeb3();

export default { web3, getSmartContract, runSigned, runSignedTillResolve };
