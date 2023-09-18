import { Product } from './inventory/products/Product';

export interface OrdersTableProps {
  removeFromCart: (productID: string) => void;
  updateCartProduct: (updatedCartProducts: Product[]) => void;
  cartProducts: Product[];
}
