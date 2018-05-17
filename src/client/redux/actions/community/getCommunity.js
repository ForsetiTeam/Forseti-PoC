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

export const REQUEST_COMMUNITY_LOADING = 'REQUEST_COMMUNITY_LOADING';
export const REQUEST_COMMUNITY_SUCCESS = 'REQUEST_COMMUNITY_SUCCESS';
export const REQUEST_COMMUNITY_FAILURE = 'REQUEST_COMMUNITY_FAILURE';

function requestCommunity() {
  return {
    type: REQUEST_COMMUNITY_LOADING
  };
}

function receiveCommunity(community) {
  return {
    type: REQUEST_COMMUNITY_SUCCESS,
    community
  };
}

function failureCommunity(error) {
  return {
    type: REQUEST_COMMUNITY_FAILURE,
    error
  };
}

export function fetchCommunity(communityName) {
  return (dispatch, getState) => {
    if (shouldFetchCommunity(getState())) {
      return dispatch(fetchCommunityDo(communityName));
    }
  };
}

function shouldFetchCommunity(state) {
  return !state.community.loading && !state.community.user;
}

function fetchCommunityDo(communityName) {
  return dispatch => {
    console.log('Fetch: Community');
    dispatch(requestCommunity());

    const token = getToken();

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      axios.get(`${config.get('serverAPI')}community/${communityName}`, { headers: { Authorization: token } })
    )
      .then(res => {
        dispatch(receiveCommunity(res.data));
      })
      .catch(err => {
        dispatch(failureCommunity(err));
        dispatch(push('/'));
      });
  };
}
