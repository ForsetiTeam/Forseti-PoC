import contractUtils from '../contractUtils';

export default function isDisputeClosed(disputeAddress) {
  return new Promise((resolve, reject) => {
    const dispute = contractUtils.getSmartContract('Dispute', disputeAddress);

    contractUtils.runSigned(dispute, 'result', [], resolve, reject);
  });
}
