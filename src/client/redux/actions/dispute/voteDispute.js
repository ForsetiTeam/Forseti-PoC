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

export function fetchVoteDispute(dispute, decision) {
  return (dispatch) => dispatch(fetchVoteDisputeDo(dispute, decision));
}

function fetchVoteDisputeDo(disputeId, decision) {
  return async dispatch => {
    console.log('Fetch: VoteDispute');
    dispatch(requestVoteDispute());

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      request('post', apiRoutes.disputeVote(disputeId), { decision })
    )
      .then(res => {
        dispatch(receiveVoteDispute(res.data));
      })
      .catch(err => {
        dispatch(failureVoteDispute(err));
      });
  };
}

