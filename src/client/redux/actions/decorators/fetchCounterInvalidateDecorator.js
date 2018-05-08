import {
  getUserId,
  isMyCompany
}                                         from '../../utils/helpers';

export const INVALIDATE_MY_PARTNERS_COUNTERS = 'INVALIDATE_MY_PARTNERS_COUNTERS';
export const INVALIDATE_ANOTHER_PARTNERS_COUNTERS = 'INVALIDATE_ANOTHER_PARTNERS_COUNTERS';

function invalidatePartnersCounters(companyId) {
  return {
    type: isMyCompany(companyId) ? INVALIDATE_MY_PARTNERS_COUNTERS : INVALIDATE_ANOTHER_PARTNERS_COUNTERS,
    companyId
  };
}


export default function (dispatch, companyId = getUserId()) {
  return this
    .then(res => {
      if (dispatch) {
        dispatch(invalidatePartnersCounters(companyId));
      }
      return res;
    });
}
