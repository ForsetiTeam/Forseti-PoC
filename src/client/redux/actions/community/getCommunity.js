import { push } from 'react-router-redux';
import axios from 'axios';

import config from '../../../config/config';
import {
  fetchDecorator,
  fetchSuccessStatusDecorator
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

export function fetchCommunity(id) {
  return (dispatch, getState) => {
    if (shouldFetchCommunity(getState())) {
      return dispatch(fetchCommunityDo(id));
    }
  };
}

function shouldFetchCommunity(state) {
  return !state.community.loading && !state.community.user;
}

function fetchCommunityDo(id) {
  return dispatch => {
    console.log('Fetch: Community');
    dispatch(requestCommunity());

    return fetchDecorator(
      [
        fetchSuccessStatusDecorator
      ],
      axios.get(`${config.get('serverAPI')}community/${id}`)
    )
      .then(res => {
        dispatch(receiveCommunity(res.data));
      })
      .catch(error => {
        dispatch(failureCommunity(error.response.data));
        dispatch(push('/'));
      });
  };
}
