import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';

export const REQUEST_VOTE_DISPUTE_LOADING = 'REQUEST_VOTE_DISPUTE_LOADING';
export const REQUEST_VOTE_DISPUTE_SUCCESS = 'REQUEST_VOTE_DISPUTE_SUCCESS';
export const REQUEST_VOTE_DISPUTE_FAILURE = 'REQUEST_VOTE_DISPUTE_FAILURE';

function requestVoteDispute() {
  return {
    type: REQUEST_VOTE_DISPUTE_LOADING
  };
}

function receiveVoteDispute(dispute) {
  return {
    type: REQUEST_VOTE_DISPUTE_SUCCESS,
    dispute
  };
}

function failureVoteDispute(error) {
  return {
    type: REQUEST_VOTE_DISPUTE_FAILURE,
    error
  };
}

export function fetchVoteDispute(dispute, community) {
  return (dispatch, getState) => {
    if (shouldFetchVoteDispute(getState())) {
      return dispatch(fetchVoteDisputeDo(dispute, community));
    }
  };
}

function shouldFetchVoteDispute(state) {
  return !state.dispute.loading;
}

function fetchVoteDisputeDo(disputeId, vote) {
  return async dispatch => {
    console.log('Fetch: VoteDispute');
    dispatch(requestVoteDispute());

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      request('post', apiRoutes.disputeVote(disputeId), { vote })
    )
      .then(res => {
        dispatch(receiveVoteDispute(res.data));
      })
      .catch(err => {
        dispatch(failureVoteDispute(err));
      });
  };
}

