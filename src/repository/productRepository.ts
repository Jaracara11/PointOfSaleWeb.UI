import axios from 'axios';
import { Product } from '../interfaces/product';
import { userAuthorizationHeaders } from '../services/user.Service';

const API_URL = import.meta.env.VITE_API_URL + '/product';

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: userAuthorizationHeaders()
    });
    return response.data as Product[];
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const addProduct = async (newProduct: Product): Promise<Product> => {
  try {
    const response = await axios.post(API_URL, newProduct, {
      headers: userAuthorizationHeaders()
    });
    return response.data as Product;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axios.put(`${API_URL}/${product.productID}/edit`, product, {
      headers: userAuthorizationHeaders()
    });
    return response.data as Product;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
