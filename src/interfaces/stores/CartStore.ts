import { Product } from '../inventory/products/Product';

export interface CartStore {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCart: (updatedCartProducts: Product[]) => void;
  clearCart: () => void;
}
