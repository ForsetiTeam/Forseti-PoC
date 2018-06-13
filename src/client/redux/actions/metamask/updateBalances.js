import { getBalance as getETHBalance } from '../../../services/metamask';
import getFRSBalance from '../../../ethereum/fors/getFRSBalance';
import { getEthConversion } from '../../../services/metamask';

export const REQUEST_METAMASK_BALANCES_LOADING = 'REQUEST_METAMASK_BALANCES_LOADING';
export const REQUEST_METAMASK_BALANCES_SUCCESS = 'REQUEST_METAMASK_BALANCES_SUCCESS';
export const REQUEST_METAMASK_BALANCES_FAILURE = 'REQUEST_METAMASK_BALANCES_FAILURE';

function requestBalances() {
  return {
    type: REQUEST_METAMASK_BALANCES_LOADING
  };
}

function receiveBalances(results) {
  return {
    type: REQUEST_METAMASK_BALANCES_SUCCESS,
    ...results
  };
}

function failureBalances(error) {
  return {
    type: REQUEST_METAMASK_BALANCES_FAILURE,
    error
  };
}

export function fetchBalances(dispatch) {
  dispatch(requestBalances());

  const results = {  };

  getETHBalance()
    .then(balanceEth => {
      results.balanceEth = balanceEth;
      return getFRSBalance();
    })
    .then(balanceFrs => {
      results.balanceFrs = balanceFrs;
      return getEthConversion();
    })
    .then(conversion => {
      results.conversion = conversion;
      dispatch(receiveBalances(results));
    })
    .catch(error => dispatch(failureBalances(error)));
}
