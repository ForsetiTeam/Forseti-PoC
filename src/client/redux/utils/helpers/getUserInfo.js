export default function () {
  if (typeof localStorage !== 'undefined') {
    return JSON.parse(localStorage.getItem('userInfo')) || {};
  }
  return {};
}
