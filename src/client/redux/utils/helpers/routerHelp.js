export const POST_ROUTE = 'POST_ROUTE';
export const ANOTHER_ROUTE = 'ANOTHER_ROUTE';

export function setRoute(route) {
  localStorage.setItem('last_route', route);
}

export function getRoute() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('last_route');
  }
}
