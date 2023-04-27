import { getUserAuth } from '../services/user.Service';

export const authorizationHeaders = () => {
  return {
    Authorization: `Bearer ${getUserAuth()?.token || ''}`
  };
};
