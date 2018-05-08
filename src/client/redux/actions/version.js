import config from '../../config/config';
import {
  fetchDecorator,
  // fetchProtectedAuth,
  fetchSuccessStatusDecorator,
  fetchFromJsonDecorator
}                                     from './decorators';

export const REQUEST_VERSION_LOADING = 'REQUEST_VERSION_LOADING';
export const REQUEST_VERSION_SUCCESS = 'REQUEST_VERSION_SUCCESS';
export const REQUEST_VERSION_FAILURE = 'REQUEST_VERSION_FAILURE';

function requestVersion() {
  return {
    type: REQUEST_VERSION_LOADING
  };
}

function receiveVersion(version) {
  return {
    type: REQUEST_VERSION_SUCCESS,
    version
  };
}

function failureVersion(error) {
  return {
    type: REQUEST_VERSION_FAILURE,
    error
  };
}

export function fetchVersion() {
  return (dispatch, getState) => {
    if (shouldFetchVersion(getState())) {
      return dispatch(fetchVersionDo());
    }
  };
}

function shouldFetchVersion(state) {
  return !state.version.loading;
}

function fetchVersionDo() {
  return dispatch => {
    console.log('Fetch: Version');
    dispatch(requestVersion());

    return fetchDecorator(
      [
        // partial(fetchProtectedAuth, dispatch),
        // (...args) => fetchProtectedAuth(dispatch, ...args),
        fetchSuccessStatusDecorator,
        fetchFromJsonDecorator
      ],
      fetch(`${config.get('serverAPI')}version`, {
        method: 'GET'
      })
    )
      .then(version => {
        dispatch(receiveVersion(version.message));
      })
      .catch((error) => {
        dispatch(failureVersion(error));
      });
    /* , 'Authorization': state.session.cookies.jwt */
  };
}
