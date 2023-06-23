import './sales.css';
import { OrderForm } from '../../components/orderForm/OrderForm';
import { SalesTable } from '../../components/salesTable/SalesTable';
import { useState } from 'react';
import { Product } from '../../interfaces/inventory/product';

export const Sales = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const removeFromCart = (productID: number) =>
    setCartProducts((prevProducts) => prevProducts.filter((p) => p.productID !== productID));

  const updateCartProduct = (updatedCartProducts: Product[]) =>
    setCartProducts(updatedCartProducts);

  return (
    <>
      <h1 className="title">Sales</h1>
      <div className="sales-container">
        <SalesTable
          cartProducts={cartProducts}
          removeFromCart={removeFromCart}
          updateCartProduct={updateCartProduct}
        />

        <OrderForm
          products={cartProducts}
          updateCartProduct={updateCartProduct}
          removeFromCart={removeFromCart}
        />
      </div>
    </>
  );
};
