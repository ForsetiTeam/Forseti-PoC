export default function (resp) {
  return resp
    .then(response => {
      return response.json();
    });
}
