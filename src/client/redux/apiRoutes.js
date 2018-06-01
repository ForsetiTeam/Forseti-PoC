// Routes to server api
export default {
  // version
  version:          ()              => '/api/version',
  // auth
  authLogin:        ()              => '/api/auth/login',
  authLogout:       ()              => '/api/auth/logout',
  authRegister:     ()              => '/api/auth/register',
  // community
  communityList:    ()              => '/api/community',
  community:        (communityName) => `/api/community/${communityName}`,
  // dispute
  disputeList:      ()              => '/api/dispute',
  dispute:          (disputeId)     => `/api/dispute/${disputeId}`,
  disputeDocument:  (disputeId)     => `/api/dispute/${disputeId}/document`,
  disputeVote:      (disputeId)     => `/api/dispute/${disputeId}/vote`,
  disputeStart:     (disputeId)     => `/api/dispute/${disputeId}/start`,
  disputeFinish:    (disputeId)     => `/api/dispute/${disputeId}/finish`
};
