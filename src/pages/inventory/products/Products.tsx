import './products.css';
import { useGetProducts } from '../../../hooks/products.hooks';
import { LoadingSpinner } from '../../../components/loadingSpinner/LoadingSpinner';
import { Button, Table } from 'react-bootstrap';
import { Product } from '../../../interfaces/inventory/product';
import { useGetCategories } from '../../../hooks/categories.hooks';
import { getProductCategoryName } from '../../../utils/inventory.helper';
import { UserAuth } from '../../../context/UserContext';
import { SearchInput } from '../../../components/searchInput/SearchInput';
import { useState } from 'react';
import { PaginationControl } from '../../../components/paginationControl/PaginationControl';
import { validateUserRolePermission } from '../../../services/user.Service';
import { Link } from 'react-router-dom';
import { UpsertProductModal } from '../../../components/modals/upsertProductModal/UpsertProductModal';

export const Products = () => {
  const { user } = UserAuth() || {};
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetCategories();
  const [searchProductQuery, setSearchProductQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => setShowModal((prev) => !prev);

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
          <Button
            className="mb-3 btn btn-dark"
            onClick={() => {
              setSelectedProduct(null);
              toggleModal();
            }}
          >
            <i className="bi bi-plus-lg"></i>
            &nbsp;Add New Product
          </Button>
        )}
        <Link className="mb-3 btn btn-outline-dark" to="/categories">
          <i className="bi bi-globe"></i>
          &nbsp;Show All Categories
        </Link>

        <SearchInput searchQuery={searchProductQuery} setSearchQuery={setSearchProductQuery} />
      </div>

      {productsQuery.data && (
        <>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Cost</th>
                <th>Price</th>
                <th>Category</th>
                <th></th>
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
                      <Button
                        variant="outline-dark"
                        onClick={() => {
                          setSelectedProduct(product);
                          toggleModal();
                        }}
                      >
                        <i className="bi bi-pencil"></i>&nbsp;Edit
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages || 0}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {showModal && (
        <UpsertProductModal
          toggle={toggleModal}
          product={selectedProduct}
          categories={categoriesQuery.data || []}
        />
      )}
    </div>
  );
};
