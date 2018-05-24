import { push } from 'react-router-redux';

import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';

import createDispute from '../../../etherium/actions/createDispute';

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
      const account = getState().metamask.account;
      return dispatch(fetchStartDisputeDo(dispute, account));
    }
  };
}

function shouldFetchStartDispute(state) {
  return !state.dispute.loading;
}

function fetchStartDisputeDo(dispute, account) {
  return async dispatch => {
    console.log('Fetch: StartDispute');
    dispatch(requestStartDispute());

    const ethAddress = await createDispute(dispute, account);
    if (!ethAddress) return dispatch(failureStartDispute('Not signed'));

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      request('post', apiRoutes.disputeStart(dispute.id), { ethAddress })
    )
      .then(async res => {
        dispatch(receiveStartDispute(res.data));
        dispatch(push(`/dispute/${res.data.id}`));
      })
      .catch(err => {
        dispatch(failureStartDispute(err));
        dispatch(push('/'));
      });
  };
}

