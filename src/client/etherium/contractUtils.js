import contracts from '../../etherium/index';
const web3 = window.web3;

function getSmartContract(contractName, address) {
  const contractData = contracts[contractName];

  const abi = contractData.abi;
  address = address || contractData.address;

  return web3.eth.contract(abi).at(address);
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
  const myAccount = web3.eth.coinbase;
  console.log(`req transaction: address - ${contract.address}, method - ${methodName}, params - ${JSON.stringify(params)}`);
  contract[methodName](...params, { from: myAccount }, (err, response) => {
    console.log(
      `get transaction: address - ${contract.address}, method - ${methodName}, params - ${JSON.stringify(params)}`,
      err, response);
    if (err) return reject(err.message.substring(0, 100));
    resolve(response);
  });
}

function runSignedTillResolve(contract, methodName, params, resolve, reject) {
  runSigned(contract, methodName, params, transactionAddress =>
    getTransactionFinish(transactionAddress, resolve, reject), reject);
}

export default { web3, getSmartContract, runSigned, runSignedTillResolve };
