import getUserInfo from './getUserInfo';

export default function (key, value) {
  const userInfo = getUserInfo();

  userInfo[key] = value;
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}
