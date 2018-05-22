import { waitLoadAccount } from '../../../services/metamask';

export const REQUEST_METAMASK_LOADING = 'REQUEST_METAMASK_LOADING';
export const REQUEST_METAMASK_SUCCESS = 'REQUEST_METAMASK_SUCCESS';

function requestLoadMetamask() {
  return {
    type: REQUEST_METAMASK_LOADING
  };
}

function receiveLoadMetamask() {
  return {
    type: REQUEST_METAMASK_SUCCESS
  };
}

export function fetchLoadMetamask() {
  return (dispatch, getState) => {
    if (shouldFetchCreateDispute(getState())) {
      return dispatch(fetchLoadMetamaskDo());
    }
  };
}

function shouldFetchCreateDispute(state) {
  return !state.metamask.loading;
}

function fetchLoadMetamaskDo() {
  return dispatch => {
    console.log('Fetch: LoadMetamask');
    dispatch(requestLoadMetamask());

    waitLoadAccount().then(() =>
      dispatch(receiveLoadMetamask())
    );
  };
}
