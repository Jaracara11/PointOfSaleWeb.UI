import './sales.css';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { RecentOrder } from '../../interfaces/order/RecentOrder';
import { OrderInvoiceBtn } from '../../components/orderInvoiceBtn/OrderInvoiceBtn';

export const Sales = () => {
  const [initialDate, setInitialDate] = useState<Date>(new Date());
  const [finalDate, setFinalDate] = useState<Date>(new Date());
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>();

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 30);

  const searchInvoice = (initialDate: Date, finalDate: Date) => {
    //getOrdersByDate(initialDate, finalDate).then((response: RecentOrder[]) => {});
  };

  return (
    <div className="sales">
      <div className="row">
        <h1 className="title">Sales</h1>
      </div>
      <div className="row">
        <div className="date-pickers">
          <div>
            <span className="text-muted">Order Date Between: </span>

            <DatePicker
              enableTabLoop={false}
              selected={initialDate}
              minDate={minDate}
              maxDate={new Date()}
              onChange={(date) => setInitialDate(date as Date)}
              className="form-control"
            />

            <DatePicker
              enableTabLoop={false}
              selected={finalDate}
              minDate={minDate}
              maxDate={new Date()}
              onChange={(date) => setFinalDate(date as Date)}
              className="form-control"
            />
          </div>

          <div>
            <Button variant="dark" onClick={() => searchInvoice(initialDate, finalDate)}>
              Search Invoice
            </Button>
          </div>
        </div>
      </div>
      <div className="row">
        <Table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Order Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recentOrders &&
              recentOrders.map((order: RecentOrder) => (
                <tr key={order.orderID}>
                  <td>{order.user}</td>
                  <td>{order.orderDate.toString()}</td>
                  <td>${order.orderTotal}</td>
                  <td>
                    <OrderInvoiceBtn orderID={order.orderID} />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
