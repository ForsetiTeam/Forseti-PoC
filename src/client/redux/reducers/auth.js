import {
  REQUEST_REGISTER_LOADING,
  REQUEST_REGISTER_SUCCESS,
  REQUEST_REGISTER_FAILURE
} from '../actions/auth';

const initialState = {
  user: '',
  loaded: false,
  loading: false,
  error: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_REGISTER_LOADING: {
      const newState = { ...state };

      newState.loaded = false;
      newState.loading = true;
      newState.user = null;
      newState.error = null;
      return newState;
    }
    case REQUEST_REGISTER_SUCCESS: {
      const newState = { ...state };

      newState.loaded = true;
      newState.loading = false;
      newState.user = action.user;
      return newState;
    }
    case REQUEST_REGISTER_FAILURE: {
      const newState = { ...state };

      newState.loading = false;
      newState.error = action.error;
      return newState;
    }
    default:
      return state;
  }
}
