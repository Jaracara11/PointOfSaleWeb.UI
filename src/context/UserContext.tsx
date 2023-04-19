import { createContext, useState } from 'react';
import { UserLogin } from '../interfaces/UserLogin';
import { login } from '../repository/userRepository';
import { setUserAuth, deleteUserAuth } from '../services/user.Service';

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserInfo>();

  const signIn = async (userData: UserLogin) => {
    const loggedUser = await login(userData);
    setUser(loggedUser);
    setUserAuth(loggedUser);
  };

  const signOut = () => deleteUserAuth();

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
