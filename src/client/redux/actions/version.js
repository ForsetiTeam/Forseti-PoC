import axios from 'axios';

import config from '../../config/config';
import {
  fetchDecorator,
  fetchSuccessStatusDecorator
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
        fetchSuccessStatusDecorator
      ],
      axios(
        {
          url: `${config.get('serverAPI')}version`,
          validateStatus: status => {
            return status >= 200 && status < 300 || status === 304;
          }
        }
      )
    )
      .then(res => {
        dispatch(receiveVersion(res.data.version));
      })
      .catch(error => {
        dispatch(failureVersion(error));
      });
    /* , 'Authorization': state.session.cookies.jwt */
  };
}
