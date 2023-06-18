import './salesForm.css';
import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/inventory/product';
import { SalesFormProps } from '../../interfaces/SalesFormProps';
import { swalMessageAlert } from '../../services/swal.service';
import { UserAuth } from '../../context/UserContext';
import { validateUserRolePermission } from '../../services/user.Service';
import { useGetDiscountsByUser } from '../../hooks/sales.hooks';
import { LoadingSpinner } from '../loadingSpinner/LoadingSpinner';

export const SalesForm = ({ products, removeFromCart }: SalesFormProps) => {
  const { user } = UserAuth() || {};
  const discountsQuery = useGetDiscountsByUser(user?.username || '');
  const [productSales, setProductSales] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    setProductSales(products);
  }, [products]);

  useEffect(() => {
    setSubtotal(calculateSubTotal());
    const productsToRemove = productSales.filter((product) => product.productQuantity === 0);
    productsToRemove.forEach((product) => {
      removeFromCart(product.productID || 0);
    });
  }, [productSales, removeFromCart]);

  useEffect(() => {
    setTotal(calculateTotal());
  }, [subtotal, discount]);

  const handleIncreaseQuantity = (productID: number) => {
    setProductSales((prevProductSales) =>
      prevProductSales.map((product) =>
        product.productID === productID
          ? {
              ...product,
              productQuantity:
                (product.productQuantity || 0) < product.productStock
                  ? (product.productQuantity || 0) + 1
                  : product.productQuantity
            }
          : product
      )
    );

    const product = productSales.find((product) => product.productID === productID);

    product &&
      product.productQuantity === product.productStock &&
      swalMessageAlert(`Maximum quantity reached for ${product.productName}`, 'warning');
  };

  const handleDecreaseQuantity = (productId: number) => {
    setProductSales((prevProductSales) =>
      prevProductSales.map((product) =>
        product.productID === productId
          ? {
              ...product,
              productQuantity:
                product.productQuantity && product.productQuantity > 0
                  ? product.productQuantity - 1
                  : 0
            }
          : product
      )
    );
  };

  const calculateSubTotal = () => {
    return productSales.reduce((total, product) => {
      return total + product.productPrice * (product.productQuantity || 0);
    }, 0);
  };

  const calculateTotal = () => calculateSubTotal() * (1 - discount);

  const handleDiscountChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setDiscount(parseFloat(event.target.value));

  if (discountsQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="sales-form">
      <h4>Item List</h4>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productSales.map((product: Product) => (
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
                <div className="quantity-control">
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="order-info">
        <div className="row">
          <span>
            <strong>Sub-total:</strong> {calculateSubTotal().toFixed(2)}
          </span>
        </div>
        <div className="row">
          <div>
            <span>
              <strong>Discount:</strong>
              <select name="order-discount" onChange={handleDiscountChange}>
                <option defaultValue={0}>0%</option>
                {discountsQuery.data &&
                  discountsQuery.data.map((discount) => (
                    <option key={discount} value={discount}>
                      {discount * 100}%
                    </option>
                  ))}
              </select>
            </span>
          </div>
        </div>
        <div className="row">
          <span>
            <strong>Total:</strong> {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
