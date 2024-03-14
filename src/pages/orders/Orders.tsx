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
import { SearchInput } from '../../components/searchInput/SearchInput';
import { getProductCategoryName } from '../../utils/inventory.utils';
import { useCartStore } from '../../stores/cart.store';

export const Orders = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { cart, updateCart, addToCart, removeFromCart, clearCart } = useCartStore();
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetCategories();
  const newOrderMutation = useNewOrder();
  const discountsQuery = useGetDiscountsByUser(user?.username || '');
  const [discount, setDiscount] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [searchProductQuery, setSearchProductQuery] = useState<string>('');

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

  useEffect(() => {
    const productsToRemove = cart.filter((product) => product.productQuantity === 0);

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
          <SearchInput searchQuery={searchProductQuery} setSearchQuery={setSearchProductQuery} />
          <Table bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productsQuery.data &&
                productsQuery.data
                  .filter(
                    (product) =>
                      product.productID
                        ?.toLowerCase()
                        .includes(searchProductQuery.trim().toLowerCase()) ||
                      product.productName
                        .toLowerCase()
                        .includes(searchProductQuery.trim().toLowerCase())
                  )
                  .map((product: Product) => {
                    const isProductAdded = cart.find((p) => p.productID === product.productID);
                    return (
                      <tr key={product.productID}>
                        <td>
                          <i className="bi bi-dot"></i>
                          {product.productName}
                        </td>
                        <td>{product.productStock}</td>
                        <td>${product.productPrice}</td>
                        <td>
                          {categoriesQuery.data &&
                            getProductCategoryName(product.productCategoryID, categoriesQuery.data)}
                        </td>
                        <td>
                          {product.productStock! > 0 ? (
                            <Button
                              variant="dark"
                              disabled={!!isProductAdded || product.productStock! < 1}
                              onClick={() => addToCart(product)}
                            >
                              <i className="bi bi-plus"></i>
                              <span>&nbsp;{isProductAdded ? 'Already added' : 'Add to cart'}</span>
                            </Button>
                          ) : (
                            <span className="text-muted"> Product Unavailable</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </Table>
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
              <Button variant="dark" onClick={checkoutOrder} disabled={cart.length === 0}>
                <i className="bi bi-coin"></i>&nbsp; Check Out
              </Button>
              <Button
                variant="outline-dark"
                onClick={clearProductsCart}
                disabled={cart.length === 0}
              >
                <i className="bi bi-eraser"></i>&nbsp; Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
