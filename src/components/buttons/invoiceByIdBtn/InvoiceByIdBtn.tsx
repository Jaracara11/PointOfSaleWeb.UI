import { useNavigate } from 'react-router-dom';
import { useGetOrderByID } from '../../../hooks/orders.hooks';

export const InvoiceByIdBtn = ({ orderID }: { orderID: string }) => {
  const navigate = useNavigate();
  const getOrderInvoiceByID = useGetOrderByID(orderID);

  const handleOrderInvoiceRequest = () => {
    getOrderInvoiceByID.refetch().then((response) => {
      navigate('/invoice', { state: { data: response.data } });
    });
  };

  return (
    <button className="btn btn-outline-dark" onClick={() => handleOrderInvoiceRequest()}>
      <i className="bi bi-file-text"></i>&nbsp; Invoice
    </button>
  );
};
