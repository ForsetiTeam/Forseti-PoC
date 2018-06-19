import contractUtils from '../contractUtils';

export default function isDisputeClosed(disputeAddress) {
  const dispute = contractUtils.getSmartContract('Dispute', disputeAddress);

  return contractUtils.runSigned(dispute, 'votesProvided');
}
