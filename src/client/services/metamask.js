
export function checkPlugin() {
  return !!window.web3;
}

export function getAccount() {
  return checkPlugin ? window.web3.eth.accounts[0] : null;
}
