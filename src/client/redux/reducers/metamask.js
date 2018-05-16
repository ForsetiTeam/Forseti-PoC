import {
  REQUEST_METAMASK_LOADING,
  REQUEST_METAMASK_SUCCESS
} from '../actions/metamask/loadMetaMask';

const initialState = {
  loaded: false,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_METAMASK_LOADING: {
      const newState = { ...state };

      newState.loaded = false;
      newState.loading = true;
      return newState;
    }
    case REQUEST_METAMASK_SUCCESS: {
      const newState = { ...state };

      newState.loaded = true;
      newState.loading = false;
      return newState;
    }
    default:
      return state;
  }
}
