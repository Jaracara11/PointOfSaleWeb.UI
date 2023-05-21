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
import { validateUserRolePermission } from '../../../services/user.Service';
import { Link } from 'react-router-dom';

export const Products = () => {
  const { user } = UserAuth() || {};
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetCategories();
  const [searchProductQuery, setSearchProductQuery] = useState<string>('');

  ///////////////////////////Pagination////////////////////////////////
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);
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
        {user && validateUserRolePermission(['Admin', 'Manager']) && (
          <Link className="mb-3 btn btn-dark" to="/inventory/upsert-product">
            <i className="bi bi-plus-lg"></i>
            &nbsp;Add New Product
          </Link>
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
                    {validateUserRolePermission(['Admin', 'Manager']) && (
                      <Link
                        className="btn btn-outline-dark"
                        state={product}
                        to="/inventory/upsert-product"
                      >
                        <i className="bi bi-pencil"></i>&nbsp;Edit
                      </Link>
                    )}
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
