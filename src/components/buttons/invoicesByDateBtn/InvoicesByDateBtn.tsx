import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { InvoiceByDateBtnProps } from '../../../interfaces/order/InvoiceByDateBtnProps';
import { useGetOrdersByDate } from '../../../hooks/orders.hooks';
import { SearchInput } from '../../searchInput/SearchInput';
import { InvoiceByIdBtn } from '../invoiceByIdBtn/InvoiceByIdBtn';
import { RecentOrder } from '../../../interfaces/order/RecentOrder';

export const InvoicesByDateBtn = ({ initialDate, finalDate }: InvoiceByDateBtnProps) => {
  const [orders, setOrders] = useState<RecentOrder[]>();
  const [searchOrderQuery, setSearchOrderQuery] = useState<string>('');
  const getOrdersByDate = useGetOrdersByDate(initialDate, finalDate);

  useEffect(() => {
    const handleOrdersByDateRequest = () => {
      getOrdersByDate.refetch().then((response) => {
        response.data && setOrders(response.data);
      });
    };

    handleOrdersByDateRequest();
  }, [initialDate, finalDate]);

  const filteredOrders = (orders || []).filter((order) =>
    order.orderID.toLowerCase().includes(searchOrderQuery.trim().toLowerCase())
  );

  return (
    <div>
      <div className="row">
        <SearchInput searchQuery={searchOrderQuery} setSearchQuery={setSearchOrderQuery} />
      </div>
      <div className="row">
        <Table hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Order Total</th>
              <th>Order Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              filteredOrders.map((order: RecentOrder) => (
                <tr key={order.orderID}>
                  <td>{order.orderID}</td>
                  <td>{order.user}</td>
                  <td>${order.orderTotal}</td>
                  <td>{order.orderDate.toString()}</td>
                  <td>
                    <InvoiceByIdBtn orderID={order.orderID} />
                  </td>
                  <td></td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
