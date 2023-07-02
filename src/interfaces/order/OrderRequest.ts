import { OrderProduct } from './OrderProduct';

export interface OrderRequest {
  user: string;
  products: OrderProduct[];
  discount: number | null;
}
