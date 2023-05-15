import { UserInfo } from '../user/UserInfo';
import { UserLogin } from '../user/UserLogin';

export interface UserContextData {
  user: UserInfo | null;
  signIn: (userData: UserLogin) => Promise<void>;
  signOut: () => void;
}
