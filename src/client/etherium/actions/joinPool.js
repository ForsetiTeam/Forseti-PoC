import getSmartContract from '../contracts/getSmartContract';

export default function joinPool(poolContract) {
  return new Promise(resolve => {
    const pool = getSmartContract('Pool', poolContract);
    const myAccount = window.web3.eth.coinbase;

    pool.becomeNewMember({ from: myAccount }, err => {
      if (err) return resolve(err);
      resolve();
    });
  });
}
