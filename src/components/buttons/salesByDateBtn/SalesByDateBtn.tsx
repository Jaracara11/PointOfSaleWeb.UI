import { Button } from 'react-bootstrap';
import { InvoiceByDateBtnProps } from '../../../interfaces/order/InvoiceByDateBtnProps';
import { useGetOrdersByDate } from '../../../hooks/orders.hooks';

export const SalesByDateBtn = ({
  initialDate,
  finalDate,
  onInvoicesFetched
}: InvoiceByDateBtnProps) => {
  const getOrdersByDate = useGetOrdersByDate(initialDate, finalDate);

  const handleOrdersByDateRequest = () => {
    getOrdersByDate.refetch().then((response) => {
      response.data && onInvoicesFetched(response.data);
    });
  };

  return (
    <Button variant="outline-dark" onClick={() => handleOrdersByDateRequest()}>
      <i className="bi bi-coin"></i>&nbsp; Get Total Sales
    </Button>
  );
};
