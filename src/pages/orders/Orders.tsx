import './orders.css';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/user.store';
import { Product } from '../../interfaces/inventory/products/Product';
import { useGetDiscountsByUser, useNewOrder } from '../../hooks/orders.hooks';
import { useGetProducts } from '../../hooks/products.hooks';
import { useGetCategories } from '../../hooks/categories.hooks';
import { swalConfirmAlert } from '../../services/swal.service';
import { OrderRequest } from '../../interfaces/order/OrderRequest';
import { getUserAuth } from '../../services/user.service';
import { OrderInfo } from '../../interfaces/order/OrderInfo';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';
import { useCartStore } from '../../stores/cart.store';
import { OrdersTable } from '../../components/tables/ordersTable/OrdersTable';

export const Orders = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { cart, updateCart, removeFromCart, clearCart } = useCartStore();
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetCategories();
  const newOrderMutation = useNewOrder();
  const discountsQuery = useGetDiscountsByUser(user?.username || '');
  const [savedOrderExist, setSavedOrderExist] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);

  const handleIncreaseQuantity = (productID: string) => {
    const updatedCartProducts = cart.map((product) => {
      if (product.productID === productID && product.productQuantity! < product.productStock!) {
        return { ...product, productQuantity: (product.productQuantity || 0) + 1 };
      }

      return product;
    });

    updateCart(updatedCartProducts);
  };

  const handleDecreaseQuantity = (productID: string) => {
    const updatedCartProducts = cart.map((product) => {
      if (product.productID === productID && product.productQuantity! > 0) {
        return { ...product, productQuantity: (product.productQuantity || 0) - 1 };
      }

      return product;
    });

    updateCart(updatedCartProducts);
  };

  const clearProductsCart = async () => {
    const confirmTitle = 'Are you sure you want to clear the cart?';
    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Clear', 'warning');
    isConfirmed && clearCart();
  };

  const checkoutOrder = async () => {
    const confirmTitle = `Please confirm order for <strong>$${calculateTotal().toFixed(
      2
    )}</strong>`;

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Confirm', 'warning');

    if (isConfirmed) {
      const orderObj: OrderRequest = {
        user: getUserAuth()?.username || '',
        products: cart.map((product) => ({
          productID: product.productID || '',
          productQuantity: product.productQuantity || 0
        })),
        discount: discount || null
      };

      newOrderMutation.mutateAsync(orderObj).then((response: OrderInfo) => {
        clearCart();
        navigate('/invoice', { state: { data: response } });
      });
    }
  };

  const calculateSubTotal = () =>
    cart.reduce(
      (total, product) => total + (product.productPrice || 0) * (product.productQuantity || 0),
      0
    );

  const calculateTotal = () => subtotal * (1 - discount);

  const handleDiscountChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setDiscount(parseFloat(event.target.value));

  const saveOrderForLater = () => {
    localStorage.setItem('savedOrder', JSON.stringify(cart));
    setSavedOrderExist(true);
    clearCart();
  };

  const retrieveSavedOrder = () => {
    const savedOrderString = localStorage.getItem('savedOrder');

    if (savedOrderString) {
      const savedOrder: Product[] = JSON.parse(savedOrderString);
      updateCart(savedOrder);
      localStorage.removeItem('savedOrder');
      setSavedOrderExist(false);
    }
  };

  useEffect(() => {
    const productsToRemove = cart.filter((product) => product.productQuantity === 0);
    const savedOrderString = localStorage.getItem('savedOrder');
    const savedOrder: Product[] | null = savedOrderString ? JSON.parse(savedOrderString) : null;

    if (savedOrder && savedOrder.length > 0) {
      setSavedOrderExist(true);
    } else {
      setSavedOrderExist(false);
    }

    productsToRemove.forEach((product) => {
      removeFromCart(product.productID || '');
    });

    cart.length === 0 && setDiscount(0);

    setSubtotal(calculateSubTotal());
  }, [cart, discount]);

  return productsQuery.isPending || categoriesQuery.isPending || discountsQuery.isPending ? (
    <LoadingSpinner />
  ) : (
    <>
      <h1 className="title">Orders</h1>
      <div className="orders-container">
        <div className="orders-table">
          <OrdersTable />
        </div>
        <div className="orders-form card bg-light">
          <h4 className="title">Current Order</h4>
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product: Product) => (
                <tr key={product.productID}>
                  <td>
                    {product.productName}
                    <div>
                      <small className="text-muted">{product.productDescription}</small>
                    </div>
                  </td>
                  <td>${product.productPrice}</td>
                  <td>{product.productQuantity}</td>
                  <td>
                    <Button
                      variant="dark"
                      size="sm"
                      disabled={product.productQuantity === product.productStock}
                      onClick={() => handleIncreaseQuantity(product.productID || '')}
                    >
                      <i className="bi bi-plus"></i>
                    </Button>
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => handleDecreaseQuantity(product.productID || '')}
                    >
                      <i className="bi bi-dash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="order-info">
            <ul>
              <li>
                <strong>Sub-total:</strong> ${subtotal.toFixed(2)}
              </li>
              <li>
                <strong>Discount:&nbsp; </strong>
                <select
                  name="order-discount"
                  value={discount}
                  disabled={cart.length === 0}
                  onChange={handleDiscountChange}
                >
                  <option value={0}>0%</option>
                  {discountsQuery.data &&
                    discountsQuery.data.map((discount) => (
                      <option key={discount} value={discount}>
                        {discount * 100}%
                      </option>
                    ))}
                </select>
              </li>
              <li>
                <strong>Total:</strong> ${calculateTotal().toFixed(2)}
              </li>
            </ul>

            <div>
              {savedOrderExist ? (
                <Button variant="primary" onClick={retrieveSavedOrder}>
                  <i className="bi bi-download"></i>&nbsp; Retrieve saved order
                </Button>
              ) : (
                <Button variant="success" onClick={saveOrderForLater} disabled={cart.length === 0}>
                  <i className="bi bi-box-seam"></i>&nbsp; Save for later
                </Button>
              )}
              <Button
                variant="outline-dark"
                onClick={clearProductsCart}
                disabled={cart.length === 0}
              >
                <i className="bi bi-eraser"></i>&nbsp; Clear Cart
              </Button>
              <Button variant="dark" onClick={checkoutOrder} disabled={cart.length === 0}>
                <i className="bi bi-coin"></i>&nbsp; Check Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
