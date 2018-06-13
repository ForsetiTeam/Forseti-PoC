const ethUtil = require('ethereumjs-util');

import config from '../../../config/config';
import { checkPlugin } from '../../../services/metamask';
import { getMetamask, removeMetamask, setMetamask } from '../../../services/localStore';
import { fetchLoginDo } from '../auth/authLogin';
import { fetchLogout } from '../auth/authLogout';
import { fetchBalances } from './updateBalances';

export const METAMASK_FAILURE = 'METAMASK_FAILURE';
export const METAMASK_ACCOUNT_SUCCESS = 'METAMASK_ACCOUNT_SUCCESS';
export const METAMASK_SIG_REQUEST = 'METAMASK_SIG_REQUEST';
export const METAMASK_SIG_SUCCESS = 'METAMASK_SIG_SUCCESS';

function failureMetamask(error) {
  return {
    type: METAMASK_FAILURE,
    error
  };
}

function successMetamaskAccount(account) {
  return {
    type: METAMASK_ACCOUNT_SUCCESS,
    account
  };
}

function requestMetamaskSig() {
  return {
    type: METAMASK_SIG_REQUEST
  };
}

function successMetamaskSig(sig) {
  return {
    type: METAMASK_SIG_SUCCESS,
    sig
  };
}

// главная функция для обработки аккаунта
export function fetchProcessAccount() {
  return processAccount;
}

export function fetchRequestSig() {
  return processSig;
}

function processAccount(dispatch, getState) {
  listenAccount((error, account) => {
    if (error) return dispatch(failureMetamask(error));

    dispatch(successMetamaskAccount(account));

    const storedData = getMetamask();

    if (storedData && storedData.account === account) {
      dispatch(successMetamaskSig(storedData.sig));
      fetchBalances(dispatch);
    } else {
      removeMetamask();
      dispatch(fetchLogout());
      processSig(dispatch, getState);
    }
  });
}

function processSig(dispatch, getState) {
  const account = getState().metamask.account;
  if (!account) return;

  dispatch(requestMetamaskSig());
  requestSig(account).then(sig => {
    setMetamask(account, sig);
    dispatch(successMetamaskSig(sig));
    dispatch(fetchLoginDo(account, sig));
    fetchBalances(dispatch);
  }).catch(error => {
    dispatch(failureMetamask(error));
  });
}

function listenAccount(onChange) {
  let currentAccount = null;

  function loadAccountWithTimeout() {
    window.web3.eth.getAccounts((error, accounts) => {
      if (error) return onChange(error);
      const account = (accounts || [])[0];

      if (account !== currentAccount) {
        currentAccount = account;
        console.log('GET METAMASK ACCOUNT', account);
        onChange(null, account);
      }
      setTimeout(() => loadAccountWithTimeout(), 1000);
    });
  }

  if (!checkPlugin()) return onChange('no plugin');
  loadAccountWithTimeout();
}

function requestSig(account) {
  const sigPhrase = config.get('metamask.sigPhrase');

  return new Promise((resolve, reject) => {
    const data = ethUtil.bufferToHex(new Buffer(sigPhrase, 'utf8'));

    window.web3.currentProvider.sendAsync(
      {
        method: 'personal_sign',
        params: [data, account],
        from: account
      },
      (error, result) => {
        error = error || result.error;
        if (error) return reject(error);

        resolve(result.result);
      }
    );
  });
}
