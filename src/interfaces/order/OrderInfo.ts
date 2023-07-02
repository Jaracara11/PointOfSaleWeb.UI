import { Product } from '../inventory/products/Product';
import { OrderProduct } from './OrderProduct';

export interface OrderInfo {
  orderID: string;
  user: string;
  products: Product[];
  orderSubTotal: number;
  discount?: number;
  orderTotal: number;
  orderDate: Date;
}
