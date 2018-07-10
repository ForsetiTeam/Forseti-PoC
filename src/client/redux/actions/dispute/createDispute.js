import { push } from 'react-router-redux';

import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import { uploadFile } from '../../../services/ipfs';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';

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

    dispute.community = community.id;

    return uploadFile(dispute.document).then(document => {
      if (document) {
        dispute.document = document.hash;
      }

      return fetchDecorator(
        [
          resp => fetchProtectedAuth(resp, dispatch),
          fetchSuccessStatusDecorator
        ],
        request('post', apiRoutes.disputeList(), dispute)
      );
    })
      .then(async res => {
        const dispute = res.data;

        dispatch(receiveCreateDispute(dispute));
        dispatch(push('/dispute/filter/my'));
      })
      .catch(error => {
        dispatch(failureCreateDispute(error.message));
        dispatch(push('/'));
      });
  };
}

