import axios from 'axios';
import { Category } from '../interfaces/Category';
import { getUserAuth } from '../services/user.Service';
import { ErrorInfo } from '../interfaces/ErrorInfo';

const API_URL = import.meta.env.VITE_API_URL + '/category';

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
    const errorResponse: ErrorInfo = {
      status: error.response.status,
      statusText: error.response.statusText,
      data: error.response.data
    };

    return Promise.reject(errorResponse);
  }
};
