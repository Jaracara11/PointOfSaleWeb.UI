import { Table } from 'react-bootstrap';
import { RecentOrder } from '../../../interfaces/order/RecentOrder';
import { useGetRecentOrders } from '../../../hooks/orders.hooks';
import { useGetOrderInvoiceByID } from '../../../hooks/invoice.hooks';
import { LoadingSpinner } from '../../loadingSpinner/LoadingSpinner';

export const RecentOrders = () => {
  const recentOrdersQuery = useGetRecentOrders();
  const { getOrderInvoiceByID, isLoading } = useGetOrderInvoiceByID();

  return isLoading ? (
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
                  <td>${order.orderTotal}</td>
                  <td>
                    <a href="#" onClick={() => getOrderInvoiceByID(order.orderID)}>
                      Invoice
                    </a>
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
