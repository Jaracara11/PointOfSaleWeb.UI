import { UserRole } from '../interfaces/user/UserRole';

export const firstCharToUpper = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getUserRoleName = (userRoleID: number, roleList: UserRole[]) => {
  const userRole = (roleList || []).find((role) => role.roleID === userRoleID);
  return userRole ? userRole.roleName : '';
};
