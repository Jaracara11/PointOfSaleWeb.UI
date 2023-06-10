import './sales.css';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';
import { useGetProducts } from '../../hooks/products.hooks';
import { Button, Table } from 'react-bootstrap';
import { useState } from 'react';
import { Product } from '../../interfaces/inventory/product';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { useGetCategories } from '../../hooks/categories.hooks';
import { getProductCategoryName } from '../../utils/inventory.helper';

export const Sales = () => {
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetCategories();
  const [searchProductQuery, setSearchProductQuery] = useState<string>('');

  const filteredProducts = (productsQuery.data || []).filter((product) =>
    product.productName.toLowerCase().includes(searchProductQuery.trim().toLowerCase())
  );

  if (productsQuery.isLoading || categoriesQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="sales-container">
      <h1 className="title">Sales</h1>
      <SearchInput searchQuery={searchProductQuery} setSearchQuery={setSearchProductQuery} />
      {productsQuery.data && (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Category</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product: Product) => (
              <tr key={product.productID}>
                <td>
                  <i className="bi bi-dot"></i>
                  {product.productName}
                </td>
                <td>{product.productStock}</td>
                <td>{product.productPrice}</td>
                <td>
                  {categoriesQuery.data &&
                    getProductCategoryName(product.productCategoryID, categoriesQuery.data)}
                </td>
                <td>
                  <Button variant="dark">
                    <i className="bi bi-plus"></i>
                    &nbsp;Add to cart
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
