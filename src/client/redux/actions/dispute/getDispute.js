import { push } from 'react-router-redux';
import axios from 'axios';

import config from '../../../config/config';
import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';
import { getToken } from '../../../services/localStore';

axios.interceptors.response.use(undefined, err => {
  const res = err.response;

  if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
    return Promise.resolve(res);
  }
});

export const REQUEST_DISPUTE_LOADING = 'REQUEST_DISPUTE_LOADING';
export const REQUEST_DISPUTE_SUCCESS = 'REQUEST_DISPUTE_SUCCESS';
export const REQUEST_DISPUTE_FAILURE = 'REQUEST_DISPUTE_FAILURE';

function requestDispute() {
  return {
    type: REQUEST_DISPUTE_LOADING
  };
}

function receiveDispute(dispute) {
  return {
    type: REQUEST_DISPUTE_SUCCESS,
    dispute
  };
}

function failureDispute(error) {
  return {
    type: REQUEST_DISPUTE_FAILURE,
    error
  };
}

export function fetchDispute(id) {
  return (dispatch, getState) => {
    if (shouldFetchDispute(getState())) {
      return dispatch(fetchDisputeDo(id));
    }
  };
}

function shouldFetchDispute(state) {
  return !state.dispute.loading;
}

function fetchDisputeDo(id) {
  return dispatch => {
    console.log('Fetch: Dispute');
    dispatch(requestDispute());

    const token = getToken();

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      axios.get(`${config.get('serverAPI')}dispute/${id}`, { headers: { Authorization: token } })
    )
      .then(res => {
        dispatch(receiveDispute(res.data));
      })
      .catch(err => {
        dispatch(failureDispute(err));
        dispatch(push('/'));
      });
  };
}
