import { createContext, useContext, useEffect, useState } from 'react';
import { UserLogin } from '../interfaces/user/UserLogin';
import {
  deleteUserAuth,
  getUserAuth,
  setUserAuth
} from '../services/user.Service';
import { login } from '../repository/userRepository';
import { UserInfo } from '../interfaces/user/UserInfo';
import { UserContextData } from '../interfaces/userContext/UserContextData';
import { UserContextProviderProps } from '../interfaces/userContext/UserContextProviderProps';

export const UserContext = createContext<UserContextData | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
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
