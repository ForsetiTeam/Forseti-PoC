import contractUtils from '../../contractUtils';
import web3 from '../../getWeb3';

export default function createDispute(dispute) {
  return new Promise((resolve, reject) => {
    const drm = contractUtils.getSmartContract('DRM');
    const myAccount = web3.eth.coinbase;

    const weirdHash = dispute.poolAddress;
    const arbitersNeed = dispute.arbitersNeed;

    drm.DisputeCreate().watch((err, response) => {
      if (err) return reject(err);
      if (!response || !response.args || !response.args._dispute) return reject('Event has no data');
      resolve(response.args._dispute);
    });

    drm.createDispute(dispute.poolAddress, weirdHash, arbitersNeed, { from: myAccount }, (err, response) => {
      if (err) return reject(err);
      console.log('Transaction sent', err, response);
    });
  });
}
