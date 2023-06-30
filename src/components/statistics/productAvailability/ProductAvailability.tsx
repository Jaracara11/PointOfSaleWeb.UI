import { Table } from 'react-bootstrap';
import { useGetProducts } from '../../../hooks/products.hooks';
import { Product } from '../../../interfaces/inventory/products/Product';

export const ProductAvailability = () => {
  const productsQuery = useGetProducts();

  const getLimitedProducts = (products: Product[]): Product[] => {
    const sortedProducts = products
      ? [...products].sort((a: Product, b: Product) => a.productStock - b.productStock)
      : [];
    return sortedProducts.slice(0, 3);
  };

  return (
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
              {getLimitedProducts(productsQuery.data).map((product: Product) => (
                <tr key={product.productID}>
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
