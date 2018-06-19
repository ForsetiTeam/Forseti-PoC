import contracts from '../../ethereum/index';
const web3 = window.web3;

function getSmartContract(contractName, address) {
  const contractData = contracts[contractName];

  const abi = contractData.abi;

  address = address || contractData.address;

  return web3.eth.contract(abi).at(address);
}

function getTransactionFinish(transactionAddress) {
  return new Promise((resolve, reject) => {
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
  });
}

function runSigned(contract, methodName, params, options) {
  return new Promise((resolve, reject) => {
    const logParams = { address: contract.address, methodName, params };

    params = params || {};

    options = options || {};
    options.from = web3.eth.coinbase;

    console.log('req transaction', logParams);
    contract[methodName](...params, options, (err, response) => {
      console.log('get transaction', logParams, err, response);
      if (err) return reject(err.message.substring(0, 100));
      resolve(response);
    });
  });
}

function runSignedTillResolve(contract, methodName, params, options) {
  return runSigned(contract, methodName, params, options)
    .then(transactionAddress => getTransactionFinish(transactionAddress));
}

export default { web3, getSmartContract, runSigned, runSignedTillResolve };
