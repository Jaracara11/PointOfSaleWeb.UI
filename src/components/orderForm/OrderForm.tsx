import './orderForm.css';
import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/inventory/product';
import { OrderFormProps } from '../../interfaces/order/OrderFormProps';
import { swalConfirmAlert, swalMessageAlert } from '../../services/swal.service';
import { UserAuth } from '../../context/UserContext';
import { useGetDiscountsByUser, useNewOrder } from '../../hooks/orders.hooks';
import { getUserAuth } from '../../services/user.Service';
import { useNavigate } from 'react-router-dom';
import { OrderRequest } from '../../interfaces/order/OrderRequest';
import { OrderInfo } from '../../interfaces/order/OrderInfo';
import { parseProductsFromString } from '../../utils/inventory.helper';

export const OrderForm = ({ products, updateCartProduct, removeFromCart }: OrderFormProps) => {
  const { user } = UserAuth() || {};
  const discountsQuery = useGetDiscountsByUser(user?.username || '');
  const [order, setOrder] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const navigate = useNavigate();

  const newOrderMutation = useNewOrder();

  useEffect(() => {
    setOrder(products);
  }, [products]);

  useEffect(() => {
    setSubtotal(calculateSubTotal());
    const productsToRemove = order.filter((product) => product.productQuantity === 0);
    productsToRemove.forEach((product) => {
      removeFromCart(product.productID || 0);
    });
  }, [order, removeFromCart]);

  useEffect(() => {
    setTotal(calculateTotal());
  }, [subtotal, discount]);

  useEffect(() => {
    order.length === 0 && setDiscount(0);
  }, [order]);

  const handleIncreaseQuantity = (productID: number) => {
    const updatedOrder = order.map((product) => {
      if (
        product.productID === productID &&
        (product.productQuantity || 0) < product.productStock
      ) {
        return {
          ...product,
          productQuantity: (product.productQuantity || 0) + 1
        };
      } else {
        return product;
      }
    });

    const product = updatedOrder.find((product) => product.productID === productID);

    if (product && product.productQuantity === product.productStock) {
      swalMessageAlert(`Maximum quantity reached for ${product.productName}`, 'warning');
    }

    updateCartProduct(updatedOrder);
  };

  const handleDecreaseQuantity = (productId: number) => {
    setOrder((prevOrder) =>
      prevOrder.map((product) => {
        if (product.productID === productId) {
          if (product.productQuantity && product.productQuantity > 0) {
            return {
              ...product,
              productQuantity: product.productQuantity - 1
            };
          } else {
            return {
              ...product,
              productQuantity: 0
            };
          }
        } else {
          return product;
        }
      })
    );
  };

  const calculateSubTotal = () => {
    return order.reduce((total, product) => {
      return total + product.productPrice * (product.productQuantity || 0);
    }, 0);
  };

  const calculateTotal = () => calculateSubTotal() * (1 - discount);

  const handleDiscountChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setDiscount(parseFloat(event.target.value));

  const clearCart = async () => {
    const confirmTitle = 'Are you sure you want to clear the cart?';
    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Clear', 'warning');

    if (isConfirmed) {
      order.forEach((product) => removeFromCart(product.productID || 0));

      setOrder([]);

      setOrder((prevOrder) =>
        prevOrder.map((product) => ({
          ...product,
          productQuantity: 0
        }))
      );

      setSubtotal(0);
      setTotal(0);
      setDiscount(0);
    }
  };

  const checkoutOrder = async () => {
    const confirmTitle = `Please confirm order for <strong>${total.toFixed(2)}$</strong>`;

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Confirm', 'warning');

    if (isConfirmed) {
      const orderObj: OrderRequest = {
        user: getUserAuth()?.username || '',
        products: order.map((product) => ({
          productID: product.productID || 0,
          productQuantity: product.productQuantity || 0
        })),
        discount: discount || null
      };

      newOrderMutation.mutateAsync(orderObj).then((response: OrderInfo) => {
        response.products = parseProductsFromString(JSON.stringify(order));
        navigate('/invoice', { state: { data: response } });
      });
    }
  };

  return (
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
          {order.map((product: Product) => (
            <tr key={product.productID}>
              <td>
                {product.productName}
                <div>
                  <small className="text-muted">{product.productDescription}</small>
                </div>
              </td>
              <td>{product.productPrice}</td>
              <td>{product.productQuantity}</td>
              <td>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => handleIncreaseQuantity(product.productID || 0)}
                >
                  <i className="bi bi-plus"></i>
                </Button>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => handleDecreaseQuantity(product.productID || 0)}
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
            <strong>Sub-total:</strong> {calculateSubTotal().toFixed(2)}
          </li>
          <li>
            <strong>Discount:&nbsp; </strong>
            <select
              name="order-discount"
              value={discount}
              disabled={order.length === 0}
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
            <strong>Total:</strong> {total.toFixed(2)}
          </li>
        </ul>

        <div>
          <Button variant="dark" onClick={() => checkoutOrder()} disabled={order.length === 0}>
            <i className="bi bi-coin"></i>&nbsp; Check Out
          </Button>
          <Button variant="outline-dark" onClick={() => clearCart()} disabled={order.length === 0}>
            <i className="bi bi-eraser"></i>&nbsp; Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
