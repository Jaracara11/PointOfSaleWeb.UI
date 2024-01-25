import { Button } from 'react-bootstrap';
import { useGetOrdersByDate } from '../../../hooks/orders.hooks';
import { SalesInfoByDateBtnProps } from '../../../interfaces/SalesInfoByDateBtnProps';

export const InvoicesByDateBtn = ({
  initialDate,
  finalDate,
  onInvoicesFetched = () => {}
}: SalesInfoByDateBtnProps) => {
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
