import axios from 'axios';
import { getToken } from '../../../services/localStore';

axios.interceptors.response.use(undefined, err => {
  const res = err.response;

  if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
    return Promise.resolve(res);
  }
});

export default axios;

export function request(method, url, data = {}, headers = {}) {
  const config = { method, url };

  config.headers = { Authorization: getToken() };
  if (data) config[method === 'get' ? 'params' : 'data'] = data;
  config.headers = Object.assign(config.headers || {}, headers);
  config.validateStatus = status => {
    return status >= 200 && status < 300 || status === 304;
  };

  return axios(config);
}

export function downloadFile(response) {
  const fileData = new Blob([ response.data ], { type: 'text/plain' });
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
