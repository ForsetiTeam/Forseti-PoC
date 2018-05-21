import contracts from './store/index';

export default function getSmartContract(contractName) {
  const { abi, address } = contracts[contractName];

  const Contract = window.web3.eth.contract(abi);
  const contract = Contract.at(address);

  return contract;
}
