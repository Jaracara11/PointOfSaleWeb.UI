import { UserInfo } from './UserInfo';
import { UserLogin } from './UserLogin';

export interface UserStore {
  user: UserInfo | null;
  signIn: (userData: UserLogin) => Promise<void>;
}
