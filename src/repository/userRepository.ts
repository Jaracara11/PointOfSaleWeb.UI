import axios from 'axios';
import { UserLogin } from '../interfaces/UserLogin';

const userURL = import.meta.env.VITE_API_URL + '/api/user';

export const login = async (userData: UserLogin): Promise<UserInfo> => {
  try {
    const response = await axios.post(`${userURL}/login`, userData);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response.data);
  }
};
