export default function () {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('token') || '';
  }
  return '';
}
