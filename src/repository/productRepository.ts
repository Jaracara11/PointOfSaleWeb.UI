import axios from 'axios';
import { Product } from '../interfaces/product';
import { authorizationHeaders } from '../utils/httpRequest.helper';

const API_URL = import.meta.env.VITE_API_URL + '/product';

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: authorizationHeaders()
    });
    return response.data as Product[];
  } catch (error: any) {
    return Promise.reject(error);
  }
};
