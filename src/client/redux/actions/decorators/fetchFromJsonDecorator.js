
export default function () {
  return this
    .then(response => {
      return response.json();
    });
}
