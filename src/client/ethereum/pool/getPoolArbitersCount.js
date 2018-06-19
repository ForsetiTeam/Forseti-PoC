import contractUtils from '../contractUtils';

export default function getPoolArbitersCount(poolAddress) {
  const pool = contractUtils.getSmartContract('Pool', poolAddress);

  return contractUtils.runSigned(pool, 'membersCount', [])
    .then(count => Promise.resolve(count.toNumber()));
}
