import contractUtils from '../contractUtils';

export default function getPoolReputationByAddress(poolAddress, id) {
  return new Promise((resolve, reject) => {
    const pool = contractUtils.getSmartContract('Pool', poolAddress);

    contractUtils.runSigned(pool, 'membersById', [ id ], arbiter => {
      resolve({ id, address: arbiter[1], reputation: arbiter[0].toNumber() });
    }, reject);
  });
}
