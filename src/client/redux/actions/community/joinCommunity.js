import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import { setUser } from '../../../services/localStore';
import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';

import joinPool from '../../../etherium/actions/joinPool';

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

export function fetchCommunityJoin(community) {
  return (dispatch, getState) => {
    if (shouldFetchCommunityJoin(getState())) {
      const account = getState().metamask.account;
      return dispatch(fetchCommunityJoinDo(community, account));
    }
  };
}

function shouldFetchCommunityJoin() {
  return true;
}

function fetchCommunityJoinDo(community, account) {
  return async dispatch => {
    console.log('Fetch: CommunityJoin');
    dispatch(requestCommunityJoin());

    const error = await joinPool(community.poolAddress, account);
    if (error) return dispatch(failureCommunityJoin('Not signed'));

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],

      request('post', apiRoutes.communityJoin(community.name), null, { 'Content-Type': 'application/json' })
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
