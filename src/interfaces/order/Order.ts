import { Product } from '../inventory/product';

export interface Order {
  orderID?: string;
  user: string;
  products: Product[];
  discount?: number;
  orderTotal: number;
  orderDate: Date;
}
