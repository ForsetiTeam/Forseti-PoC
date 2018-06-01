import contractUtils from '../../contractUtils';

export default function leavePool(poolAddress) {
  return new Promise((resolve, reject) => {
    const pool = contractUtils.getSmartContract('Pool', poolAddress);

    contractUtils.runSignedTillResolve(pool, 'leavePool', [], resolve, reject);
    /* const myAccount = web3.eth.coinbase;

    pool.leavePool({ from: myAccount }, (err, transactionAddress) => {
      console.log('pool.leavePool', err, transactionAddress);
      getTransactionFinish(transactionAddress, resolve, reject);
    });*/
  });
}
