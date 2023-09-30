import axios from 'axios';
import { Category } from '../interfaces/inventory/Category';
import { userAuthorizationHeaders } from '../services/user.Service';

const API_URL = import.meta.env.VITE_API_URL + '/categories';

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: userAuthorizationHeaders()
    });
    return response.data as Category[];
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const addCategory = async (newCategory: Category): Promise<Category> => {
  try {
    const response = await axios.post(API_URL, newCategory, {
      headers: userAuthorizationHeaders()
    });
    return response.data as Category;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateCategory = async (category: Category): Promise<Category> => {
  try {
    const response = await axios.put(`${API_URL}/edit`, category, {
      headers: userAuthorizationHeaders()
    });
    return response.data as Category;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteCategory = async (categoryID: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${categoryID}/delete`, {
      headers: userAuthorizationHeaders()
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};
