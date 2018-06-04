import contractUtils from '../contractUtils';

export default function createDispute(dispute) {
  return new Promise((resolve, reject) => {
    const drm = contractUtils.getSmartContract('DRM');

    const weirdHash = dispute.poolAddress;
    const arbitersNeed = dispute.arbitersNeed;

    drm.DisputeCreate().watch((err, response) => {
      if (err) return reject(err);
      if (!response || !response.args || !response.args._dispute) return reject('Event has no data');
      resolve(response.args._dispute);
    });

    contractUtils.runSigned(drm, 'createDispute', [dispute.poolAddress, weirdHash, arbitersNeed], () => {}, reject);
  });
}