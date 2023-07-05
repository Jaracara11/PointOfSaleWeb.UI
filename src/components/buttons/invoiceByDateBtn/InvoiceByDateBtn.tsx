import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { InvoiceByDateBtnProps } from '../../../interfaces/order/InvoiceByDateBtnProps';
import { useGetOrdersByDate } from '../../../hooks/orders.hooks';
import { OrderByDate } from '../../../interfaces/order/OrderByDate';

export const InvoiceByDateBtn = ({ initialDate, finalDate }: InvoiceByDateBtnProps) => {
  const [ordersByDate, setOrdersByDate] = useState<OrderByDate[]>();
  const getOrdersByDate = useGetOrdersByDate(initialDate, finalDate);

  const handleOrdersByDateRequest = () => {
    getOrdersByDate.refetch().then((response) => {
      console.log(response);
      setOrdersByDate(response.data);
    });
  };

  return (
    <Button variant="dark" onClick={() => handleOrdersByDateRequest()}>
      Search Invoice
    </Button>
  );
};