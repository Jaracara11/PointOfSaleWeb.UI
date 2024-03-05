import { Product } from '../interfaces/inventory/products/Product';
import { userAuthorizationHeaders } from '../services/user.service';
import { BestSellerProduct } from '../interfaces/inventory/products/BestSellerProduct';
import { ProductSold } from '../interfaces/inventory/products/ProductSold';

const API_URL = import.meta.env.VITE_API_URL + '/products';

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL, {
      headers: userAuthorizationHeaders()
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getBestSellerProducts = async (): Promise<BestSellerProduct[]> => {
  try {
    const response = await fetch(`${API_URL}/best-sellers`, {
      headers: userAuthorizationHeaders()
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getProductsSoldByDate = async (
  initialDate: Date,
  finalDate: Date
): Promise<ProductSold[]> => {
  try {
    const response = await fetch(
      `${API_URL}/sold-by-date?initialDate=${initialDate.toISOString()}&finalDate=${finalDate.toISOString()}`,
      {
        headers: userAuthorizationHeaders()
      }
    );

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const addProduct = async (newProduct: Product): Promise<Product> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: userAuthorizationHeaders(),
      body: JSON.stringify(newProduct)
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/edit`, {
      method: 'PUT',
      headers: userAuthorizationHeaders(),
      body: JSON.stringify(product)
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteProduct = async (productID: string): Promise<void> => {
  try {
    await fetch(`${API_URL}/${productID}/delete`, {
      method: 'DELETE',
      headers: userAuthorizationHeaders()
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};
