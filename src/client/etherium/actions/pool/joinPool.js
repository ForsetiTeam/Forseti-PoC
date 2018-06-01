import contractUtils from '../../contractUtils';

export default function joinPool(poolAddress) {
  return new Promise((resolve, reject) => {
    const pool = contractUtils.getSmartContract('Pool', poolAddress);

    contractUtils.runSignedTillResolve(pool, 'becomeNewMember', [], resolve, reject);
  });
}
