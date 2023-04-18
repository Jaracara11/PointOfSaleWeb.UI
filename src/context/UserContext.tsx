import { createContext } from 'react';

export const UserContext = createContext<UserInfo>({
  username: '',
  name: '',
  email: '',
  role: '',
  token: ''
});
