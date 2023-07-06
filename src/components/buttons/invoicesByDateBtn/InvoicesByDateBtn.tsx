import { Table } from 'react-bootstrap';
import { useState } from 'react';
import { InvoiceByDateBtnProps } from '../../../interfaces/order/InvoiceByDateBtnProps';
import { OrderByDate } from '../../../interfaces/order/OrderByDate';
import { useGetOrdersByDate } from '../../../hooks/orders.hooks';
import { SearchInput } from '../../searchInput/SearchInput';
import { InvoiceByIdBtn } from '../../invoiceByIdBtn/InvoiceByIdBtn';

export const InvoicesByDateBtn = ({ initialDate, finalDate }: InvoiceByDateBtnProps) => {
  const [orders, setOrders] = useState<OrderByDate[]>();
  const [searchOrderQuery, setSearchOrderQuery] = useState<string>('');
  const getOrdersByDate = useGetOrdersByDate(initialDate, finalDate);

  const handleOrdersByDateRequest = () => {
    getOrdersByDate.refetch().then((response) => {
      response.data && setOrders(response.data);
    });
  };

  const filteredOrders = (orders || []).filter((order) =>
    order.orderID.toLowerCase().includes(order.orderID.trim().toLowerCase())
  );

  return (
    <div>
      <div className="row">
        <SearchInput searchQuery={searchOrderQuery} setSearchQuery={setSearchOrderQuery} />
      </div>
    </div>
  );
};

// <div className="date-pickers">

//         <div className='row'>
//             <SearchInput searchQuery={searchOrderQuery} setSearchQuery={setSearchOrderQuery} />
//           </div>

//       <div className="row">
//      </div>

{
  /* <Table hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Order Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              filteredOrders.map((order: OrderByDate) => (
                <tr key={order.orderID}>
                  <td>{order.orderID}</td>
                  <td>{order.user}</td>
                  <td>${order.orderTotal}</td>
                  <td>
                    <InvoiceByIdBtn orderID={order.orderID} />
                  </td>
                  <td></td>
                </tr>
              ))}
          </tbody>
        </Table> */
}
