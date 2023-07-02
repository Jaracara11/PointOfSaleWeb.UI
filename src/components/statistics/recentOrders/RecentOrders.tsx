import { Table } from 'react-bootstrap';
import { useGetRecentOrders } from '../../../hooks/orders.hooks';
import { RecentOrder } from '../../../interfaces/order/RecentOrder';
import { useState } from 'react';
import { OrderDetailModal } from '../../modals/orderDetailModal/OrderDetailModal';

export const RecentOrders = () => {
  const recentOrdersQuery = useGetRecentOrders();
  const [orderID, setOrderID] = useState<string>();
  const [showOrderDetailModal, setShowOrderDetailModal] = useState<boolean>(false);

  const toggleOrderDetailsModal = () => setShowOrderDetailModal((prev) => !prev);

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
              {recentOrdersQuery.data.map((order: RecentOrder) => (
                <tr key={order.orderID}>
                  <td>{order.user}</td>
                  <td>{order.orderDate.toString()}</td>
                  <td>${order.orderTotal}</td>
                  <td>
                    <a
                      href="#"
                      onClick={() => {
                        setOrderID(order.orderID);
                        toggleOrderDetailsModal();
                      }}
                    >
                      Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {showOrderDetailModal && (
        <OrderDetailModal toggle={toggleOrderDetailsModal} orderID={orderID || ''} />
      )}
    </div>
  );
};
