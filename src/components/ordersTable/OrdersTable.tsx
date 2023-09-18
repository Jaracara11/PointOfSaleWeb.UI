import { useEffect, useState } from 'react';
import { useGetCategories } from '../../hooks/categories.hooks';
import { useGetProducts } from '../../hooks/products.hooks';
import { SearchInput } from '../searchInput/SearchInput';
import { Product } from '../../interfaces/inventory/products/Product';
import { Button, Table } from 'react-bootstrap';
import { getProductCategoryName } from '../../utils/inventory.helper';
import { OrdersTableProps } from '../../interfaces/OrdersTableProps';
import { LoadingSpinner } from '../loadingSpinner/LoadingSpinner';

export const OrdersTable = ({
  cartProducts,
  removeFromCart,
  updateCartProduct
}: OrdersTableProps) => {
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetCategories();
  const [searchProductQuery, setSearchProductQuery] = useState<string>('');

  useEffect(() => {
    const productsToRemove = cartProducts.filter((product) => product.productQuantity === 0);
    productsToRemove.forEach((product) => {
      removeFromCart(product.productID || '');
    });
  }, [cartProducts]);

  const filteredProducts = (productsQuery.data || []).filter(
    (product) =>
      product.productID?.toLowerCase().includes(searchProductQuery.trim().toLowerCase()) ||
      product.productName.toLowerCase().includes(searchProductQuery.trim().toLowerCase())
  );

  const addToCart = (product: Product) => {
    product.productQuantity = 1;
    updateCartProduct([...cartProducts, product]);
  };

  return productsQuery.isLoading || categoriesQuery.isLoading ? (
    <LoadingSpinner />
  ) : (
    <div>
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
            {filteredProducts.map((product: Product) => {
              const existingProduct = cartProducts.find((p) => p.productID === product.productID);

              const isProductAdded = existingProduct !== undefined;

              return (
                <tr key={product.productID}>
                  <td>
                    <i className="bi bi-dot"></i>
                    {product.productName}
                  </td>
                  <td>{product.productStock}</td>
                  <td>${product.productPrice}</td>
                  <td>
                    {categoriesQuery.data &&
                      getProductCategoryName(product.productCategoryID, categoriesQuery.data)}
                  </td>
                  <td>
                    {product.productStock > 0 ? (
                      <Button
                        variant="dark"
                        disabled={isProductAdded || product.productStock < 1}
                        onClick={() => addToCart(product)}
                      >
                        <i className="bi bi-plus"></i>
                        <span>&nbsp;{isProductAdded ? 'Already added' : 'Add to cart'}</span>
                      </Button>
                    ) : (
                      <span className="text-muted"> Product Unavailable</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};
