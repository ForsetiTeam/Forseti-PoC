import axios from 'axios';

import config from '../../../config/config';

export function serverRequest(stages, reqConfig, parseResult, onSuccess) {
  return (dispatch, getState) => {

    dispatch({
      type: stages[0]
    });

    axios(reqConfig).then(
      async response => {
        const [error, result] = await parseResult(response.data, getState);

        if (error) {
          return dispatch({
            type: stages[2],
            error
          });
        } else {
          if (onSuccess) onSuccess(result, dispatch);
          dispatch(Object.assign(
            {type: stages[1]},
            result
          ));
        }

      },
      error => {
        dispatch({
          type: stages[2],
          error: error.message
        })
      }
    )
  }
}

export function serverAPIRequest(stages, reqConfig) {
  reqConfig.url = config;
  serverRequest(stages, reqConfig);
}