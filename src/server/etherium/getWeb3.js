
const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://rinkeby.infura.io'));
web3.eth.personal.unlockAccount('0x88373C8ce5213bfD1530C83e409B4Bc024586202', '');

export default web3;
