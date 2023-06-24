export interface OrderRequest {
  user: string;
  products: OrderProducts[];
  discount: number | null;
}

interface OrderProducts {
  productID: number;
  productQuantity: number;
}
