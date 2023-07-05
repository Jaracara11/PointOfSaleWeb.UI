import { Table } from 'react-bootstrap';
import { useGetBestSellerProducts } from '../../../hooks/products.hooks';
import { BestSellerProduct } from '../../../interfaces/inventory/products/BestSellerProduct';

export const BestSellerProducts = () => {
  const bestSellerProducts = useGetBestSellerProducts();

  return (
    <div>
      <h4 className="title">Most Popular Products</h4>
      <div className="card">
        {bestSellerProducts.data && (
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Total Quantity Sold</th>
              </tr>
            </thead>
            <tbody>
              {bestSellerProducts.data.map((product: BestSellerProduct, index: number) => (
                <tr key={index}>
                  <td>
                    {product.productName}
                    <div>
                      <small className="text-muted">{product.productDescription}</small>
                    </div>
                  </td>
                  <td>{product.totalQuantitySold} units</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};
