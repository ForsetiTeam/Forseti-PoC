import getSmartContract from '../getSmartContract';
import web3 from '../getWeb3';

export default function finishDispute(disputeContract, poolMasterAccount, votes, result) {
  // return new Promise((resolve, reject) => {
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

  console.log({disputeContract, h, v, r, s, result, poolMasterAccount});

  /*
  dispute.setArbitratorsAndVotes(h, v, r, s, result, { from: poolMasterAccount }, err => {
    if (err) return reject(err);
    resolve();
  });*/
  /*
  dispute.events.VotesProvided((err, response) => {
    console.log('VotesProvided', err, response);
  });*/

  return dispute.methods.setArbitratorsAndVotes(h, v, r, s, result).send({ from: poolMasterAccount });
  /*
  , (err, data) => {
      console.log('GET CB', err, data);
    }*/
}
