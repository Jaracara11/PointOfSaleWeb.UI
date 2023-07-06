import { RecentOrder } from './RecentOrder';

export interface InvoiceByDateBtnProps {
  initialDate: Date;
  finalDate: Date;
  onInvoicesFetched: (invoices: RecentOrder[]) => void;
}
