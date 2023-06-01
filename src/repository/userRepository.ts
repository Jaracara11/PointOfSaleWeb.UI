import axios from 'axios';
import { UserLogin } from '../interfaces/user/UserLogin';
import { UserInfo } from '../interfaces/user/UserInfo';
import { userAuthorizationHeaders } from '../services/user.Service';
import { UserPasswordChangeRequest } from '../interfaces/user/UserPasswordChangeRequest';

const API_URL = import.meta.env.VITE_API_URL + '/user';

export const loginUser = async (userData: UserLogin): Promise<UserInfo> => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data as UserInfo;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const changeUserPassword = async (userData: UserPasswordChangeRequest): Promise<void> => {
  try {
    await axios.put(`${API_URL}/change-password`, userData, {
      headers: userAuthorizationHeaders()
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getAllUsers = async (): Promise<UserInfo[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: userAuthorizationHeaders()
    });
    return response.data as UserInfo[];
  } catch (error: any) {
    return Promise.reject(error);
  }
};
