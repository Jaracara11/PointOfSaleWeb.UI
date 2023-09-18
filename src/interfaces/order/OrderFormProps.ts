import { Product } from '../inventory/products/Product';

export interface OrderFormProps {
  removeFromCart: (productID: string) => void;
  updateCartProduct: (updatedCartProducts: Product[]) => void;
  products: Product[];
}
