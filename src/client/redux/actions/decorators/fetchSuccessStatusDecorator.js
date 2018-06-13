export default function (resp) {
  return resp
    .then(response => {
      if (response.status !== 200 && response.status !== 304) {
        if (response.data && response.data.message) return Promise.reject(response.data);
        return (response.statusText !== 'Bad Request') && (response.statusText !== 'Unprocessable Entity')
          ? Promise.reject({ message: response.statusText })
          : Promise.reject({ message: response.json() });
      }
      return response;
    });
}
