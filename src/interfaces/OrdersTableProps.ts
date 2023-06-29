import { Product } from './inventory/product';

export interface OrdersTableProps {
  removeFromCart: (productID: number) => void;
  updateCartProduct: (updatedCartProducts: Product[]) => void;
  cartProducts: Product[];
}
