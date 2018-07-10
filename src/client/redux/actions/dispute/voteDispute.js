import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';
import signMessage from '../../../ethereum/signMessage';

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

export function fetchVoteDispute(dispute, abstain, decision) {
  return dispatch => dispatch(fetchVoteDisputeDo(dispute, abstain, decision));
}

function fetchVoteDisputeDo(disputeId, abstain, decision) {
  return async dispatch => {
    console.log('Fetch: VoteDispute');
    dispatch(requestVoteDispute());

    const sig = await signMessage(decision);

    if (!sig) return dispatch(failureVoteDispute('Not signed'));

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      request('post', apiRoutes.disputeVote(disputeId), { abstain, decision, sig })
    )
      .then(res => {
        dispatch(receiveVoteDispute(res.data));
      })
      .catch(error => {
        dispatch(failureVoteDispute(error.message));
      });
  };
}

