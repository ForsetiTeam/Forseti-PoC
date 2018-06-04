export default function (resp) {
  return resp
    .then(response => {
      if (response.status !== 200 && response.status !== 304) {
        if (response.data && response.data.message) return Promise.reject(response.data.message);
        return (response.statusText !== 'Bad Request') && (response.statusText !== 'Unprocessable Entity')
          ? Promise.reject(response.statusText)
          : Promise.reject(response.json());
      }
      return response;
    });
}
