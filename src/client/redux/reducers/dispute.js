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
import {
  REQUEST_VOTE_DISPUTE_LOADING,
  REQUEST_VOTE_DISPUTE_SUCCESS,
  REQUEST_VOTE_DISPUTE_FAILURE
} from '../actions/dispute/voteDispute';
import {
  REQUEST_START_DISPUTE_LOADING,
  REQUEST_START_DISPUTE_SUCCESS,
  REQUEST_START_DISPUTE_FAILURE
} from '../actions/dispute/startDispute';
import {
  REQUEST_FINISH_DISPUTE_LOADING,
  REQUEST_FINISH_DISPUTE_SUCCESS,
  REQUEST_FINISH_DISPUTE_FAILURE
} from '../actions/dispute/finishDispute';

const initialState = {
  list: [],
  loaded: false,
  loading: false,
  error: '',
  loadingItem: false,
  errorItem: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_DISPUTE_LIST_LOADING: {
      const newState = { ...state };

      newState.list = [];
      newState.loaded = false;
      newState.loading = true;
      newState.error = '';
      return newState;
    }
    case REQUEST_DISPUTE_LOADING:
    case REQUEST_VOTE_DISPUTE_LOADING:
    case REQUEST_START_DISPUTE_LOADING:
    case REQUEST_FINISH_DISPUTE_LOADING: {
      const newState = { ...state };

      newState.loadingItem = true;
      newState.errorItem = '';
      return newState;
    }
    case REQUEST_DISPUTE_LIST_SUCCESS: {
      const newState = { ...state };

      newState.list = action.list;
      newState.loaded = true;
      newState.loading = false;
      return newState;
    }
    case REQUEST_DISPUTE_SUCCESS:
    case REQUEST_VOTE_DISPUTE_SUCCESS:
    case REQUEST_START_DISPUTE_SUCCESS:
    case REQUEST_FINISH_DISPUTE_SUCCESS: {
      const newState = { ...state };
      const list = state.list.map(dispute =>
        action.dispute.id === dispute.id ? action.dispute : dispute
      );

      newState.list = list;
      newState.loadedItem = true;
      newState.loadingItem = false;
      return newState;
    }
    case REQUEST_DISPUTE_LIST_FAILURE: {
      const newState = { ...state };

      newState.loading = false;
      newState.error = action.error;
      return newState;
    }
    case REQUEST_DISPUTE_FAILURE:
    case REQUEST_VOTE_DISPUTE_FAILURE:
    case REQUEST_START_DISPUTE_FAILURE:
    case REQUEST_FINISH_DISPUTE_FAILURE: {
      const newState = { ...state };

      newState.loadingItem = false;
      newState.errorItem = action.error;
      return newState;
    }
    default:
      return state;
  }
}
