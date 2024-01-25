import { RecentOrder } from './order/RecentOrder';

export interface InvoicesByDateBtnProps {
  initialDate: Date;
  finalDate: Date;
  onInvoicesFetched: (invoices: RecentOrder[]) => void;
}
