import './salesForm.css';
import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/inventory/product';
import { SalesFormProps } from '../../interfaces/SalesFormProps';
import { swalMessageAlert } from '../../services/swal.service';

export const SalesForm = ({ products, removeFromCart }: SalesFormProps) => {
  const [productSales, setProductSales] = useState<Product[]>([]);

  useEffect(() => {
    setProductSales(products);
  }, [products]);

  useEffect(() => {
    const productsToRemove = productSales.filter((product) => product.productQuantity === 0);
    productsToRemove.forEach((product) => {
      removeFromCart(product.productID || 0);
    });
  }, [productSales, removeFromCart]);

  const handleIncreaseQuantity = (productID: number) => {
    setProductSales((prevProductSales) =>
      prevProductSales.map((product) =>
        product.productID === productID
          ? {
              ...product,
              productQuantity:
                (product.productQuantity ?? 0) < product.productStock
                  ? (product.productQuantity ?? 0) + 1
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
    </div>
  );
};
