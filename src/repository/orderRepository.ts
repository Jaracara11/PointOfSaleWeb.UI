import { userAuthorizationHeaders } from '../services/user.service';
import { OrderInfo } from '../interfaces/order/OrderInfo';
import { OrderRequest } from '../interfaces/order/OrderRequest';
import { RecentOrder } from '../interfaces/order/RecentOrder';
import { parseProductsJSON } from '../utils/inventory.utils';

const API_URL = import.meta.env.VITE_API_URL + '/orders';

export const GetAvailableDiscounts = async (username: string): Promise<number[]> => {
  try {
    const response = await fetch(`${API_URL}/discounts/${username}`, {
      headers: userAuthorizationHeaders()
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getRecentOrders = async (): Promise<RecentOrder[]> => {
  try {
    const response = await fetch(`${API_URL}/recent-orders`, {
      headers: userAuthorizationHeaders()
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getOrdersByDate = async (
  initialDate: Date,
  finalDate: Date
): Promise<RecentOrder[]> => {
  try {
    const response = await fetch(
      `${API_URL}/orders-by-date?initialDate=${initialDate.toISOString()}&finalDate=${finalDate.toISOString()}`,
      {
        headers: userAuthorizationHeaders()
      }
    );

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getOrderByID = async (orderID: string): Promise<OrderInfo> => {
  try {
    const response = await fetch(`${API_URL}/${orderID}`, {
      headers: userAuthorizationHeaders()
    });

    const orderInfo = await response.json();
    orderInfo.products = parseProductsJSON(orderInfo.products);

    return orderInfo;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getTotalSalesOfTheDay = async (): Promise<number> => {
  try {
    const response = await fetch(`${API_URL}/sales-today`, {
      headers: userAuthorizationHeaders()
    });

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getSalesByDate = async (initialDate: Date, finalDate: Date): Promise<number> => {
  try {
    const response = await fetch(
      `${API_URL}/sales-by-date?initialDate=${initialDate.toISOString()}&finalDate=${finalDate.toISOString()}`,
      {
        headers: userAuthorizationHeaders()
      }
    );

    return response.json();
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const checkoutOrder = async (order: OrderRequest): Promise<OrderInfo> => {
  try {
    const response = await fetch(`${API_URL}/checkout-order`, {
      method: 'POST',
      headers: userAuthorizationHeaders(),
      body: JSON.stringify(order)
    });

    const orderInfo = await response.json();
    orderInfo.products = parseProductsJSON(orderInfo.products);

    return orderInfo;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const cancelOrder = async (orderID: string): Promise<void> => {
  try {
    await fetch(`${API_URL}/${orderID}/cancel`, {
      method: 'POST',
      headers: userAuthorizationHeaders()
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};
