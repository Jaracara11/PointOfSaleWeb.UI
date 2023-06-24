import axios from 'axios';
import { userAuthorizationHeaders } from '../services/user.Service';
import { Order } from '../interfaces/order/OrderRequest';

const API_URL = import.meta.env.VITE_API_URL + '/sale';

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

export const checkoutOrder = async (order: Order): Promise<Order> => {
  try {
    const response = await axios.post(`${API_URL}/checkout-order`, order, {
      headers: userAuthorizationHeaders()
    });
    return response.data as Order;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
