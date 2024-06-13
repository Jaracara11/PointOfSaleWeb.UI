import { useGetProductsSoldByDate } from '../../../hooks/products.hooks';
import { SalesInfoByDateBtnProps } from '../../../interfaces/SalesInfoByDateBtnProps';

export const SalesByProductBtn = ({ initialDate, finalDate, onProductsFetched = () => {} }: SalesInfoByDateBtnProps) => {
  const getProductsSoldByDate = useGetProductsSoldByDate(initialDate, finalDate);

  const handleOrdersByDateRequest = () => {
    getProductsSoldByDate.refetch().then((response) => {
      response.data && onProductsFetched(response.data);
    });
  };

  return (
    <button className="dark" onClick={() => handleOrdersByDateRequest()} disabled={getProductsSoldByDate.isFetching}>
      <i className="bi bi-file-text"></i>&nbsp; Search Products
    </button>
  );
};
