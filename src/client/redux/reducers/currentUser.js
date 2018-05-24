import { getUser } from '../../services/localStore';
import {
  REQUEST_REGISTER_LOADING,
  REQUEST_REGISTER_SUCCESS,
  REQUEST_REGISTER_FAILURE
} from '../actions/auth/authRegister';
import {
  REQUEST_LOGIN_LOADING,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILURE
} from '../actions/auth/authLogin';
import {
  LOGOUT
} from '../actions/auth/authLogout';
import {
  REQUEST_COMMUNITY_JOIN_LOADING,
  REQUEST_COMMUNITY_JOIN_SUCCESS,
  REQUEST_COMMUNITY_JOIN_FAILURE
} from '../actions/community/joinCommunity';

const user = getUser();

const initialState = {
  user,
  loaded: !!user,
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_REGISTER_LOADING:
    case REQUEST_LOGIN_LOADING:
    case REQUEST_COMMUNITY_JOIN_LOADING: {
      const newState = { ...state };

      newState.loaded = false;
      newState.loading = true;
      newState.user = null;
      newState.error = null;
      return newState;
    }
    case REQUEST_REGISTER_SUCCESS:
    case REQUEST_LOGIN_SUCCESS:
    case REQUEST_COMMUNITY_JOIN_SUCCESS: {
      const newState = { ...state };

      newState.loaded = true;
      newState.loading = false;
      newState.user = action.user;
      return newState;
    }
    case REQUEST_REGISTER_FAILURE:
    case REQUEST_LOGIN_FAILURE:
    case REQUEST_COMMUNITY_JOIN_FAILURE: {
      const newState = { ...state };

      newState.loading = false;
      newState.error = action.error;
      return newState;
    }
    case LOGOUT: {
      return {
        user: null,
        loaded: false,
        loading: false,
        error: false
      };
    }
    default:
      return state;
  }
}
