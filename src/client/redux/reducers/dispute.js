import {
  REQUEST_DISPUTE_LIST_LOADING,
  REQUEST_DISPUTE_LIST_SUCCESS,
  REQUEST_DISPUTE_LIST_FAILURE
} from '../actions/dispute/getDisputeList';
import {
  REQUEST_DISPUTE_LOADING,
  REQUEST_DISPUTE_SUCCESS,
  REQUEST_DISPUTE_FAILURE
} from '../actions/dispute/getDispute';

const initialState = {
  list: [],
  loaded: false,
  loading: false,
  error: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_DISPUTE_LIST_LOADING:
    case REQUEST_DISPUTE_LOADING: {
      const newState = { ...state };

      newState.list = [];
      newState.loaded = false;
      newState.loading = true;
      newState.error = null;
      return newState;
    }
    case REQUEST_DISPUTE_LIST_SUCCESS: {
      const newState = { ...state };

      newState.list = action.list;
      newState.loaded = true;
      newState.loading = false;
      return newState;
    }
    case REQUEST_DISPUTE_SUCCESS: {
      const newState = { ...state };

      newState.list = [ action.dispute ];
      newState.loaded = true;
      newState.loading = false;
      return newState;
    }
    case REQUEST_DISPUTE_LIST_FAILURE:
    case REQUEST_DISPUTE_FAILURE: {
      const newState = { ...state };

      newState.loading = false;
      newState.error = action.error;
      return newState;
    }
    default:
      return state;
  }
}
