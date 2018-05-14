import { getUserInfo } from './index';

export default function () {
  return getUserInfo().type === 2;
}
