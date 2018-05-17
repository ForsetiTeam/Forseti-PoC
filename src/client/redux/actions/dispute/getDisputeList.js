import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';

export const REQUEST_DISPUTE_LIST_LOADING = 'REQUEST_DISPUTE_LIST_LOADING';
export const REQUEST_DISPUTE_LIST_SUCCESS = 'REQUEST_DISPUTE_LIST_SUCCESS';
export const REQUEST_DISPUTE_LIST_FAILURE = 'REQUEST_DISPUTE_LIST_FAILURE';

function requestDisputeList() {
  return {
    type: REQUEST_DISPUTE_LIST_LOADING
  };
}

function receiveDisputeList(list) {
  return {
    type: REQUEST_DISPUTE_LIST_SUCCESS,
    list
  };
}

function failureDisputeList(error) {
  return {
    type: REQUEST_DISPUTE_LIST_FAILURE,
    error
  };
}

export function fetchDisputeList(owner, status) {
  console.log('fetchDisputeList(', owner, status);
  return (dispatch, getState) => {
    if (shouldFetchDisputeList(getState())) {
      return dispatch(fetchDisputeListDo(owner, status));
    }
  };
}

function shouldFetchDisputeList() {
  return true;
}

function fetchDisputeListDo(owner, status) {
  return dispatch => {
    console.log('Fetch: DisputeList');
    dispatch(requestDisputeList());

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      request('get', apiRoutes.disputeList(), { owner, status })
    )
      .then(res => {
        dispatch(receiveDisputeList(res.data));
      })
      .catch(err => {
        dispatch(failureDisputeList(err));
      });
  };
}
