import { UserInfo } from '../user/UserInfo';
import { UserLogin } from '../user/UserLogin';

export interface UserStore {
  user: UserInfo | null;
  signIn: (userData: UserLogin) => Promise<void>;
}
