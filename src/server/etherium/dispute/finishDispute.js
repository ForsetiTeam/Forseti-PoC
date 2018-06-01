import getSmartContract from '../getSmartContract';
import web3 from '../getWeb3';

export default function finishDispute(disputeContract, poolMasterAccount, votes, result) {
  const dispute = getSmartContract('Dispute', disputeContract);

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

  return dispute.methods.setArbitratorsAndVotes(h, v, r, s, result).send({ from: poolMasterAccount });
}
