import './orders.css';
import { OrderForm } from '../../components/orderForm/OrderForm';
import { OrdersTable } from '../../components/ordersTable/OrdersTable';
import { useState } from 'react';
import { Product } from '../../interfaces/inventory/products/Product';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/UserContext';
import { swalMessageAlert } from '../../services/swal.service';

export const Orders = () => {
  const navigate = useNavigate();
  const { user } = UserAuth() || {};
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const removeFromCart = (productID: string) =>
    setCartProducts((prevProducts) => prevProducts.filter((p) => p.productID !== productID));

  const updateCartProduct = (updatedCartProducts: Product[]) =>
    setCartProducts(updatedCartProducts);

  if ((user && user.role === 'Unassigned') || !user) {
    swalMessageAlert('Your user does not have permission to view this page', 'warning').then(() =>
      navigate('/home')
    );
  }

  return (
    <>
      <h1 className="title">Orders</h1>
      <div className="orders-container">
        <OrdersTable
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
