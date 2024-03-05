import { UserLogin } from '../interfaces/user/UserLogin';
import { UserInfo } from '../interfaces/user/UserInfo';
import { userAuthorizationHeaders } from '../services/user.service';
import { UserPasswordChangeRequest } from '../interfaces/user/UserPasswordChangeRequest';
import { UserData } from '../interfaces/user/UserData';
import { UserRole } from '../interfaces/user/UserRole';

const API_URL = import.meta.env.VITE_API_URL + '/users';

export const loginUser = async (userData: UserLogin): Promise<UserInfo> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const response = await fetch(API_URL, {
      headers: userAuthorizationHeaders()
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getUserByUsername = async (username: string): Promise<UserData> => {
  try {
    const response = await fetch(`${API_URL}/${username}`, {
      headers: userAuthorizationHeaders()
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getUserRoles = async (): Promise<UserRole[]> => {
  try {
    const response = await fetch(`${API_URL}/roles`, {
      headers: userAuthorizationHeaders()
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const changeUserPassword = async (userData: UserPasswordChangeRequest): Promise<void> => {
  try {
    await fetch(`${API_URL}/change-password`, {
      method: 'PUT',
      headers: userAuthorizationHeaders(),
      body: JSON.stringify(userData)
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const resetUserPassword = async (userData: UserPasswordChangeRequest): Promise<void> => {
  try {
    await fetch(`${API_URL}/new-password`, {
      method: 'PUT',
      headers: userAuthorizationHeaders(),
      body: JSON.stringify(userData)
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const addUser = async (newUser: UserData): Promise<UserData> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: userAuthorizationHeaders(),
      body: JSON.stringify(newUser)
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateUser = async (user: UserData): Promise<UserData> => {
  try {
    const response = await fetch(`${API_URL}/edit`, {
      method: 'PUT',
      headers: userAuthorizationHeaders(),
      body: JSON.stringify(user)
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteUser = async (username: string): Promise<void> => {
  try {
    await fetch(`${API_URL}/${username}/delete`, {
      method: 'DELETE',
      headers: userAuthorizationHeaders()
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};
