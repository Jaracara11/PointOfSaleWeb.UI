import { Product } from '../inventory/product';

export interface OrderInfo {
  orderID: string;
  user: string;
  products: Product[];
  orderSubTotal: number;
  discount?: number;
  orderTotal: number;
  orderDate: Date;
}
