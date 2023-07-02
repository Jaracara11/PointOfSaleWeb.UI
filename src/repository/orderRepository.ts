import axios from 'axios';
import { userAuthorizationHeaders } from '../services/user.Service';
import { OrderInfo } from '../interfaces/order/OrderInfo';
import { OrderRequest } from '../interfaces/order/OrderRequest';
import { RecentOrder } from '../interfaces/order/RecentOrder';
import { BestSellerProduct } from '../interfaces/inventory/products/BestSellerProduct';
import { parseProductsFromString } from '../utils/inventory.helper';
import { OrderProduct } from '../interfaces/order/OrderProduct';

const API_URL = import.meta.env.VITE_API_URL + '/order';

export const GetAvailableDiscounts = async (username: string): Promise<number[]> => {
  try {
    const response = await axios.get(`${API_URL}/discounts/${username}`, {
      headers: userAuthorizationHeaders()
    });
    return response.data as number[];
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getRecentOrders = async (): Promise<RecentOrder[]> => {
  try {
    const response = await axios.get(`${API_URL}/recent-orders`, {
      headers: userAuthorizationHeaders()
    });
    return response.data as RecentOrder[];
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

export const getOrderByID = async (orderID: string): Promise<OrderInfo> => {
  try {
    const response = await axios.get(`${API_URL}/${orderID}`, {
      headers: userAuthorizationHeaders()
    });

    const products: OrderProduct[] = JSON.parse(response.data.products).map((product: any) => {
      return {
        productName: product.ProductName,
        productDescription: product.ProductDescription,
        productQuantity: product.ProductQuantity,
        productPrice: product.ProductPrice,
        productCategory: product.ProductCategoryName
      };
    });

    const orderInfo: OrderInfo = {
      orderID: response.data.orderID,
      user: response.data.user,
      products: products,
      orderSubTotal: response.data.orderSubTotal,
      discount: response.data.discount,
      orderTotal: response.data.orderTotal,
      orderDate: new Date(response.data.orderDate)
    };

    return orderInfo;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getTotalSalesOfTheDay = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_URL}/sales-today`, {
      headers: userAuthorizationHeaders()
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const checkoutOrder = async (order: OrderRequest): Promise<OrderInfo> => {
  try {
    const response = await axios.post(`${API_URL}/checkout-order`, order, {
      headers: userAuthorizationHeaders()
    });
    return response.data as OrderInfo;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
