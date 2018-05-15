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

export const REQUEST_CREATE_DISPUTE_LOADING = 'REQUEST_CREATE_DISPUTE_LOADING';
export const REQUEST_CREATE_DISPUTE_SUCCESS = 'REQUEST_CREATE_DISPUTE_SUCCESS';
export const REQUEST_CREATE_DISPUTE_FAILURE = 'REQUEST_CREATE_DISPUTE_FAILURE';

function requestCreateDispute() {
  return {
    type: REQUEST_CREATE_DISPUTE_LOADING
  };
}

function receiveCreateDispute(dispute) {
  return {
    type: REQUEST_CREATE_DISPUTE_SUCCESS,
    dispute
  };
}

function failureCreateDispute(error) {
  return {
    type: REQUEST_CREATE_DISPUTE_FAILURE,
    error
  };
}

export function fetchCreateDispute(dispute, community) {
  return (dispatch, getState) => {
    if (shouldFetchCreateDispute(getState())) {
      return dispatch(fetchCreateDisputeDo(dispute, community));
    }
  };
}

function shouldFetchCreateDispute(state) {
  return !state.dispute.loading;
}

function fetchCreateDisputeDo(dispute, community) {
  return dispatch => {
    console.log('Fetch: CreateDispute');
    dispatch(requestCreateDispute());

    const token = getToken();

    // спасибо настройкам линта! Охуенно удобно
    // dispute.community = community._id;
    const disputeWithCommunity = Object.assign({}, dispute, { community: community._id });

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      axios.post(`${config.get('serverAPI')}dispute`, { dispute: disputeWithCommunity }, { headers: { Authorization: token } })
    )
      .then(res => {
        dispatch(receiveCreateDispute(res.data));
        dispatch(push(`/dispute/${res.data.id}`));
      })
      .catch(err => {
        dispatch(failureCreateDispute(err));
        dispatch(push('/'));
      });
  };
}
