import contractUtils from '../contractUtils';

export default function leavePool(poolAddress) {
  const pool = contractUtils.getSmartContract('Pool', poolAddress);

  return contractUtils.runSignedTillResolve(pool, 'leavePool');
}
