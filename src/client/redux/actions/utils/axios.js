import axios from 'axios';
import { getToken } from '../../../services/localStore';
const deepAssign = require('deep-assign');

axios.interceptors.response.use(undefined, err => {
  const res = err.response;

  if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
    return Promise.resolve(res);
  }
});

export default axios;

export function request(method, url, data = {}, other = {}) {
  let config = { method, url, headers: { Authorization: getToken() } };
  if (data) config[method === 'get' ? 'params' : 'data'] = data;

  config = deepAssign(config, other);
  config.validateStatus = status => {
    // return status >= 200 && status < 300 || status === 304;
    return status < 500;
  };

  return axios(config);
}

export function downloadFile(response) {
  const fileData = new Blob([ response.data ], { type: response.headers['content-type'] });
  const fileName = decodeURIComponent(
    response.headers['content-disposition']
      .split(';')
      .map(item => item.trim())
      .find(item => item.indexOf('filename') === 0)
      .split('=')[1]
      .replace(/"/g, '')
  );

  const url = window.URL.createObjectURL(fileData);
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
}
