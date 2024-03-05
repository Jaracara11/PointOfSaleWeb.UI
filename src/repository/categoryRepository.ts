import { Category } from '../interfaces/inventory/Category';
import { userAuthorizationHeaders } from '../services/user.service';

const API_URL = import.meta.env.VITE_API_URL + '/categories';

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(API_URL, {
      headers: userAuthorizationHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch categories');
    }

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const addCategory = async (newCategory: Category): Promise<Category> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: userAuthorizationHeaders(),
      body: JSON.stringify(newCategory)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add category');
    }

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateCategory = async (category: Category): Promise<Category> => {
  try {
    const response = await fetch(`${API_URL}/edit`, {
      method: 'PUT',
      headers: userAuthorizationHeaders(),
      body: JSON.stringify(category)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update category');
    }

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteCategory = async (categoryID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${categoryID}/delete`, {
      method: 'DELETE',
      headers: userAuthorizationHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete category');
    }
  } catch (error: any) {
    return Promise.reject(error);
  }
};
