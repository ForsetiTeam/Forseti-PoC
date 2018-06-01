/*
import finishDispute from '../../../../etherium/actions/finishDispute';

finishDispute(dispute.ethAddress, dispute.poolMasterAccount, votes, result);
*/

import { push } from 'react-router-redux';

import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';

export const REQUEST_FINISH_DISPUTE_LOADING = 'REQUEST_FINISH_DISPUTE_LOADING';
export const REQUEST_FINISH_DISPUTE_SUCCESS = 'REQUEST_FINISH_DISPUTE_SUCCESS';
export const REQUEST_FINISH_DISPUTE_FAILURE = 'REQUEST_FINISH_DISPUTE_FAILURE';

function requestFinishDispute() {
  return {
    type: REQUEST_FINISH_DISPUTE_LOADING
  };
}

function receiveFinishDispute(dispute) {
  return {
    type: REQUEST_FINISH_DISPUTE_SUCCESS,
    dispute
  };
}

function failureFinishDispute(error) {
  return {
    type: REQUEST_FINISH_DISPUTE_FAILURE,
    error
  };
}

export function fetchFinishDispute(dispute) {
  console.log('fetchFinishDispute', dispute);
  return (dispatch, getState) => {
    if (shouldFetchFinishDispute(getState())) {
      return dispatch(fetchFinishDisputeDo(dispute));
    }
  };
}

function shouldFetchFinishDispute(state) {
  return !state.dispute.loading;
}

function fetchFinishDisputeDo(dispute) {
  return async dispatch => {
    console.log('Fetch: FinishDispute');
    dispatch(requestFinishDispute());

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      request('post', apiRoutes.disputeFinish(dispute.id))
    )
      .then(async res => {
        dispatch(receiveFinishDispute(res.data));
        dispatch(push(`/dispute/${res.data.id}`));
      })
      .catch(err => {
        dispatch(failureFinishDispute(err));
        dispatch(push('/'));
      });
  };
}

