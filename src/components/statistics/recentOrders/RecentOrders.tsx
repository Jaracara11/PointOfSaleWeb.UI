import { Table } from 'react-bootstrap';
import { useGetRecentOrders } from '../../../hooks/orders.hooks';
import { RecentOrder } from '../../../interfaces/order/RecentOrder';
import { getOrderByID } from '../../../repository/orderRepository';
import { OrderInfo } from '../../../interfaces/order/OrderInfo';
import { useNavigate } from 'react-router-dom';

export const RecentOrders = () => {
  const recentOrdersQuery = useGetRecentOrders();

  const navigate = useNavigate();

  const viewOrderDetails = (orderID: string) => {
    getOrderByID(orderID).then((response: OrderInfo) => {
      navigate('/invoice', { state: { data: response } });
    });
  };

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
                    <a href="#" onClick={() => viewOrderDetails(order.orderID)}>
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
