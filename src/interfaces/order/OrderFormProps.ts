import { Product } from '../inventory/products/Product';

export interface OrderFormProps {
  removeFromCart: (productID: number) => void;
  updateCartProduct: (updatedCartProducts: Product[]) => void;
  products: Product[];
}
