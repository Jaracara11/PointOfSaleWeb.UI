import { Product } from '../inventory/product';

export interface Order {
  orderID?: string;
  user: string;
  products: Product[];
  orderSubtotal: number;
  discount: number | null;
  orderTotal: number;
  orderDate?: string;
}
