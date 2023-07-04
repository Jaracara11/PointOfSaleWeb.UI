import { useGetProducts } from '../../../hooks/products.hooks';
import { Button, Table } from 'react-bootstrap';
import { Product } from '../../../interfaces/inventory/products/Product';
import { useGetCategories } from '../../../hooks/categories.hooks';
import { getProductCategoryName } from '../../../utils/inventory.helper';
import { UserAuth } from '../../../context/UserContext';
import { SearchInput } from '../../../components/searchInput/SearchInput';
import { useState } from 'react';
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

  const filteredProducts = (productsQuery.data || []).filter((product) =>
    product.productName.toLowerCase().includes(searchProductQuery.trim().toLowerCase())
  );

  return (
    <div className="products common-container">
      <div className="row">
        <h1 className="title">Products</h1>
      </div>

      <div className="row">
        <div>
          {user && validateUserRolePermission(['Admin', 'Manager']) && (
            <Button
              variant="dark"
              onClick={() => {
                setSelectedProduct(null);
                toggleModal();
              }}
            >
              <i className="bi bi-plus-lg"></i>
              &nbsp;Add New Product
            </Button>
          )}
          <Link className="btn btn-outline-dark" to="/categories">
            <i className="bi bi-globe"></i>
            &nbsp;Show All Categories
          </Link>
        </div>
        <div>
          <SearchInput searchQuery={searchProductQuery} setSearchQuery={setSearchProductQuery} />
        </div>
      </div>

      <div className="row">
        {productsQuery.data && (
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
              {filteredProducts.map((product: Product) => (
                <tr key={product.productID}>
                  <td>
                    <i className="bi bi-dot"></i>
                    {product.productName}
                  </td>
                  <td>{product.productDescription}</td>
                  <td>{product.productStock}</td>
                  <td>${product.productCost}</td>
                  <td>${product.productPrice}</td>
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
        )}
      </div>

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
