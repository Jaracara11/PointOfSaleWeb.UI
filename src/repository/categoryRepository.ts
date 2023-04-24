import axios from 'axios';
import { Category } from '../interfaces/Category';
import { getUserAuth } from '../services/user.Service';

const API_URL = import.meta.env.VITE_API_URL + '/api/category/';

export const getAllCategories = async (): Promise<Category[]> => {
  const user = getUserAuth();

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    });
    return response.data as Category[];
  } catch (error: any) {
    return Promise.reject(error.response.data);
  }
};
