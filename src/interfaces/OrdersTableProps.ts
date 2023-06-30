import { Product } from './inventory/products/Product';

export interface OrdersTableProps {
  removeFromCart: (productID: number) => void;
  updateCartProduct: (updatedCartProducts: Product[]) => void;
  cartProducts: Product[];
}
