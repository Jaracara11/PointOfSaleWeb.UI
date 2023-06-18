import axios from 'axios';
import { userAuthorizationHeaders } from '../services/user.Service';

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
