import axios from 'axios';
import { UserLogin } from '../interfaces/user/UserLogin';
import { UserInfo } from '../interfaces/user/UserInfo';

const USER_URL = import.meta.env.VITE_API_URL + '/user';

export const login = async (userData: UserLogin): Promise<UserInfo> => {
  try {
    const response = await axios.post(`${USER_URL}/login`, userData);
    return response.data as UserInfo;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
