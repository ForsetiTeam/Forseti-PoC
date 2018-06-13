import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
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
}

function fetchCommunityListDo() {
  return dispatch => {
    console.log('Fetch: CommunityList');
    dispatch(requestCommunityList());

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      request('get', apiRoutes.communityList())
    )
      .then(res => {
        dispatch(receiveCommunityList(res.data));
      })
      .catch(error => {
        dispatch(failureCommunityList(error.message));
      });
  };
}
