import { ProductSold } from './inventory/products/ProductSold';
import { RecentOrder } from './order/RecentOrder';

export interface SalesInfoByDateBtnProps {
  initialDate: Date;
  finalDate: Date;
  onInvoicesFetched?: (invoices: RecentOrder[]) => void;
  onProductsFetched?: (products: ProductSold[]) => void;
}
