import { Product } from '../inventory/product';

export interface Order {
  orderID?: string;
  user: string;
  products: Product[];
  discount: number | null;
  orderTotal: number;
  orderDate: Date;
}
