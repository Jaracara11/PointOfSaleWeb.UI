export interface SalesByDateBtnProps {
  initialDate: Date;
  finalDate: Date;
  onTotalSalesFetched: (invoices: number) => void;
}
