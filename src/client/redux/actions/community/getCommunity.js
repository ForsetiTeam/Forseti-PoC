import { push } from 'react-router-redux';

import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';

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

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      request('get', apiRoutes.community(communityName))
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
