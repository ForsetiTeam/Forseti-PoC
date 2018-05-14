import {
  REQUEST_COMMUNITY_LIST_LOADING,
  REQUEST_COMMUNITY_LIST_SUCCESS,
  REQUEST_COMMUNITY_LIST_FAILURE
} from '../actions/community/getCommunityList';
import {
  REQUEST_COMMUNITY_LOADING,
  REQUEST_COMMUNITY_SUCCESS,
  REQUEST_COMMUNITY_FAILURE
} from '../actions/community/getCommunity';

const initialState = {
  list: [],
  loaded: false,
  loading: false,
  error: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_COMMUNITY_LIST_LOADING:
    case REQUEST_COMMUNITY_LOADING: {
      const newState = { ...state };

      newState.list = [];
      newState.loaded = false;
      newState.loading = true;
      newState.error = null;
      return newState;
    }
    case REQUEST_COMMUNITY_LIST_SUCCESS: {
      const newState = { ...state };

      newState.list = action.list;
      newState.loaded = true;
      newState.loading = false;
      return newState;
    }
    case REQUEST_COMMUNITY_SUCCESS: {
      const newState = { ...state };

      newState.list = [ action.community ];
      newState.loaded = true;
      newState.loading = false;
      return newState;
    }
    case REQUEST_COMMUNITY_LIST_FAILURE:
    case REQUEST_COMMUNITY_FAILURE: {
      const newState = { ...state };

      newState.loading = false;
      newState.error = action.error;
      return newState;
    }
    default:
      return state;
  }
}
