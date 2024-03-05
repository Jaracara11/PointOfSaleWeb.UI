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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get all products');
    }

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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get best seller products');
    }

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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get products sold by date');
    }

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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add product');
    }

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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update product');
    }

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteProduct = async (productID: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${productID}/delete`, {
      method: 'DELETE',
      headers: userAuthorizationHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete product');
    }
  } catch (error: any) {
    return Promise.reject(error);
  }
};
