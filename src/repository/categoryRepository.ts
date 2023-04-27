import axios from 'axios';
import { Category } from '../interfaces/Category';
import { getUserToken } from '../services/user.Service';

const API_URL = import.meta.env.VITE_API_URL + '/category';

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${getUserToken()}`
      }
    });
    return response.data as Category[];
  } catch (error: any) {
    return Promise.reject(error);
  }
};
