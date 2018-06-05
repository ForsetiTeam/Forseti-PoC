import contractUtils from '../contractUtils';

export default function isClosed(disputeAddress) {
  return new Promise((resolve, reject) => {
    const dispute = contractUtils.getSmartContract('Dispute', disputeAddress);

    contractUtils.runSigned(dispute, 'votesProvided', [], resolve, reject);
  });
}
