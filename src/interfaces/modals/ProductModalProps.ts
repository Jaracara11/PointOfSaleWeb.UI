import { Product } from '../inventory/products/Product';
import { Category } from '../inventory/Category';

export interface ProductModalProps {
  toggle: () => void;
  product: Product | null;
  categories: Category[];
}
