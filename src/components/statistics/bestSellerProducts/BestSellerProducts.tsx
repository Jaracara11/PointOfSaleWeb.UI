import { Table } from 'react-bootstrap';
import { useGetBestSellerProducts } from '../../../hooks/products.hooks';
import { BestSellerProduct } from '../../../interfaces/inventory/products/BestSellerProduct';
import { LoadingSpinner } from '../../loadingSpinner/LoadingSpinner';

export const BestSellerProducts = () => {
  const bestSellerProductsQuery = useGetBestSellerProducts();

  return bestSellerProductsQuery.isLoading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <h4 className="title">Most Popular Products</h4>
      <div className="card">
        {bestSellerProductsQuery.data && (
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Total Quantity Sold</th>
              </tr>
            </thead>
            <tbody>
              {bestSellerProductsQuery.data.map((product: BestSellerProduct, index: number) => (
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
