export default function signMessage(message) {
  return new Promise(resolve => {
    const myAccount = window.web3.eth.coinbase;
    const hex = window.web3.toHex(message);

    window.web3.personal.sign(hex, myAccount, (e, sig) => {
      if (e || !sig) return resolve();
      resolve(sig);
    });
  });
}
