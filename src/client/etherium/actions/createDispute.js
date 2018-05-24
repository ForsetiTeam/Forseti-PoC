import getSmartContract from '../contracts/getSmartContract';

export default function createDispute(dispute, myAccount, poolAddress) {
  return new Promise((resolve, reject) => {
    const drm = getSmartContract('DRM');

    const weirdHash = poolAddress;
    const arbitersNeed = dispute.arbitersNeed;

    drm.DisputeCreate().watch((err, response) => {
      if (err) return reject(err);
      if (!response || !response.args || !response.args._dispute) return reject('Event has no data');
      resolve(response.args._dispute);
    });

    drm.createDispute(poolAddress, weirdHash, arbitersNeed, { from: myAccount }, (err, response) => {
      if (err) return reject(err);
      console.log('Transaction sent', err, response);
    });
  });
}
