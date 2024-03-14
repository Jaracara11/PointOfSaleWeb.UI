import { create } from 'zustand';
import { CartStore } from '../interfaces/stores/CartStore';
import { Product } from '../interfaces/inventory/products/Product';

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (product: Product) => {
    product.productQuantity = 1;
    set((state) => ({ cart: [...state.cart, product] }));
  },
  removeFromCart: (productId: string) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.productID !== productId)
    })),
  updateCart: (updatedCartProducts: Product[]) => set({ cart: updatedCartProducts }),
  clearCart: () => set({ cart: [] })
}));
