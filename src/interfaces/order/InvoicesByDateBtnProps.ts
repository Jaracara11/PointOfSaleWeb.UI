import { RecentOrder } from './RecentOrder';

export interface InvoicesByDateBtnProps {
  initialDate: Date;
  finalDate: Date;
  onInvoicesFetched: (invoices: RecentOrder[]) => void;
}
