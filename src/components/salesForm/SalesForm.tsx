import './salesForm.css';
import { Button, Form, Table } from 'react-bootstrap';
import { Product } from '../../interfaces/inventory/product';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ProductSale } from '../../interfaces/sales/ProductSale';

export const SalesForm = ({ products }: { products: ProductSale[] }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [productSales, setProductSales] = useState<ProductSale[]>([]);

  useEffect(() => {
    const newProductSales = products.map((product) => ({
      productID: product.productID || 0,
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productCategoryID: product.productCategoryID,
      productQuantity: 1
    }));

    setProductSales(newProductSales);
  }, [products]);

  const handleIncreaseQuantity = (productId: number) => {
    console.log('click handleIncreaseQuantity');
    setProductSales((prevProductSales) =>
      prevProductSales.map((product) =>
        product.productID === productId
          ? { ...product, productQuantity: product.productQuantity + 1 }
          : product
      )
    );
  };

  const handleDecreaseQuantity = (productId: number) => {
    console.log('handleDecreaseQuantity handleIncreaseQuantity');
    setProductSales((prevProductSales) =>
      prevProductSales.map((product) =>
        product.productID === productId && product.productQuantity > 1
          ? { ...product, productQuantity: product.productQuantity - 1 }
          : product
      )
    );
  };

  console.log(productSales);

  return (
    <div className="sales-form">
      <Form>
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
            {productSales.map((product: ProductSale) => (
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
                      onClick={() => handleIncreaseQuantity(product.productID)}
                    >
                      <i className="bi bi-plus"></i>
                    </Button>
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => handleDecreaseQuantity(product.productID)}
                    >
                      <i className="bi bi-dash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Form>
    </div>
  );
};
