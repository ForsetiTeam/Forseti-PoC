import contracts from '../../etherium/index';
import web3 from './getWeb3';

export default function getSmartContract(contractName, address) {
  const contractData = contracts[contractName];

  const abi = contractData.abi;
  address = address || contractData.address;

  return new web3.eth.Contract(abi, address);
}
