import { OrderByDate } from './OrderByDate';

export interface InvoiceByDateBtnProps {
  initialDate: Date;
  finalDate: Date;
  onInvoicesFetched: (invoices: OrderByDate[]) => void;
}
