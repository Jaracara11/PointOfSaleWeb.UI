import { useNavigate } from 'react-router-dom';
import { getOrderByID } from '../repository/orderRepository';
import { OrderInfo } from '../interfaces/order/OrderInfo';
import { useState } from 'react';
import { handleErrorResponse } from '../services/error.Service';

export const useGetOrderInvoiceByID = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const getOrderInvoiceByID = (orderID: string) => {
    setIsLoading(true);
    getOrderByID(orderID)
      .then((response: OrderInfo) => {
        navigate('/invoice', { state: { data: response } });
      })
      .catch((error: Error) => {
        handleErrorResponse(error, '');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { getOrderInvoiceByID, isLoading };
};
