import isBrowser                              from './isBrowser';
import isLoaded                               from './isLoaded';
import getToken                               from './getToken';
import setToken                               from './setToken';
import getUserId                              from './getUserId';
import getUserShortUrl                        from './getUserShortUrl';
import setUserId                              from './setUserId';
import logout                                 from './logout';
import getAvatarUrl                           from './getAvatarUrl';
import clearSingleNews                        from './clearSingleNews';
import {
  transformObjectWithHtmlEntities,
  decodeStringWithHtmlEntities
}                                             from './transformObjectWithHtmlEntities';
import isDefaultUserAvatar                    from './isDefaultUserAvatar';
import getUserInfo                            from './getUserInfo';
import setUserInfo                            from './setUserInfo';
import transformArrayObjectsWithHtmlEntities  from './transformArrayObjectsWithHtmlEntities';
import isReachedBottomWindow                  from './isReachedBottomWindow';
import isLoggin                               from './isLoggin';
import transformObjectToHtmlEntities,
{ encodeStringWithHtmlEntities }              from './transformObjectToHtmlEntities';
import isMyCompany                            from './isMyCompany';
import isPerson                               from './isPerson';
import getMatchLinkDataMessage                from './getMatchLinkDataMessage';
import {
  setRouteFrom,
  getRouteFrom,
  ROUTE_FROM_NEWS_FEED,
  ROUTE_FROM_PORTFOLIO
}                                             from './navigateFromNewEdit';
import {
  getRoute,
  setRoute,
  POST_ROUTE,
  ANOTHER_ROUTE
}                                             from './routerHelp';
import routeFromNewEdit                       from './routeFromNewEdit';
import getErrorValidation                     from './getErrorValidation';
import chunkString                            from './chunkString';
import * as isReachedEdge                     from './isReachedEdgeElement';
import  * as messageStorage                   from './messageStorage';

export {
  isBrowser,
  isLoaded,
  getToken,
  setToken,
  getUserId,
  getUserShortUrl,
  setUserId,
  logout,
  getAvatarUrl,
  encodeStringWithHtmlEntities,
  decodeStringWithHtmlEntities,
  transformObjectWithHtmlEntities,
  transformArrayObjectsWithHtmlEntities,
  transformObjectToHtmlEntities,
  clearSingleNews,
  isDefaultUserAvatar,
  getUserInfo,
  setUserInfo,
  isReachedBottomWindow,
  isLoggin,
  isMyCompany,
  isPerson,

  setRouteFrom,
  getRouteFrom,
  ROUTE_FROM_NEWS_FEED,
  ROUTE_FROM_PORTFOLIO,

  setRoute,
  getRoute,
  POST_ROUTE,
  ANOTHER_ROUTE,

  routeFromNewEdit,

  getErrorValidation,
  isReachedEdge,
  messageStorage,
  chunkString,

  getMatchLinkDataMessage
};
