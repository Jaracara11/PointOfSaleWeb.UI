import axios from 'axios';
import { Category } from '../interfaces/category/Category';
import { authorizationHeaders } from '../utils/httpRequest.helper';

const API_URL = import.meta.env.VITE_API_URL + '/category';

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: authorizationHeaders()
    });
    return response.data as Category[];
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const addCategory = async (newCategory: Category): Promise<Category> => {
  try {
    const response = await axios.post(API_URL, newCategory, {
      headers: authorizationHeaders()
    });
    return response.data as Category;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateCategory = async (category: Category): Promise<Category> => {
  try {
    const response = await axios.put(`${API_URL}/${category.categoryID}/edit`, category, {
      headers: authorizationHeaders()
    });
    return response.data as Category;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteCategory = async (categoryID: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${categoryID}/delete`, {
      headers: authorizationHeaders()
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};
