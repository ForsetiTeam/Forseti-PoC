import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';
import isDisputeClosed from "../../../ethereum/dispute/isDisputeClosed";

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

export function fetchDisputeList(filter) {
  console.log('fetchDisputeList(', filter);
  return (dispatch, getState) => {
    if (shouldFetchDisputeList(getState())) {
      return dispatch(fetchDisputeListDo(filter));
    }
  };
}

function shouldFetchDisputeList() {
  return true;
}

function fetchDisputeListDo(filter) {
  return dispatch => {
    console.log('Fetch: DisputeList');
    dispatch(requestDisputeList());

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      request('get', apiRoutes.disputeList(), filter)
    )
      .catch(error => {
        dispatch(failureDisputeList(error.message));
      })
      .then(res => {
        const list = res.data;

        return Promise.all(list.map(dispute => {
          if (!dispute.ethAddress) {
            dispute.isClosed = false;
            return dispute;
          }
          return isDisputeClosed(dispute.ethAddress)
            .then(isClosed => {
              dispute.isClosed = isClosed;
              return dispute;
            });
        }));
      })
      .then(list => {
        dispatch(receiveDisputeList(list));
      })
      .catch(error => {
        dispatch(failureDisputeList(error.message));
      });
  };
}
