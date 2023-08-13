import { Table } from 'react-bootstrap';
import { RecentOrder } from '../../../interfaces/order/RecentOrder';
import { useGetRecentOrders } from '../../../hooks/orders.hooks';
import { InvoiceByIdBtn } from '../../buttons/invoiceByIdBtn/InvoiceByIdBtn';
import { LoadingSpinner } from '../../loadingSpinner/LoadingSpinner';

export const RecentOrders = () => {
  const recentOrdersQuery = useGetRecentOrders();

  return recentOrdersQuery.isLoading ? (
    <LoadingSpinner />
  ) : (
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
                  <td>{order.orderTotal === 0 ? 'Cancelled' : `${order.orderTotal}`}</td>
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
