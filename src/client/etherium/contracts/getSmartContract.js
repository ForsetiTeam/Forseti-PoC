import contracts from './store/index';

export default function getSmartContract(contractName, address) {
  const contractData = contracts[contractName];

  const Contract = window.web3.eth.contract(contractData.abi);
  const contract = Contract.at(address || contractData.address);

  return contract;
}
