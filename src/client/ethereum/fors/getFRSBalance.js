import contractUtils from '../contractUtils';

export default function getFRSBalance() {
  const fors = contractUtils.getSmartContract('FORS');

  return contractUtils.runSigned(
    fors,
    'balanceOf',
    [ window.web3.eth.coinbase ])
    .then(balanceFrs => Promise.resolve(balanceFrs.toNumber()));
}
