import './sales.css';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';
import { useGetProducts } from '../../hooks/products.hooks';

export const Sales = () => {
  const productsQuery = useGetProducts();

  if (productsQuery.isLoading) return <LoadingSpinner />;

  console.log(productsQuery.data);

  return (
    <div className="sales-container">
      <h1 className="title">Sales</h1>
    </div>
  );
};
