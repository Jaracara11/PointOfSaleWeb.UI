export const userAuth = (): boolean => {
  const user = localStorage.getItem('user');
  return user ? true : false;
};

export const setUserAuth = (userInfo: UserInfo) =>
  localStorage.setItem('user', JSON.stringify(userInfo));
