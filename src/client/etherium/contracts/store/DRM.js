/* eslint-disable */
export const abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"activeDisputes","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"disputesCounter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_pool","type":"address"},{"name":"_argumentsHash","type":"bytes32"},{"name":"_arbitratorsNumber","type":"uint256"}],"name":"createDispute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"IdDisputes","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"closeDispute","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_diputeCreator","type":"address"},{"indexed":false,"name":"_dispute","type":"address"},{"indexed":false,"name":"_pool","type":"address"}],"name":"DisputeCreate","type":"event"}];
export const address = '0x1417be9c449f0973e64d309bbbdded690eaf5ac1';
export default { abi, address };
