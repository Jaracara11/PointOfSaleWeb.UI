import { Button } from 'react-bootstrap';
import { InvoicesByDateBtnProps } from '../../../interfaces/order/InvoicesByDateBtnProps';
import { useGetOrdersByDate } from '../../../hooks/orders.hooks';

export const InvoicesByDateBtn = ({
  initialDate,
  finalDate,
  onInvoicesFetched
}: InvoicesByDateBtnProps) => {
  const getOrdersByDate = useGetOrdersByDate(initialDate, finalDate);

  const handleOrdersByDateRequest = () => {
    getOrdersByDate.refetch().then((response) => {
      response.data && onInvoicesFetched(response.data);
    });
  };

  return (
    <Button
      variant="dark"
      onClick={() => handleOrdersByDateRequest()}
      disabled={getOrdersByDate.isFetching}
    >
      <i className="bi bi-file-text"></i>&nbsp; Search Invoices
    </Button>
  );
};
