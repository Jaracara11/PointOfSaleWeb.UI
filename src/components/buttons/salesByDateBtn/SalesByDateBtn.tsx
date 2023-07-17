import { Button } from 'react-bootstrap';
import { useGetSalesByDate } from '../../../hooks/orders.hooks';
import { SalesByDateBtnProps } from '../../../interfaces/order/SalesByDateBtnProps';

export const SalesByDateBtn = ({
  initialDate,
  finalDate,
  onTotalSalesFetched
}: SalesByDateBtnProps) => {
  const getSalesByDate = useGetSalesByDate(initialDate, finalDate);

  const handleOrdersByDateRequest = () => {
    getSalesByDate.refetch().then((response) => {
      response.data && onTotalSalesFetched(response.data);
    });
  };

  return (
    <Button
      variant="outline-dark"
      onClick={() => handleOrdersByDateRequest()}
      disabled={getSalesByDate.isFetching}
    >
      <i className="bi bi-coin"></i>&nbsp; Get Total Sales
    </Button>
  );
};
