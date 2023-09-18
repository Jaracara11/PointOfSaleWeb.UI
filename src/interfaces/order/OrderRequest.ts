export interface OrderRequest {
  user: string;
  products: OrderRequestProducts[];
  discount: number | null;
}

interface OrderRequestProducts {
  productID: string;
  productQuantity: number;
}
