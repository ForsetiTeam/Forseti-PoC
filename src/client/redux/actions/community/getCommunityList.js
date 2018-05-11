import axios from 'axios';

import config from '../../../config/config';
import {
  fetchDecorator,
  fetchSuccessStatusDecorator
} from '../decorators/index';

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
  // !state.community.loading && !state.community.user;
}

function fetchCommunityListDo() {
  return dispatch => {
    console.log('Fetch: CommunityList');
    dispatch(requestCommunityList());

    return fetchDecorator(
      [
        fetchSuccessStatusDecorator
      ],
      axios.get(`${config.get('serverAPI')}community`)
    )
      .then(res => {
        dispatch(receiveCommunityList(res.data));
      })
      .catch(error => {
        dispatch(failureCommunityList(error.response.data));
      });
  };
}
