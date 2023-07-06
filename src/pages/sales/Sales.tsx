import './sales.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { InvoiceByIdBtn } from '../../components/buttons/invoiceByIdBtn/InvoiceByIdBtn';
import { InvoicesByDateBtn } from '../../components/buttons/invoicesByDateBtn/InvoicesByDateBtn';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { RecentOrder } from '../../interfaces/order/RecentOrder';

export const Sales = () => {
  const [initialDate, setInitialDate] = useState<Date>(new Date());
  const [finalDate, setFinalDate] = useState<Date>(new Date());
  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [searchOrderQuery, setSearchOrderQuery] = useState<string>('');

  initialDate.setUTCHours(0, 0, 0, 0);
  finalDate.setUTCHours(23, 59, 0, 0);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 30);

  const handleInvoicesFetched = (invoicesByDate: RecentOrder[]) => {
    console.log(invoicesByDate);
    invoicesByDate && setOrders(invoicesByDate || []);
  };

  const filteredOrders = (orders || []).filter((order) =>
    order.orderID.toLowerCase().includes(searchOrderQuery.trim().toLowerCase())
  );

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
              selected={new Date(initialDate.getTime() + initialDate.getTimezoneOffset() * 60000)}
              minDate={minDate}
              maxDate={new Date()}
              onChange={(date) => setInitialDate(date as Date)}
              className="form-control"
            />

            <DatePicker
              enableTabLoop={false}
              selected={new Date(finalDate.getTime() + finalDate.getTimezoneOffset() * 60000)}
              minDate={minDate}
              maxDate={new Date()}
              onChange={(date) => setFinalDate(date as Date)}
              className="form-control"
            />
          </div>

          <div>
            <InvoicesByDateBtn
              initialDate={initialDate}
              finalDate={finalDate}
              onInvoicesFetched={handleInvoicesFetched}
            />
          </div>
          <div>
            <SearchInput searchQuery={searchOrderQuery} setSearchQuery={setSearchOrderQuery} />
          </div>
        </div>
      </div>
      <div className="row">
        <Table hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Order Total</th>
              <th>Order Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              filteredOrders.map((order: RecentOrder) => (
                <tr key={order.orderID}>
                  <td>{order.orderID}</td>
                  <td>{order.user}</td>
                  <td>${order.orderTotal}</td>
                  <td>{order.orderDate.toString()}</td>
                  <td>
                    <InvoiceByIdBtn orderID={order.orderID} />
                  </td>
                  <td></td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
