import { Product } from '../inventory/products/Product';

export interface OrderInfo {
  orderID: string;
  user: string;
  products: Product[];
  orderSubTotal: number;
  discount?: number;
  orderTotal: number;
  orderDate: Date;
}
