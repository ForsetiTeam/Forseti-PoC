import {
  METAMASK_FAILURE,
  METAMASK_ACCOUNT_SUCCESS,
  METAMASK_SIG_REQUEST,
  METAMASK_SIG_SUCCESS
} from '../actions/metamask/processMetamask';
import {
  // REQUEST_METAMASK_BALANCES_FAILURE,
  // REQUEST_METAMASK_BALANCES_LOADING,
  REQUEST_METAMASK_BALANCES_SUCCESS
} from '../actions/metamask/updateBalances';


const initialState = {
  loading: false,
  account: null,
  error: null,
  sig: null,
  balanceEth: null,
  balanceFrs: null,
  conversion: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case METAMASK_FAILURE: {
      return {
        loading: false,
        account: state.account,
        error: action.error,
        sig: null
      };
    }
    case METAMASK_ACCOUNT_SUCCESS: {
      return {
        loading: false,
        account: action.account,
        error: null,
        sig: null,
        balanceEth: null,
        balanceFrs: null
      };
    }
    case METAMASK_SIG_REQUEST: {
      return {
        loading: true,
        account: state.account,
        error: null,
        sig: null,
        balanceEth: null,
        balanceFrs: null
      };
    }
    case METAMASK_SIG_SUCCESS: {
      return {
        loading: false,
        account: state.account,
        error: null,
        sig: action.sig
      };
    }
    case REQUEST_METAMASK_BALANCES_SUCCESS: {
      return {
        loading: state.account,
        account: state.account,
        error: state.error,
        sig: state.sig,
        balanceEth: action.balanceEth,
        balanceFrs: action.balanceFrs,
        conversion: action.conversion
      };
    }
    default:
      return state;
  }
}
