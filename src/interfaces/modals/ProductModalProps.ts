import { Product } from '../inventory/product';
import { Category } from '../inventory/Category';

export interface ProductModalProps {
  toggle: () => void;
  product: Product | null;
  categories: Category[];
}
