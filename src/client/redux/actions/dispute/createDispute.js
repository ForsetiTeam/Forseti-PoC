import { push } from 'react-router-redux';

import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';
import { jsonToFormData } from '../utils/jsonToFormData';

export const REQUEST_CREATE_DISPUTE_LOADING = 'REQUEST_CREATE_DISPUTE_LOADING';
export const REQUEST_CREATE_DISPUTE_SUCCESS = 'REQUEST_CREATE_DISPUTE_SUCCESS';
export const REQUEST_CREATE_DISPUTE_FAILURE = 'REQUEST_CREATE_DISPUTE_FAILURE';

function requestCreateDispute() {
  return {
    type: REQUEST_CREATE_DISPUTE_LOADING
  };
}

function receiveCreateDispute(dispute) {
  return {
    type: REQUEST_CREATE_DISPUTE_SUCCESS,
    dispute
  };
}

function failureCreateDispute(error) {
  return {
    type: REQUEST_CREATE_DISPUTE_FAILURE,
    error
  };
}

export function fetchCreateDispute(dispute, community) {
  return (dispatch, getState) => {
    if (shouldFetchCreateDispute(getState())) {
      return dispatch(fetchCreateDisputeDo(dispute, community));
    }
  };
}

function shouldFetchCreateDispute(state) {
  return !state.dispute.loading;
}

function fetchCreateDisputeDo(dispute, community) {
  return async dispatch => {
    console.log('Fetch: CreateDispute');
    dispatch(requestCreateDispute());

    const disputeForm = jsonToFormData(dispute);

    disputeForm.append('community', community.id);

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      request('post', apiRoutes.disputeList(), disputeForm, { 'content-type': 'multipart/form-data' })
    )
      .then(async res => {
        const dispute = res.data;

        dispatch(receiveCreateDispute(dispute));
        dispatch(push('/dispute/filter/my'));
      })
      .catch(err => {
        dispatch(failureCreateDispute(err));
        dispatch(push('/'));
      });
  };
}

