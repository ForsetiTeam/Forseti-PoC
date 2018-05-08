export default function (avatarUrl) {
  const splitedUrl = avatarUrl.split('/');
  const imageName = splitedUrl[splitedUrl.length - 1];
  const isDefaultAvatarFirst = imageName.indexOf('default-avatar') !== -1;
  const isDefaultAvatarSecond = imageName.indexOf('default-company-avatar') !== -1;

  return isDefaultAvatarFirst || isDefaultAvatarSecond;
}
