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

const user = getUser();

const initialState = {
  user,
  loaded: !!user,
  loading: false,
  error: null,
  validatorError: null,
  loginFailed: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_REGISTER_LOADING:
    case REQUEST_LOGIN_LOADING: {
      const newState = { ...state };

      newState.loaded = false;
      newState.loading = true;
      newState.loginFailed = false;
      newState.joining = false;
      newState.user = null;
      newState.error = null;
      return newState;
    }
    case REQUEST_REGISTER_SUCCESS:
    case REQUEST_LOGIN_SUCCESS: {
      return {
        user: action.user,
        loaded: true,
        loading: false,
        loginFailed: false,
        error: null
      };
    }
    case REQUEST_REGISTER_FAILURE:
    case REQUEST_LOGIN_FAILURE:
    case LOGOUT: {
      return {
        user: null,
        loaded: false,
        loading: false,
        loginFailed: true,
        error: action.error,
        validatorError: action.validatorError /* from register*/
      };
    }
    default:
      return state;
  }
}
