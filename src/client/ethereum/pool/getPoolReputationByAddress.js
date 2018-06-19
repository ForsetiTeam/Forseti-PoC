import contractUtils from '../contractUtils';

export default function getPoolReputationByAddress(poolAddress, accountAddress) {
  const pool = contractUtils.getSmartContract('Pool', poolAddress);

  return contractUtils.runSigned(pool, 'membersByAddress', [ accountAddress ])
    .then(reputation => Promise.resolve(reputation.toNumber()));
}
