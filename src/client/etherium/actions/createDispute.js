import getSmartContract from '../contracts/getSmartContract';

export default function createDispute(dispute, myAccount) {
  return new Promise((resolve, reject) => {
    const drm = getSmartContract('DRM');

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
