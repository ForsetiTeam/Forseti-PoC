import contractUtils from '../contractUtils';

export default function finishDispute(disputeAddress, votes, result) {
  return new Promise((resolve, reject) => {
    const web3 = contractUtils.web3;
    const dispute = contractUtils.getSmartContract('Dispute', disputeAddress);

    const h = [];
    const r = [];
    const s = [];
    const v = [];

    votes.forEach(vote => {
      if (!vote.decision) return;
      const sig = vote.sig.slice(2);

      h.push(web3.utils.toHex(vote.decision));
      r.push(`0x${sig.slice(0, 64)}`);
      s.push(`0x${sig.slice(64, 128)}`);
      v.push(web3.utils.toDecimal(sig.slice(128, 130)) + 27);
    });

    contractUtils.runSigned(
      dispute,
      'setArbitratorsAndVotes',
      [h, v, r, s, result],
      resolve,
      reject,
      true);
  });
}
