import { Table } from 'react-bootstrap';
import { SalesByProductTableProps } from '../../../interfaces/sales/SalesByProductTableProps';
import { ProductSold } from '../../../interfaces/inventory/products/ProductSold';

export const SalesByProductTable = ({ products }: SalesByProductTableProps) => {
  return (
    products && (
      <Table hover>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Total Sold</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: ProductSold) => (
            <tr key={product.productID}>
              <td>{product.productID}</td>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>${product.totalSold}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  );
};
