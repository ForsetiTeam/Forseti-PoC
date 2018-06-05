import contractUtils from '../contractUtils';

export default function getPoolArbitersCount(poolAddress) {
  return new Promise((resolve, reject) => {
    const pool = contractUtils.getSmartContract('Pool', poolAddress);

    contractUtils.runSigned(pool, 'membersCount', [], count => {
      resolve(count.toNumber());
    }, reject);
  });
}
