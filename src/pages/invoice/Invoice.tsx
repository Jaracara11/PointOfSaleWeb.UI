import './invoice.css';
import { useLocation } from 'react-router-dom';
import { NotFound } from '../notFound/NotFound';
import { Order } from '../../interfaces/order/Order';
import { Table } from 'react-bootstrap';

export const Invoice = () => {
  const location = useLocation();

  if (!location.state) return <NotFound />;

  const orderInfo = location.state.data as Order;

  console.log(orderInfo);

  return (
    <div className="invoice-container">
      <div className="row">
        <h1 className="title">Thanks for shopping with us!</h1>
      </div>

      <div className="card">
        <div className="card-body">
          <h4>Invoice # {orderInfo.orderID}</h4>
          <hr />
          <div>
            <h5>Order Summary</h5>
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
