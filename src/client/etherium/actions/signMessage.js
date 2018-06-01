import web3 from '../getWeb3';

export default function signMessage(message) {
  return new Promise(resolve => {
    const myAccount = web3.eth.coinbase;
    const hex = web3.toHex(message);

    web3.personal.sign(hex, myAccount, (e, sig) => {
      if (e || !sig) return resolve();
      resolve(sig);
    });
  });
}
