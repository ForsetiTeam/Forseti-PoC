import contractUtils from '../contractUtils';

export default function getFRSBalance() {
  return new Promise((resolve, reject) => {
    const fors = contractUtils.getSmartContract('FORS');

    contractUtils.runSigned(
      fors,
      'balanceOf',
      [ window.web3.eth.coinbase ],
      balanceFrs => resolve(balanceFrs.toNumber()),
      reject);
  });
}
