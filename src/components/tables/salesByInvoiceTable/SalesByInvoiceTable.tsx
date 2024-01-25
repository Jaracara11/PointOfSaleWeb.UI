import { Table } from 'react-bootstrap';
import { RecentOrder } from '../../../interfaces/order/RecentOrder';
import { InvoiceByIdBtn } from '../../buttons/invoiceByIdBtn/InvoiceByIdBtn';
import { SalesByInvoiceTableProps } from '../../../interfaces/order/SalesByInvoiceTableProps';

export const SalesByInvoiceTable = ({ orders }: SalesByInvoiceTableProps) => {
  return (
    orders && (
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
          {orders.map((order: RecentOrder) => (
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
    )
  );
};
