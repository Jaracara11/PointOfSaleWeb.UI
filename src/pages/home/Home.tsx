import './home.css';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useGetRecentOrders } from '../../hooks/orders.hooks';
import { RecentOrder } from '../../interfaces/order/RecentOrder';
import { Table } from 'react-bootstrap';

export const Home = () => {
  const { user } = useContext(UserContext) || {};

  const recentOrdersQuery = useGetRecentOrders();

  console.log(recentOrdersQuery.data);

  return (
    <div className="home-container">
      <div></div>
      <div>
        <div className="card">
          {recentOrdersQuery.data && (
            <Table>
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
                    <td>{order.orderTotal}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};
