import { getUserId, getUserShortUrl } from './index';

export default function (companyId) {
  return getUserId() === companyId || getUserShortUrl() === companyId;
}
