import axios from 'axios';
import { UserLogin } from '../interfaces/user/UserLogin';
import { UserInfo } from '../interfaces/user/UserInfo';
import { userAuthorizationHeaders } from '../services/user.service';
import { UserPasswordChangeRequest } from '../interfaces/user/UserPasswordChangeRequest';
import { UserData } from '../interfaces/user/UserData';
import { UserRole } from '../interfaces/user/UserRole';

const API_URL = import.meta.env.VITE_API_URL + '/users';

export const loginUser = async (userData: UserLogin): Promise<UserInfo> => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data as UserInfo;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: userAuthorizationHeaders()
    });
    return response.data as UserData[];
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getUserByUsername = async (username: string): Promise<UserData> => {
  try {
    const response = await axios.get(`${API_URL}/${username}`, {
      headers: userAuthorizationHeaders()
    });
    return response.data as UserData;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getUserRoles = async (): Promise<UserRole[]> => {
  try {
    const response = await axios.get(`${API_URL}/roles`, {
      headers: userAuthorizationHeaders()
    });
    return response.data as UserRole[];
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

export const resetUserPassword = async (userData: UserPasswordChangeRequest): Promise<void> => {
  try {
    await axios.put(`${API_URL}/new-password`, userData, {
      headers: userAuthorizationHeaders()
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const addUser = async (newUser: UserData): Promise<UserData> => {
  try {
    const response = await axios.post(`${API_URL}/register`, newUser, {
      headers: userAuthorizationHeaders()
    });
    return response.data as UserData;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateUser = async (user: UserData): Promise<UserData> => {
  try {
    const response = await axios.put(`${API_URL}/edit`, user, {
      headers: userAuthorizationHeaders()
    });
    return response.data as UserData;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteUser = async (username: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${username}/delete`, {
      headers: userAuthorizationHeaders()
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};
