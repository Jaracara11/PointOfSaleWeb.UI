import { Table } from 'react-bootstrap';
import { useGetProducts } from '../../../hooks/products.hooks';
import { Product } from '../../../interfaces/inventory/products/Product';
import { LoadingSpinner } from '../../loadingSpinner/LoadingSpinner';

export const ProductAvailability = () => {
  const productsQuery = useGetProducts();

  const getLimitedProducts = (products: Product[]): Product[] => {
    const sortedProducts = products
      ? [...products].sort((a: Product, b: Product) => a.productStock - b.productStock)
      : [];
    return sortedProducts.slice(0, 3);
  };

  return productsQuery.isPending ? (
    <LoadingSpinner />
  ) : (
    <div>
      <h4 className="title">Products Lowest Availability</h4>

      <div className="card">
        {productsQuery.data && (
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {getLimitedProducts(productsQuery.data).map((product: Product, index: number) => (
                <tr
                  key={index}
                  className={
                    index === 0 ? 'table-danger' : index === 1 ? 'table-warning' : 'table-info'
                  }
                >
                  <td>{product.productName}</td>
                  <td>{product.productStock} unit(s)</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};
