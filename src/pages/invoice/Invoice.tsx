import './invoice.css';
import { useLocation } from 'react-router-dom';
import { NotFound } from '../notFound/NotFound';
import { Order } from '../../interfaces/order/Order';
import { Table } from 'react-bootstrap';
import { Product } from '../../interfaces/inventory/product';

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
              <tbody>
                {orderInfo.products.map((orderItem: Product, index: number) => {
                  const cumulativeTotal = orderInfo.products
                    .slice(0, index + 1)
                    .reduce(
                      (total, item) =>
                        total + (item.productPrice || 0) * (item.productQuantity || 1),
                      0
                    );

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{orderItem.productName}</td>
                      <td>{orderItem.productPrice}</td>
                      <td>{orderItem.productQuantity}</td>
                      <td>{cumulativeTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
