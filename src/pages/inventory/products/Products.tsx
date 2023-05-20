import './products.css';
import { useGetProducts } from '../../../hooks/products.hooks';
import { LoadingSpinner } from '../../../components/loadingSpinner/LoadingSpinner';
import { Table } from 'react-bootstrap';
import { Product } from '../../../interfaces/product';
import { useGetCategories } from '../../../hooks/categories.hooks';
import { getProductCategoryName } from '../../../utils/inventory.helper';

export const Products = () => {
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetCategories();

  if (productsQuery.isLoading || categoriesQuery.isLoading) return <LoadingSpinner />;

  return (
    <>
      {productsQuery.data && (
        <>
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Cost</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {productsQuery?.data.map((product: Product) => (
                <tr key={product.productID}>
                  <td>
                    <i className="bi bi-dot"></i>
                    {product.productName}
                  </td>
                  <td>{product.productDescription}</td>
                  <td>{product.productStock}</td>
                  <td>{product.productCost}</td>
                  <td>{product.productPrice}</td>
                  <td>
                    {categoriesQuery.data &&
                      getProductCategoryName(product.productCategoryID, categoriesQuery.data)}
                  </td>
                  <td>
                    <button className="btn btn-outline-dark">
                      <i className="bi bi-pencil"></i>&nbsp;Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};
