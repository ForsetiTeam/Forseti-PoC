// Routes to server api
export default {
  // version
  version:         ()              => '/api/version',
  // auth
  authLogin:       ()              => '/api/auth/login',
  authLogout:      ()              => '/api/auth/logout',
  authRegister:    ()              => '/api/auth/register',
  // community
  communityList:   ()              => '/api/community',
  community:       (communityName) => `/api/community/${communityName}`,
  communityJoin:   (communityName) => `/api/community/${communityName}/join`,
  // dispute
  disputeList:     ()              => '/api/dispute',
  dispute:         (disputeId)     => `/api/dispute/${disputeId}`,
  disputeDocument: (disputeId)     => `/api/dispute/${disputeId}/document`
};
