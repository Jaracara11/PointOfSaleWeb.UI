import axios from 'axios';
import { UserLogin } from '../interfaces/UserLogin';

const apiURL = import.meta.env.VITE_API_URL;

export const login = async (userData: UserLogin): Promise<UserInfo> => {
  try {
    console.log(`${apiURL}/login`);
    const response = await axios.post(`${apiURL}/login`, userData);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.message);
  }
};
