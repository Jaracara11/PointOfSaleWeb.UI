import { Button, Table } from 'react-bootstrap';
import { SearchInput } from '../../searchInput/SearchInput';
import { Product } from '../../../interfaces/inventory/products/Product';
import { useCartStore } from '../../../stores/cart.store';
import { useState } from 'react';
import { useGetProducts } from '../../../hooks/products.hooks';
import { getProductCategoryName } from '../../../utils/inventory.utils';
import { useGetCategories } from '../../../hooks/categories.hooks';

export const OrdersTable = () => {
  const { cart, addToCart } = useCartStore();
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetCategories();
  const [searchProductQuery, setSearchProductQuery] = useState<string>('');

  return (
    <>
      <SearchInput searchQuery={searchProductQuery} setSearchQuery={setSearchProductQuery} />
      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productsQuery.data &&
            productsQuery.data
              .filter(
                (product) =>
                  product.productID
                    ?.toLowerCase()
                    .includes(searchProductQuery.trim().toLowerCase()) ||
                  product.productName
                    .toLowerCase()
                    .includes(searchProductQuery.trim().toLowerCase())
              )
              .map((product: Product) => {
                const isProductAdded = cart.find((p) => p.productID === product.productID);
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
                      {product.productStock! > 0 ? (
                        <Button
                          variant="dark"
                          disabled={!!isProductAdded || product.productStock! < 1}
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
    </>
  );
};
