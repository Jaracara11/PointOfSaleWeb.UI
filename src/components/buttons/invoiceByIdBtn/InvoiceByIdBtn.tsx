import { useNavigate } from 'react-router-dom';
import { useGetOrderByID } from '../../../hooks/orders.hooks';
import { Button } from 'react-bootstrap';

export const InvoiceByIdBtn = ({ orderID }: { orderID: string }) => {
  const navigate = useNavigate();
  const getOrderInvoiceByID = useGetOrderByID(orderID);

  const handleOrderInvoiceRequest = () => {
    getOrderInvoiceByID.refetch().then((response) => {
      navigate('/invoice', { state: { data: response.data } });
    });
  };

  return (
    <Button variant="outline-dark" onClick={() => handleOrderInvoiceRequest()}>
      <i className="bi bi-file-text"></i>&nbsp; Invoice
    </Button>
  );
};
