import { Product } from '../inventory/product';

export interface OrderFormProps {
  removeFromCart: (productID: number) => void;
  products: Product[];
}
