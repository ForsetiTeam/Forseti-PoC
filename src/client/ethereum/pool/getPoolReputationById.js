import contractUtils from '../contractUtils';

export default function getPoolReputationById(poolAddress, id) {
  const pool = contractUtils.getSmartContract('Pool', poolAddress);

  return contractUtils.runSigned(pool, 'membersById', [ id ])
    .then(arbiter => Promise.resolve({ id, address: arbiter[1], reputation: arbiter[0].toNumber() }));
}
