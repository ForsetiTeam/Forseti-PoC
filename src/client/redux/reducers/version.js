import {
  REQUEST_VERSION_LOADING,
  REQUEST_VERSION_SUCCESS,
  REQUEST_VERSION_FAILURE
} from '../actions/version/getVersion';

const initialState = {
  code: '',
  loaded: false,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_VERSION_LOADING: {
      const newState = { ...state };

      newState.loaded = false;
      newState.loading = true;
      newState.code = '';
      return newState;
    }
    case REQUEST_VERSION_SUCCESS: {
      const newState = { ...state };

      newState.loaded = true;
      newState.loading = false;
      newState.code = action.version;
      return newState;
    }
    case REQUEST_VERSION_FAILURE: {
      const newState = { ...state };

      newState.loaded = true;
      newState.loading = false;
      newState.code = '';
      return newState;
    }
    default:
      return state;
  }
}
