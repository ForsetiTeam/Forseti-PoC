import contracts from '../../etherium/index';
import config from '../config';

const Web3 = require('web3');

function getWeb3() {
  const web3 = new Web3();

  // web3.setProvider(new web3.providers.HttpProvider('http://rinkeby.infura.io'));
  // web3.setProvider(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'));
  web3.setProvider(new Web3.providers.HttpProvider('http://ethereum-test.aspirity.com:80'));
  web3.eth.personal.unlockAccount('0x88373C8ce5213bfD1530C83e409B4Bc024586202', '');

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
      console.log('transaction', transaction);
    }), 1000);
}

/* eslint-disable max-params */
function runSigned(contract, methodName, params, resolve, reject) {
  const myAccount = config.get('metamask.poolMasterAccount');

  contract.methods[methodName](...params).call({ from: myAccount })
    .then(resolve)
    .catch(reject);
}

function runSignedTillResolve(contract, methodName, params, resolve, reject) {
  runSigned(contract, methodName, params, transactionAddress =>
    getTransactionFinish(transactionAddress, resolve, reject), reject);
}

const web3 = getWeb3();
export default { web3, getSmartContract, runSigned, runSignedTillResolve };
