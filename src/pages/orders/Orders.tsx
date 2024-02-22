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
import { getProductCategoryName } from '../../utils/inventory.helper';

export const Orders = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [searchProductQuery, setSearchProductQuery] = useState<string>('');
  const discountsQuery = useGetDiscountsByUser(user?.username || '');
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetCategories();
  const newOrderMutation = useNewOrder();

  useEffect(() => {
    const productsToRemove = cartProducts.filter((product) => product.productQuantity === 0);
    productsToRemove.forEach((product) => {
      removeFromCart(product.productID || '');
    });
  }, [cartProducts]);

  const removeFromCart = (productID: string) =>
    setCartProducts((prevProducts) => prevProducts.filter((p) => p.productID !== productID));

  const updateCartProduct = (updatedCartProducts: Product[]) =>
    setCartProducts(updatedCartProducts);

  const addToCart = (product: Product) => {
    product.productQuantity = 1;
    updateCartProduct([...cartProducts, product]);
  };

  const handleIncreaseQuantity = (productID: string) => {
    const updatedCartProducts = cartProducts.map((product) => {
      if (product.productID === productID && product.productQuantity! < product.productStock!) {
        return { ...product, productQuantity: (product.productQuantity || 0) + 1 };
      }
      return product;
    });
    updateCartProduct(updatedCartProducts);
  };

  const handleDecreaseQuantity = (productID: string) => {
    const updatedCartProducts = cartProducts.map((product) => {
      if (product.productID === productID && product.productQuantity! > 0) {
        return { ...product, productQuantity: (product.productQuantity || 0) - 1 };
      }
      return product;
    });
    updateCartProduct(updatedCartProducts);
  };

  const clearCart = async () => {
    const confirmTitle = 'Are you sure you want to clear the cart?';
    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Clear', 'warning');
    if (isConfirmed) {
      setCartProducts([]);
    }
  };

  const checkoutOrder = async () => {
    const confirmTitle = `Please confirm order for <strong>$${calculateTotal().toFixed(
      2
    )}</strong>`;
    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Confirm', 'warning');
    if (isConfirmed) {
      const orderObj: OrderRequest = {
        user: getUserAuth()?.username || '',
        products: cartProducts.map((product) => ({
          productID: product.productID || '',
          productQuantity: product.productQuantity || 0
        })),
        discount: discount || null
      };
      newOrderMutation.mutateAsync(orderObj).then((response: OrderInfo) => {
        navigate('/invoice', { state: { data: response } });
      });
    }
  };

  const calculateSubTotal = () =>
    cartProducts.reduce(
      (total, product) => total + (product.productPrice || 0) * (product.productQuantity || 0),
      0
    );

  const [discount, setDiscount] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    setSubtotal(calculateSubTotal());
  }, [cartProducts]);

  useEffect(() => {
    setSubtotal(calculateSubTotal());
  }, [discount]);

  const calculateTotal = () => subtotal * (1 - discount);

  const handleDiscountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDiscount(parseFloat(event.target.value));
  };

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
                    const isProductAdded = cartProducts.find(
                      (p) => p.productID === product.productID
                    );
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
              {cartProducts.map((product: Product) => (
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
                <select name="order-discount" value={discount} onChange={handleDiscountChange}>
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
              <Button variant="dark" onClick={checkoutOrder} disabled={cartProducts.length === 0}>
                <i className="bi bi-coin"></i>&nbsp; Check Out
              </Button>
              <Button
                variant="outline-dark"
                onClick={clearCart}
                disabled={cartProducts.length === 0}
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
