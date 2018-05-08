import { browserHistory }          from 'react-router';
import {
  getUserId,
  getRouteFrom,
  ROUTE_FROM_PORTFOLIO,
  ROUTE_FROM_NEWS_FEED
}                                  from './';


export default function (news) {
  switch (getRouteFrom()) {
    case ROUTE_FROM_NEWS_FEED:
      browserHistory.push(`/id${getUserId()}#${news._id}`);
      break;
    case ROUTE_FROM_PORTFOLIO:
      if (news.project) {
        browserHistory.push(`/portfolio/${news.owner._id}/${news.project}`);
      } else {
        browserHistory.push(`/id${getUserId()}`);
      }
      break;
    default:
      console.log('unknown route');
      break;
  }
}
