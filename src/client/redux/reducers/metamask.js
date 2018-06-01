import {
  METAMASK_FAILURE,
  METAMASK_ACCOUNT_SUCCESS,
  METAMASK_SIG_REQUEST,
  METAMASK_SIG_SUCCESS
} from '../actions/metamask/processMetamask';

const initialState = {
  loading: false,
  account: null,
  error: null,
  sig: null
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
      console.log('METAMASK_ACCOUNT_SUCCESS');
      return {
        loading: false,
        account: action.account,
        error: null,
        sig: null
      };
    }
    case METAMASK_SIG_REQUEST: {
      return {
        loading: true,
        account: state.account,
        error: null,
        sig: null
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
    default:
      return state;
  }
}
