import { UserData } from '../user/UserData';
import { UserRole } from '../user/UserRole';

export interface UpsertUserModalProps {
  toggle: () => void;
  user: UserData | null;
  roles: UserRole[];
}
