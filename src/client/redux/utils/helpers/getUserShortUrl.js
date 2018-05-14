import getUserInfo from './getUserInfo';
export default function () {
  const userInfo = getUserInfo();

  return (userInfo && userInfo.shortUrl) || '';
}
