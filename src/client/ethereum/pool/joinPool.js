import contractUtils from '../contractUtils';

export default function joinPool(poolAddress) {
  const pool = contractUtils.getSmartContract('Pool', poolAddress);

  return contractUtils.runSignedTillResolve(pool, 'becomeNewMember');
}
