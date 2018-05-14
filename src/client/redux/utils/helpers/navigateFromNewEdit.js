export const ROUTE_FROM_NEWS_FEED = 'ROUTE_FROM_NEWS_FEED';
export const ROUTE_FROM_PORTFOLIO = 'ROUTE_FROM_PORTFOLIO';


export function setRouteFrom(route) {
  localStorage.setItem('route', route);
}

export function getRouteFrom() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('route') || '/';
  }
  return '/';
}
