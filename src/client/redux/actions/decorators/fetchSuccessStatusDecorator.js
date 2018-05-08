export default function () {
  return this
    .then(response => {
      if (response.status !== 200 && response.status !== 304) {
        return (response.statusText !== 'Bad Request') && (response.statusText !== 'Unprocessable Entity')
          ? Promise.reject(response.statusText)
          : Promise.reject(response.json());
      }
      return response;
    });
}
