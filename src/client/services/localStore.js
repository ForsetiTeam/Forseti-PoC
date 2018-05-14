const USER = 'user';
const TOKEN = 'token';

function setUser(user) {
  if (!localStorage) return false;
  localStorage.setItem(USER, JSON.stringify(user));
}

function setToken(token) {
  if (!localStorage) return false;
  localStorage.setItem(TOKEN, token);
}

function removeUser() {
  if (!localStorage) return false;
  localStorage.removeItem(USER);
}

function removeToken() {
  if (!localStorage) return false;
  localStorage.removeItem(TOKEN);
}

function getUser() {
  if (!localStorage) return false;
  const user = localStorage.getItem(USER);

  try {
    return JSON.parse(user);
  } catch (e) {
    return false;
  }
}

function getToken() {
  if (!localStorage) return false;
  return localStorage.getItem(TOKEN);
}

export {
  getUser,
  setUser,
  removeUser,
  getToken,
  setToken,
  removeToken
};
