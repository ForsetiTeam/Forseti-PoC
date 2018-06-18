import joinPool from '../../../ethereum/pool/joinPool';
import leavePool from '../../../ethereum/pool/leavePool';
import { updateCommunityJoin } from './getCommunity';

export const REQUEST_COMMUNITY_JOIN_LOADING = 'REQUEST_COMMUNITY_JOIN_LOADING';
export const REQUEST_COMMUNITY_JOIN_SUCCESS = 'REQUEST_COMMUNITY_JOIN_SUCCESS';
export const REQUEST_COMMUNITY_JOIN_FAILURE = 'REQUEST_COMMUNITY_JOIN_FAILURE';

function requestCommunityJoin() {
  return {
    type: REQUEST_COMMUNITY_JOIN_LOADING
  };
}

function receiveCommunityJoin(community) {
  return {
    type: REQUEST_COMMUNITY_JOIN_SUCCESS,
    community
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
      return dispatch(fetchCommunityJoinDo(community));
    }
  };
}

function shouldFetchCommunityJoin() {
  return true;
}

function fetchCommunityJoinDo(community) {
  return async dispatch => {
    console.log('Fetch: CommunityJoin');
    dispatch(requestCommunityJoin());

    const toggle = community.isJoined ? leavePool : joinPool;

    toggle(community.poolAddress)
      .then((anydata) => {
        console.log(anydata);
        updateCommunityJoin(community)
          .then(community => {
            community.usersActive += community.isJoined ? 1 : -1;
            dispatch(receiveCommunityJoin(community));
          })
          .catch(error => dispatch(failureCommunityJoin(error)));
      })
      .catch(() => dispatch(receiveCommunityJoin(community)));
  };
}
