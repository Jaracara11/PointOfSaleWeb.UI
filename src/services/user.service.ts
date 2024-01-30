import { UserInfo } from '../interfaces/user/UserInfo';
import { UserRole } from '../interfaces/user/UserRole';

export const getUserAuth = (): UserInfo | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUserAuth = (userInfo: UserInfo) =>
  localStorage.setItem('user', JSON.stringify(userInfo));

export const deleteUserAuth = (): void => localStorage.removeItem('user');

export const validateUserRolePermission = (roles: string[]) =>
  roles.includes(getUserAuth()?.role || '');

export const getUserRoleName = (userRoleID: number, roleList: UserRole[]) => {
  const userRole = (roleList || []).find((role) => role.roleID === userRoleID);
  return userRole ? userRole.roleName : '';
};

export const userAuthorizationHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getUserAuth()?.token || ''}`
  };
};
