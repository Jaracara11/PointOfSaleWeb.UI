import './home.css';
import {
  useGetBestSellerProducts,
  useGetRecentOrders,
  useGetSalesOfTheDay
} from '../../hooks/orders.hooks';
import { RecentOrder } from '../../interfaces/order/RecentOrder';
import { Table } from 'react-bootstrap';
import { BestSellerProduct } from '../../interfaces/inventory/products/BestSellerProduct';

export const Home = () => {
  const recentOrdersQuery = useGetRecentOrders();
  const salesOfTheDayQuery = useGetSalesOfTheDay();
  const bestSellerProducts = useGetBestSellerProducts();

  return (
    <div className="home-container">
      <div className="left-side">
        <h4 className="title">Most Popular Products</h4>
        <div className="card">
          {bestSellerProducts.data && (
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Total Quantity Sold</th>
                </tr>
              </thead>
              <tbody>
                {bestSellerProducts.data.map((product: BestSellerProduct, index: number) => (
                  <tr key={index}>
                    <td>
                      {product.productName}
                      <div>
                        <small className="text-muted">{product.productDescription}</small>
                      </div>
                    </td>
                    <td>{product.totalQuantitySold} units</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
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
                    <td>${order.orderTotal}</td>
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
                <strong>${salesOfTheDayQuery.data && salesOfTheDayQuery.data.toString()}</strong>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
