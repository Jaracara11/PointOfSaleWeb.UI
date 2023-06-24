import { Product } from '../inventory/product';

export interface OrderFormProps {
  removeFromCart: (productID: number) => void;
  updateCartProduct: (updatedCartProducts: Product[]) => void;
  products: Product[];
}