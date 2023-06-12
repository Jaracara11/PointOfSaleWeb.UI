import './sales.css';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';
import { useGetProducts } from '../../hooks/products.hooks';
import { Button, Table } from 'react-bootstrap';
import { useState } from 'react';
import { Product } from '../../interfaces/inventory/product';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { useGetCategories } from '../../hooks/categories.hooks';
import { getProductCategoryName } from '../../utils/inventory.helper';
import { SalesForm } from '../../components/salesForm/SalesForm';

export const Sales = () => {
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetCategories();
  const [searchProductQuery, setSearchProductQuery] = useState<string>('');
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const filteredProducts = (productsQuery.data || []).filter((product) =>
    product.productName.toLowerCase().includes(searchProductQuery.trim().toLowerCase())
  );

  const addToCart = (product: Product) => {
    product.productQuantity = 1;
    setCartProducts((prevProducts) => [...prevProducts, product]);
  };

  if (productsQuery.isLoading || categoriesQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="sales-container">
      <h1 className="title">Sales</h1>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <SearchInput searchQuery={searchProductQuery} setSearchQuery={setSearchProductQuery} />
          </div>
          <div className="row table-wrapper">
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
                  {filteredProducts.map((product: Product) => {
                    const existingProduct = cartProducts.find(
                      (p) => p.productID === product.productID
                    );

                    const isProductAdded = existingProduct !== undefined;

                    return (
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
                          <Button
                            variant="dark"
                            disabled={isProductAdded}
                            onClick={() => addToCart(product)}
                          >
                            <i className="bi bi-plus"></i>
                            <span>&nbsp;{isProductAdded ? 'Already added' : 'Add to cart'}</span>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </div>
        <div className="col-6">
          <div className="sales-calculator card bg-light">
            <div className="row">
              <div className="col-6">
                <SalesForm products={cartProducts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
