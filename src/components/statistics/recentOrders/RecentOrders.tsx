import { Table } from 'react-bootstrap';
import { RecentOrder } from '../../../interfaces/order/RecentOrder';
import { useGetRecentOrders } from '../../../hooks/orders.hooks';
import { InvoiceByIdBtn } from '../../buttons/invoiceByIdBtn/InvoiceByIdBtn';

export const RecentOrders = () => {
  const recentOrdersQuery = useGetRecentOrders();

  return (
    <div>
      <h4 className="title">Recent Orders</h4>

      <div className="card">
        {recentOrdersQuery.data && (
          <Table striped>
            <thead>
              <tr>
                <th>User</th>
                <th>Date</th>
                <th>Order Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentOrdersQuery.data.map((order: RecentOrder) => (
                <tr key={order.orderID}>
                  <td>{order.user}</td>
                  <td>{order.orderDate.toString()}</td>
                  <td>${order.orderTotal}</td>
                  <td>
                    <InvoiceByIdBtn orderID={order.orderID} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};
