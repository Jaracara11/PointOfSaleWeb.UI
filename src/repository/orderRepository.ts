import axios from 'axios';
import { userAuthorizationHeaders } from '../services/user.Service';
import { OrderInfo } from '../interfaces/order/OrderInfo';
import { OrderRequest } from '../interfaces/order/OrderRequest';
import { RecentOrder } from '../interfaces/order/RecentOrder';

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
