import './home.css';
import { useGetRecentOrders, useGetSalesOfTheDay } from '../../hooks/orders.hooks';
import { RecentOrder } from '../../interfaces/order/RecentOrder';
import { Table } from 'react-bootstrap';

export const Home = () => {
  const recentOrdersQuery = useGetRecentOrders();
  const salesOfTheDayQuery = useGetSalesOfTheDay();

  return (
    <div className="home-container">
      <div className="left-side"></div>
      <div className="right-side">
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
                    <td>{order.orderTotal}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        <div>
          <div className="card">
            <div>
              <h4 className="title">Total sales of the day</h4>
              <h3 className="text-muted">
                <strong>{salesOfTheDayQuery.data && salesOfTheDayQuery.data.toString()}</strong>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
