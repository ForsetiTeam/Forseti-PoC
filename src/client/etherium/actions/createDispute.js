import getSmartContract from '../contracts/getSmartContract';
import config from '../../config/config';
import { getAccount } from '../../services/metamask';

export default function createDispute(dispute) {
  return new Promise((resolve, reject) => {
    const drm = getSmartContract('DRM');

    const myAccount = getAccount();
    const poolAddress = config.get('metamask.poolAddress');
    const weirdHash = poolAddress;
    const arbitersNeed = dispute.arbitersNeed;

    drm.DisputeCreate().watch((err, response) => {
      console.log('CREATE DISPUTE');
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
