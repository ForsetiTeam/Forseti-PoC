import contractUtils from '../../contractUtils';
// import web3 from '../getWeb3';

export default function createPool() {
  return new Promise((resolve, reject) => {
    const fors = contractUtils.getSmartContract('FORS');
    const poolFactory = contractUtils.getSmartContract('PoolFactory');
    const myAccount = window.web3.eth.coinbase;

    fors.approve(poolFactory.address, 100, { from: myAccount }, (err, response) => {
      console.log('fors.approve', err, response);
      if (err) return reject(err);
      poolFactory.NewPoolCreating().watch((err, response) => {
        console.log(response.args);
        resolve();
      });
      poolFactory.createPool(10, 'abc01', { from: myAccount }, (err, response) => {
        console.log('poolFactory.createPool', err, response);
        if (err) return reject(err);
      });
    });
  });
}
