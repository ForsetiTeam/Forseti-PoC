import getPoolArbitersCount from './getPoolArbitersCount';
import getPoolReputationById from './getPoolReputationById';

export default function getPoolActiveArbiters(poolAddress) {
  return new Promise((resolve, reject) => {
    getPoolArbitersCount(poolAddress)
      .then(count => {
        const list = [];
        let passed = 0;

        for (let i = 1; i <= count; i++) {
          /* eslint-disable no-loop-func */
          getPoolReputationById(poolAddress, i)
            .then(arbiter => {
              if (arbiter.reputation) {
                list.push(arbiter);
              }

              passed++;
              if (passed === count) {
                resolve(list);
              }
            })
            .catch(reject);
        }
      })
      .catch(reject);
  });
}
