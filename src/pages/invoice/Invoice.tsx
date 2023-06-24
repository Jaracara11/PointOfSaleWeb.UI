import './invoice.css';
import { useLocation } from 'react-router-dom';
import { NotFound } from '../notFound/NotFound';
import { Order } from '../../interfaces/order/Order';
import { Button, Table } from 'react-bootstrap';
import { Product } from '../../interfaces/inventory/product';
import { getUserAuth } from '../../services/user.Service';

export const Invoice = () => {
  const location = useLocation();

  if (!location.state) return <NotFound />;

  const orderInfo = location.state.data as Order;

  const calculateOrderTotal = (index: number) =>
    orderInfo.products
      .slice(0, index + 1)
      .reduce((total, item) => total + (item.productPrice || 0) * (item.productQuantity || 1), 0)
      .toFixed(2);

  const printInvoice = () => window.print();

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
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{orderItem.productName}</td>
                      <td>{orderItem.productPrice}$</td>
                      <td>{orderItem.productQuantity}</td>
                      <td>{calculateOrderTotal(index)}$</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="order-summary">
              <div>
                <div>
                  <span className="title">Billed by: </span>
                  <span>{getUserAuth()?.name}</span>
                </div>
                <div>
                  <span className="title">Purchase Date: </span>
                  <span>{orderInfo.orderDate.toDateString()}</span>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <span className="title">Sub-Total: </span>
                    <span>
                      {(orderInfo.orderTotal + (orderInfo.discount || 0) * 100).toFixed(2)}$
                    </span>
                  </div>
                  {orderInfo.discount && (
                    <div>
                      <span className="title">Discount: </span>
                      <span>-{orderInfo.discount * 100}$</span>
                    </div>
                  )}
                  <div>
                    <span className="title">Total: </span>
                    <span>{orderInfo.orderTotal.toFixed(2)}$</span>
                  </div>

                  <Button variant="dark" onClick={printInvoice}>
                    Print
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};