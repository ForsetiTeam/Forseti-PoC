import contractUtils from '../contractUtils';

export default function getPoolReputation(poolAddress, accountAddress) {
  return new Promise((resolve, reject) => {
    const pool = contractUtils.getSmartContract('Pool', poolAddress);

    contractUtils.runSigned(pool, 'membersByAddress', [ accountAddress ], reputation => {
      console.log('reputation', reputation.toNumber());
      resolve(reputation.toNumber());
    }, reject);
  });
}
