import { Product } from './inventory/product';

export interface SalesTableProps {
  removeFromCart: (productID: number) => void;
  updateCartProduct: (updatedCartProducts: Product[]) => void;
  cartProducts: Product[];
}
