import contractUtils from '../contractUtils';

export default function getPoolReputationByAddress(poolAddress, accountAddress) {
  return new Promise((resolve, reject) => {
    const pool = contractUtils.getSmartContract('Pool', poolAddress);

    contractUtils.runSigned(pool, 'membersByAddress', [ accountAddress ], reputation => {
      resolve(reputation.toNumber());
    }, reject);
  });
}
