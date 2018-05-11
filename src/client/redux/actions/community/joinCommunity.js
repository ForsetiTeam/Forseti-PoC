import axios from 'axios';

import config from '../../../config/config';
import { getToken } from '../../../services/localStore';
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

function receiveCommunityJoin(list) {
  return {
    type: REQUEST_COMMUNITY_JOIN_SUCCESS,
    list
  };
}

function failureCommunityJoin(error) {
  return {
    type: REQUEST_COMMUNITY_JOIN_FAILURE,
    error
  };
}

export function fetchCommunityJoin(id) {
  return (dispatch, getState) => {
    if (shouldFetchCommunityJoin(getState())) {
      return dispatch(fetchCommunityJoinDo(id));
    }
  };
}

function shouldFetchCommunityJoin() {
  return true;
}

function fetchCommunityJoinDo(id) {
  return dispatch => {
    console.log('Fetch: CommunityJoin');
    dispatch(requestCommunityJoin());

    const token = getToken();

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      /* fetch(`${config.get('serverAPI')}community/${id}/join`, {

        method: 'POST',
        credentials: 'same-origin',
        mode: 'no-cors',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': token
        })
      })*/
      axios.post(`${config.get('serverAPI')}community/${id}/join`, { headers: { Authorization: token } })
    )
      .then(res => {
        dispatch(receiveCommunityJoin(res.data));
      })
      .catch(() => {
        dispatch(failureCommunityJoin());
      });
  };
}
