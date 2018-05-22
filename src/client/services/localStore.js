const USER = 'user';
const TOKEN = 'token';
const METAMASK = 'metamask';

export function setUser(user) {
  if (!localStorage) return false;
  localStorage.setItem(USER, JSON.stringify(user));
}

export function setToken(token) {
  if (!localStorage) return false;
  localStorage.setItem(TOKEN, token);
}

export function setMetamask(account, sig) {
  if (!localStorage) return false;
  localStorage.setItem(METAMASK, JSON.stringify({ account, sig }));
}

export function removeUser() {
  if (!localStorage) return false;
  localStorage.removeItem(USER);
}

export function removeToken() {
  if (!localStorage) return false;
  localStorage.removeItem(TOKEN);
}

export function removeMetamask() {
  if (!localStorage) return false;
  localStorage.removeItem(METAMASK);
}

function getJSONItem(name) {
  if (!localStorage) return false;
  const item = localStorage.getItem(name);

  try {
    return JSON.parse(item);
  } catch (e) {
    return false;
  }
}

export function getUser() {
  return getJSONItem(USER);
}

export function getToken() {
  if (!localStorage) return false;
  return localStorage.getItem(TOKEN);
}

export function getMetamask() {
  return getJSONItem(METAMASK);
}
