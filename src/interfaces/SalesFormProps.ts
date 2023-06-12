import { Product } from './inventory/product';

export interface SalesFormProps {
  removeFromCart: (productID: number) => void;
  products: Product[];
}
