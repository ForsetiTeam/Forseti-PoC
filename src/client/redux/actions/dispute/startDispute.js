import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';

import createDispute from '../../../ethereum/drm/createDispute';

export const REQUEST_START_DISPUTE_LOADING = 'REQUEST_START_DISPUTE_LOADING';
export const REQUEST_START_DISPUTE_SUCCESS = 'REQUEST_START_DISPUTE_SUCCESS';
export const REQUEST_START_DISPUTE_FAILURE = 'REQUEST_START_DISPUTE_FAILURE';

function requestStartDispute() {
  return {
    type: REQUEST_START_DISPUTE_LOADING
  };
}

function receiveStartDispute(dispute) {
  return {
    type: REQUEST_START_DISPUTE_SUCCESS,
    dispute
  };
}

function failureStartDispute(error) {
  return {
    type: REQUEST_START_DISPUTE_FAILURE,
    error
  };
}

export function fetchStartDispute(dispute) {
  console.log('fetchStartDispute', dispute);
  return (dispatch, getState) => {
    if (shouldFetchStartDispute(getState())) {
      return dispatch(fetchStartDisputeDo(dispute));
    }
  };
}

function shouldFetchStartDispute(state) {
  return !state.dispute.loading;
}

function fetchStartDisputeDo(dispute) {
  return dispatch => {
    console.log('Fetch: StartDispute');
    dispatch(requestStartDispute());

    createDispute(dispute)
      .then(ethAddress => {
        return fetchDecorator(
          [
            resp => fetchProtectedAuth(resp, dispatch),
            fetchSuccessStatusDecorator
          ],
          request('post', apiRoutes.disputeStart(dispute.id), { ethAddress })
        )
          .then(res => dispatch(receiveStartDispute(res.data)))
          .catch(err => dispatch(failureStartDispute(err)));
      })
      .catch(error => {
        dispatch(failureStartDispute(error.message));
      });
  };
}

