import { createContext, useContext, useEffect, useState } from 'react';
import { UserLogin } from '../interfaces/UserLogin';
import {
  deleteUserAuth,
  getUserAuth,
  setUserAuth
} from '../services/user.Service';
import { login } from '../repository/userRepository';

export const UserContext = createContext<any>(null);

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserInfo | null>(getUserAuth());

  const signIn = async (userData: UserLogin) => {
    const userInfo = await login(userData);
    setUser(userInfo);
    userInfo && setUserAuth(userInfo);
  };

  const signOut = () => deleteUserAuth();

  useEffect(() => {
    const user = getUserAuth();
    setUser(user);
  }, []);

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
