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
import { SalesByDateBtn } from '../../components/buttons/salesByDateBtn/SalesByDateBtn';

export const Sales = () => {
  const [initialDate, setInitialDate] = useState<Date>(new Date());
  const [finalDate, setFinalDate] = useState<Date>(new Date());
  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [searchOrderQuery, setSearchOrderQuery] = useState<string>('');

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 30);

  const handleInvoicesFetched = (invoicesByDate: RecentOrder[]) =>
    invoicesByDate && setOrders(invoicesByDate || []);

  const handleSalesFetched = (salesByDate: number) => setTotalSales(salesByDate);

  const filteredOrders = (orders || []).filter((order) =>
    order.orderID.toLowerCase().includes(searchOrderQuery.trim().toLowerCase())
  );

  return (
    <div className="sales common-container">
      <div className="row">
        <h1 className="title">Sales</h1>
      </div>
      <div className="row">
        <div className="date-pickers">
          <span className="text-muted">Order Date Between:</span>
          <DatePicker
            enableTabLoop={false}
            selected={new Date(initialDate.getTime())}
            minDate={minDate}
            maxDate={new Date()}
            onChange={(date) => setInitialDate(date as Date)}
            className="form-control"
          />
          <DatePicker
            enableTabLoop={false}
            selected={new Date(finalDate.getTime())}
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
          <SearchInput searchQuery={searchOrderQuery} setSearchQuery={setSearchOrderQuery} />
        </div>

        <div className="date-pickers">
          <span className="text-muted">Sales Date Between:</span>
          <DatePicker
            enableTabLoop={false}
            selected={new Date(initialDate.getTime())}
            minDate={minDate}
            maxDate={new Date()}
            onChange={(date) => setInitialDate(date as Date)}
            className="form-control"
          />
          <DatePicker
            enableTabLoop={false}
            selected={new Date(finalDate.getTime())}
            minDate={minDate}
            maxDate={new Date()}
            onChange={(date) => setFinalDate(date as Date)}
            className="form-control"
          />
        </div>

        <div className="total-sales">
          <SalesByDateBtn
            initialDate={initialDate}
            finalDate={finalDate}
            onTotalSalesFetched={handleSalesFetched}
          />

          <input className="form-control text-muted" disabled type="text" value={totalSales} />
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
