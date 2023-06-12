import './salesForm.css';
import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/inventory/product';

export const SalesForm = ({ products }: { products: Product[] }) => {
  const [productSales, setProductSales] = useState<Product[]>([]);

  useEffect(() => {
    setProductSales(products);
  }, [products]);

  const handleIncreaseQuantity = (productId: number) => {
    setProductSales((prevProductSales) =>
      prevProductSales.map((product) =>
        product.productID === productId
          ? { ...product, productQuantity: (product.productQuantity ?? 0) + 1 }
          : product
      )
    );
  };

  const handleDecreaseQuantity = (productId: number) => {
    setProductSales((prevProductSales) =>
      prevProductSales
        .map((product) =>
          product.productID === productId
            ? {
                ...product,
                productQuantity:
                  product.productQuantity && product.productQuantity > 1
                    ? product.productQuantity - 1
                    : 0
              }
            : product
        )
        .filter((product) => product.productQuantity && product.productQuantity > 0)
    );
  };

  console.log(productSales);

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
