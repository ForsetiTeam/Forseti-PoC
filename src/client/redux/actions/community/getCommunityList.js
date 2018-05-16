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

export const REQUEST_COMMUNITY_LIST_LOADING = 'REQUEST_COMMUNITY_LIST_LOADING';
export const REQUEST_COMMUNITY_LIST_SUCCESS = 'REQUEST_COMMUNITY_LIST_SUCCESS';
export const REQUEST_COMMUNITY_LIST_FAILURE = 'REQUEST_COMMUNITY_LIST_FAILURE';

function requestCommunityList() {
  return {
    type: REQUEST_COMMUNITY_LIST_LOADING
  };
}

function receiveCommunityList(list) {
  return {
    type: REQUEST_COMMUNITY_LIST_SUCCESS,
    list
  };
}

function failureCommunityList(error) {
  return {
    type: REQUEST_COMMUNITY_LIST_FAILURE,
    error
  };
}

export function fetchCommunityList() {
  return (dispatch, getState) => {
    if (shouldFetchCommunityList(getState())) {
      return dispatch(fetchCommunityListDo());
    }
  };
}

function shouldFetchCommunityList() {
  return true;
}

function fetchCommunityListDo() {
  return dispatch => {
    console.log('Fetch: CommunityList');
    dispatch(requestCommunityList());

    const token = getToken();

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      axios.get(`${config.get('serverAPI')}community`, { headers: { Authorization: token } })
    )
      .then(res => {
        dispatch(receiveCommunityList(res.data));
      })
      .catch(err => {
        dispatch(failureCommunityList(err));
      });
  };
}
