import { Table } from 'react-bootstrap';
import { useGetRecentOrders } from '../../../hooks/orders.hooks';
import { RecentOrder } from '../../../interfaces/order/RecentOrder';

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
              </tr>
            </thead>
            <tbody>
              {recentOrdersQuery.data.map((order: RecentOrder, index: number) => (
                <tr key={index}>
                  <td>{order.user}</td>
                  <td>{order.orderDate.toString()}</td>
                  <td>${order.orderTotal}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};
