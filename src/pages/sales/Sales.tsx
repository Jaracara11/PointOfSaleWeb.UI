import './sales.css';
import { OrderForm } from '../../components/orderForm/OrderForm';
import { SalesTable } from '../../components/salesTable/SalesTable';
import { useState } from 'react';
import { Product } from '../../interfaces/inventory/product';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/UserContext';
import { swalMessageAlert } from '../../services/swal.service';

export const Sales = () => {
  const navigate = useNavigate();
  const { user } = UserAuth() || {};
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const removeFromCart = (productID: number) =>
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
