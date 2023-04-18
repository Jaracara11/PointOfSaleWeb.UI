export const getUserAuth = (): UserInfo | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUserAuth = (userInfo: UserInfo) =>
  localStorage.setItem('user', JSON.stringify(userInfo));
