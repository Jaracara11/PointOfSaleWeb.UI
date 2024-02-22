import axios from 'axios';
import { userAuthorizationHeaders } from '../services/user.service';
import { OrderInfo } from '../interfaces/order/OrderInfo';
import { OrderRequest } from '../interfaces/order/OrderRequest';
import { RecentOrder } from '../interfaces/order/RecentOrder';
import { parseProductsJSON } from '../utils/inventory.utils';

const API_URL = import.meta.env.VITE_API_URL + '/orders';

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

export const getOrdersByDate = async (
  initialDate: Date,
  finalDate: Date
): Promise<RecentOrder[]> => {
  try {
    const response = await axios.get(`${API_URL}/orders-by-date`, {
      params: {
        initialDate,
        finalDate
      },
      headers: userAuthorizationHeaders()
    });
    return response.data as RecentOrder[];
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getOrderByID = async (orderID: string): Promise<OrderInfo> => {
  try {
    const response = await axios.get(`${API_URL}/${orderID}`, {
      headers: userAuthorizationHeaders()
    });

    response.data.products = parseProductsJSON(response.data.products);

    return response.data as OrderInfo;
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

export const getSalesByDate = async (initialDate: Date, finalDate: Date): Promise<number> => {
  try {
    const response = await axios.get(`${API_URL}/sales-by-date`, {
      params: {
        initialDate,
        finalDate
      },
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

    response.data.products = parseProductsJSON(response.data.products);

    return response.data as OrderInfo;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const cancelOrder = async (orderID: string): Promise<void> => {
  try {
    await axios.post(
      `${API_URL}/${orderID}/cancel`,
      {},
      {
        headers: userAuthorizationHeaders()
      }
    );
  } catch (error: any) {
    return Promise.reject(error);
  }
};
