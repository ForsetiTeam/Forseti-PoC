import fetch              from 'isomorphic-fetch';

import config from '../../config/config';
import {
  fetchDecorator
}                         from '../actions/decorators';

export const REQUEST_API_TYPE = 'REQUEST_API_TYPE';

export default function requestMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { type, endpoint,
      fetchOptions, decorators,
      shouldFetch, types, ...rest } = action;

    if (type !== REQUEST_API_TYPE || !types) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    if (typeof shouldFetch === 'function' && !shouldFetch()
      || typeof shouldFetch === 'boolean' && !shouldFetch) {
      // Вернуть пустой промис, если фетч не произошел. Нужно для возможных .then в компонентах
      return Promise.resolve();
    }

    if (REQUEST.func) {
      REQUEST.func(dispatch);
    }

    /* eslint-disable callback-return */
    next({ ...rest, type: REQUEST.name });
    /* eslint-enable callback-return */

    return fetchDecorator(decorators,
      fetch(`${config.get('serverAPI')}${endpoint}`, fetchOptions))
      .then((result) => {
        if (SUCCESS.func) {
          SUCCESS.func(result, dispatch);
        }
        return next({ ...rest, result, type: SUCCESS.name });
      })
      .catch((error) => {
        if (FAILURE.func) {
          if (typeof error === 'object' && error.then) {
            error.then((message) => {
              FAILURE.func(message, dispatch);
              return next({ ...rest, error: message, type: FAILURE.name });
            });
          } else if (typeof error === 'object') {
            const errorString = String(error) === 'TypeError: Failed to fetch' ? 'Ошибка соединения' : String(error);

            FAILURE.func(errorString, dispatch);
            return next({ ...rest, error: errorString, type: FAILURE.name });
          } else {
            FAILURE.func(error, dispatch);
            return next({ ...rest, error, type: FAILURE.name });
          }
        }
      });
  };
}

// Api middleware usage. // TODO подумать как лучше вызывать callback dispatch или передавать коллбекам dispatch
// const test = {
//   type: REQUEST_API_TYPE,
//   endpoint: '/messages/dialog',
//   fetchOptions: {
//     method: '',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': (state) => state.session.cookies.jwt
//     },
//     credentials: 'same-origin',
//     body: {
//       text: '321321321'
//     }
//   },
//   decorators: [],
//   shouldFetch: () => true,
//   types: [ {
//     name: 'REQUEST',
//     func: () => {}
//   },
//   {
//     name: 'SUCCESS',
//     func: () => {}
//   },
//   {
//     name: 'FAILURE',
//     func: () => {}
//   }
//   ]
// };
