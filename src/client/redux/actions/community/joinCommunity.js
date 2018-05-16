import axios from 'axios';

axios.interceptors.response.use(undefined, err => {
  const res = err.response;

  if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
    return Promise.resolve(res);
  }
});

import config from '../../../config/config';
import { getToken, setUser } from '../../../services/localStore';
import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';

export const REQUEST_COMMUNITY_JOIN_LOADING = 'REQUEST_COMMUNITY_JOIN_LOADING';
export const REQUEST_COMMUNITY_JOIN_SUCCESS = 'REQUEST_COMMUNITY_JOIN_SUCCESS';
export const REQUEST_COMMUNITY_JOIN_FAILURE = 'REQUEST_COMMUNITY_JOIN_FAILURE';

function requestCommunityJoin() {
  return {
    type: REQUEST_COMMUNITY_JOIN_LOADING
  };
}

function receiveCommunityJoin(user) {
  return {
    type: REQUEST_COMMUNITY_JOIN_SUCCESS,
    user
  };
}

function failureCommunityJoin(error) {
  return {
    type: REQUEST_COMMUNITY_JOIN_FAILURE,
    error
  };
}

export function fetchCommunityJoin(communityName) {
  return (dispatch, getState) => {
    if (shouldFetchCommunityJoin(getState())) {
      return dispatch(fetchCommunityJoinDo(communityName));
    }
  };
}

function shouldFetchCommunityJoin() {
  return true;
}

function fetchCommunityJoinDo(communityName) {
  return dispatch => {
    console.log('Fetch: CommunityJoin');
    dispatch(requestCommunityJoin());

    const token = getToken();

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],

      axios.post(`${config.get('serverAPI')}community/${communityName}/join`, null, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      })
    )
      .then(res => {
        setUser(res.data.user);
        dispatch(receiveCommunityJoin(res.data.user));
      })
      .catch(err => {
        dispatch(failureCommunityJoin(err));
      });
  };
}
