import joinPool from '../../../etherium/actions/pool/joinPool';
import leavePool from '../../../etherium/actions/pool/leavePool';
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
            dispatch(receiveCommunityJoin(community));
          })
          .catch(err => {
            dispatch(failureCommunityJoin(err));
          });
      })
      .catch(err => {
        dispatch(failureCommunityJoin(err));
      });
  };
}
