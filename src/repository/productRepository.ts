import axios from 'axios';
import { Product } from '../interfaces/inventory/products/Product';
import { userAuthorizationHeaders } from '../services/user.service';
import { BestSellerProduct } from '../interfaces/inventory/products/BestSellerProduct';
import { ProductSold } from '../interfaces/inventory/products/ProductSold';

const API_URL = import.meta.env.VITE_API_URL + '/products';

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

export const getBestSellerProducts = async (): Promise<BestSellerProduct[]> => {
  try {
    const response = await axios.get(`${API_URL}/best-sellers`, {
      headers: userAuthorizationHeaders()
    });
    return response.data as BestSellerProduct[];
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getProductsSoldByDate = async (
  initialDate: Date,
  finalDate: Date
): Promise<ProductSold[]> => {
  try {
    const response = await axios.get(`${API_URL}/sold-by-date`, {
      params: {
        initialDate,
        finalDate
      },
      headers: userAuthorizationHeaders()
    });
    return response.data as ProductSold[];
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
    const response = await axios.put(`${API_URL}/edit`, product, {
      headers: userAuthorizationHeaders()
    });
    return response.data as Product;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteProduct = async (productID: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${productID}/delete`, {
      headers: userAuthorizationHeaders()
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};
