export default function (error) {
  let errorMsg = '';

  for (const property in error.errors) {
    if (error.errors.hasOwnProperty(property)) {
      errorMsg += error.errors[property].msg;
    }
  }

  return errorMsg ? errorMsg : error.message || '';
}
