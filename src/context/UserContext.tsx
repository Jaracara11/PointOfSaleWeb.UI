import { createContext, useContext, useEffect, useState } from 'react';
import { getUserAuth, setUserAuth } from '../services/user.service';
import { loginUser } from '../repository/userRepository';
import { UserInfo } from '../interfaces/user/UserInfo';
import { UserContextData } from '../interfaces/user/UserContextData';
import { UserContextProviderProps } from '../interfaces/user/UserContextProviderProps';
import { UserLogin } from '../interfaces/user/UserLogin';

export const UserContext = createContext<UserContextData | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<UserInfo | null>(getUserAuth());

  const signIn = async (userData: UserLogin) => {
    const userInfo = await loginUser(userData);
    setUser(userInfo);
    userInfo && setUserAuth(userInfo);
  };

  useEffect(() => {
    const user = getUserAuth();
    setUser(user);
  }, []);

  return <UserContext.Provider value={{ user, signIn }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
