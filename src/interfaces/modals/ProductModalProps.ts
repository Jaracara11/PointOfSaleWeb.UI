import { Product } from '../inventory/product';
import { Category } from '../Category';

export interface ProductModalProps {
  toggle: () => void;
  product: Product | null;
  categories: Category[];
}
