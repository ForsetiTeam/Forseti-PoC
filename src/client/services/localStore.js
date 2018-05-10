function setUser(user) {
  if (!localStorage) return false;
  localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
  if (!localStorage) return false;
  const user = localStorage.getItem('user');

  try {
    return JSON.parse(user);
  } catch (e) {
    return false;
  }
}

export {
  getUser,
  setUser
};
