import { UserInfo } from './UserInfo';
import { UserLogin } from './UserLogin';

export interface UserContextData {
  user: UserInfo | null;
  signIn: (userData: UserLogin) => Promise<void>;
}
