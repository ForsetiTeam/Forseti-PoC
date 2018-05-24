import { push } from 'react-router-redux';

import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';
import { jsonToFormData } from '../utils/jsonToFormData';

import createDispute from '../../../etherium/actions/createDispute';

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
  console.log('fetchCreateDispute', dispute, community);
  return (dispatch, getState) => {
    if (shouldFetchCreateDispute(getState())) {
      const account = getState().metamask.account;
      return dispatch(fetchCreateDisputeDo(dispute, community, account));
    }
  };
}

function shouldFetchCreateDispute(state) {
  return !state.dispute.loading;
}

function fetchCreateDisputeDo(dispute, community, account) {
  return async dispatch => {
    console.log('Fetch: CreateDispute');
    dispatch(requestCreateDispute());

    const disputeForm = jsonToFormData(dispute);

    disputeForm.append('community', community._id);

    let ethAddress;

    try {
      ethAddress = await createDispute(dispute, account, community.poolAddress);
    } catch (err) {
      console.log('ERR', err);
      return;
    }

    console.log(ethAddress);
    disputeForm.append('ethAddress', ethAddress);

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      request('post', apiRoutes.disputeList(), disputeForm, { 'content-type': 'multipart/form-data' })
    )
      .then(res => {
        dispatch(receiveCreateDispute(res.data));
        dispatch(push(`/dispute/${res.data.id}`));
      })
      .catch(err => {
        dispatch(failureCreateDispute(err));
        dispatch(push('/'));
      });
  };
}
