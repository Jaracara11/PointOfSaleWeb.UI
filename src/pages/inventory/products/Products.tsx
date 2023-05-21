import './products.css';
import { useGetProducts } from '../../../hooks/products.hooks';
import { LoadingSpinner } from '../../../components/loadingSpinner/LoadingSpinner';
import { Table } from 'react-bootstrap';
import { Product } from '../../../interfaces/product';
import { useGetCategories } from '../../../hooks/categories.hooks';
import { getProductCategoryName } from '../../../utils/inventory.helper';
import { UserAuth } from '../../../context/UserContext';
import { SearchInput } from '../../../components/searchInput/SearchInput';
import { useState } from 'react';
import { Pagination } from '../../../components/pagination/Pagination';

export const Products = () => {
  const { user } = UserAuth() || {};
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetCategories();
  const [searchProductQuery, setSearchProductQuery] = useState<string>('');

  ///////////////////////////Pagination////////////////////////////////
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(5);
  const totalPages = productsQuery.data && Math.ceil(productsQuery.data.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = (productsQuery.data || [])
    .filter((product) =>
      product.productName.toLowerCase().includes(searchProductQuery.toLowerCase())
    )
    .slice(indexOfFirstProduct, indexOfLastProduct);
  /////////////////////////Pagination End//////////////////////////////

  if (productsQuery.isLoading || categoriesQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="products-container container-fluid">
      <h1>Products</h1>
      <div className="btn-panel">
        {user?.role === 'Admin' && (
          <button className="mb-3 btn btn-dark" onClick={() => {}}>
            <i className="bi bi-plus-lg"></i>
            &nbsp;Add New Product
          </button>
        )}
        <SearchInput searchQuery={searchProductQuery} setSearchQuery={setSearchProductQuery} />
      </div>
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
              {currentProducts.map((product: Product) => (
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages || 0}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};
