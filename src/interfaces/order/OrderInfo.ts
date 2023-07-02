import { OrderProduct } from './OrderProduct';

export interface OrderInfo {
  orderID: string;
  user: string;
  products: OrderProduct[];
  orderSubTotal: number;
  discount?: number;
  orderTotal: number;
  orderDate: Date;
}
