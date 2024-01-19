import './sales.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
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
  const [invoiceView, setInvoiceView] = useState<boolean>(true);

  const handleInvoicesFetched = (invoicesByDate: RecentOrder[]) =>
    invoicesByDate && setOrders(invoicesByDate || []);

  const handleSalesFetched = (salesByDate: number) => setTotalSales(salesByDate);

  const filteredOrders = (orders || []).filter((order) =>
    order.orderID.toLowerCase().includes(searchOrderQuery.trim().toLowerCase())
  );

  const toggleView = () => setInvoiceView((prev) => !prev);

  return (
    <div className="sales common-container">
      <div className="row">
        <h1 className="title">Sales By {invoiceView ? 'Invoices' : 'Products'}</h1>
        <div>
          <Button variant="dark" onClick={() => toggleView()}>
            Change View
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="date-pickers">
          <span className="text-muted">Date Between:</span>
          <DatePicker
            enableTabLoop={false}
            selected={new Date(initialDate.getTime())}
            maxDate={new Date()}
            onChange={(date) => setInitialDate(date as Date)}
            className="form-control"
          />
          <DatePicker
            enableTabLoop={false}
            selected={new Date(finalDate.getTime())}
            maxDate={new Date()}
            onChange={(date) => setFinalDate(date as Date)}
            className="form-control"
          />
        </div>

        <div className="history-panel">
          <InvoicesByDateBtn
            initialDate={initialDate}
            finalDate={finalDate}
            onInvoicesFetched={handleInvoicesFetched}
          />

          <SalesByDateBtn
            initialDate={initialDate}
            finalDate={finalDate}
            onTotalSalesFetched={handleSalesFetched}
          />

          <input
            className="form-control text-muted"
            disabled
            type="text"
            value={'$' + totalSales}
          />
        </div>
        <div>
          <SearchInput searchQuery={searchOrderQuery} setSearchQuery={setSearchOrderQuery} />
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
