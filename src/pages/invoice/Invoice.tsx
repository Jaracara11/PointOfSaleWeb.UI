import './invoice.css';
import { useLocation } from 'react-router-dom';
import { NotFound } from '../notFound/NotFound';
import { OrderInfo } from '../../interfaces/order/OrderInfo';
import { Button, Table } from 'react-bootstrap';
import { getUserAuth } from '../../services/user.Service';
import { OrderProduct } from '../../interfaces/order/OrderProduct';
import { parseProductsJSON } from '../../utils/inventory.helper';

export const Invoice = () => {
  const location = useLocation();

  if (!location.state) return <NotFound />;

  const orderInfo = location.state.data as OrderInfo;

  const calculateOrderTotal = (index: number) =>
    orderInfo.products
      .slice(0, index + 1)
      .reduce((total, item) => total + (item.productPrice || 0) * (item.productQuantity || 1), 0)
      .toFixed(2);

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
                {orderInfo.products.map((orderItem: OrderProduct, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{orderItem.productName}</td>
                    <td>${orderItem.productPrice}</td>
                    <td>{orderItem.productQuantity} unit(s)</td>
                    <td>${calculateOrderTotal(index)}</td>
                  </tr>
                ))}
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
                  <span>{orderInfo.orderDate.toString()}</span>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <span className="title">Sub-Total: </span>
                    <span>${orderInfo.orderSubTotal.toFixed(2)}</span>
                  </div>
                  {orderInfo.discount && (
                    <div>
                      <span className="title">Discount: </span>
                      <span>-${orderInfo.discount}</span>
                    </div>
                  )}
                  <div>
                    <span className="title">Total: </span>
                    <span>${orderInfo.orderTotal.toFixed(2)}</span>
                  </div>

                  <Button variant="dark" onClick={() => window.print()}>
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
