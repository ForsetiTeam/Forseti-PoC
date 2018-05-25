import getSmartContract from '../contracts/getSmartContract';

export default function joinPool(poolContract, myAccount) {
  return new Promise(resolve => {
    const pool = getSmartContract('Pool', poolContract);

    pool.becomeNewMember({ from: myAccount }, err => {
      if (err) return resolve(err);
      resolve();
    });
  });
}
