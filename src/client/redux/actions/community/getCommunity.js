import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';
import getPoolReputationByAddress from '../../../etherium/pool/getPoolReputationByAddress';
import getPoolActiveArbiters from '../../../etherium/pool/getPoolActiveArbiters';

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
      .then(res => updateCommunityJoin(res.data))
      .then(community => updateCommunityActiveArbiters(community))
      .then(community => dispatch(receiveCommunity(community)))
      .catch(err => {
        dispatch(failureCommunity(err));
      });
  };
}

export function updateCommunityJoin(community) {
  return new Promise((resolve, reject) => {
    getPoolReputationByAddress(community.poolAddress, window.web3.eth.coinbase)
      .then(reputation => {
        community.isJoined = !!reputation;
        resolve(community);
      })
      .catch(reject);
  });
}

export function updateCommunityActiveArbiters(community) {
  return new Promise((resolve, reject) => {
    getPoolActiveArbiters(community.poolAddress)
      .then(list => {
        community.usersActive = list.length;
        resolve(community);
      })
      .catch(reject);
  });
}
