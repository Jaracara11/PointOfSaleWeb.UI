import './salesForm.css';
import { Form, Table } from 'react-bootstrap';
import { Product } from '../../interfaces/inventory/product';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ProductSale } from '../../interfaces/sales/ProductSale';

export const SalesForm = ({ products }: { products: Product[] }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [productSales, setProductSales] = useState<ProductSale[]>([]);

  const addProductSale = (product: Product) => {
    const productSale: ProductSale = {
      productID: product.productID || 0,
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productCategoryID: product.productCategoryID,
      productQuantity: 1
    };

    setProductSales((prevProductSales) => [...prevProductSales, productSale]);
  };

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
              </tr>
            ))}
          </tbody>
        </Table>
      </Form>
    </div>
  );
};
