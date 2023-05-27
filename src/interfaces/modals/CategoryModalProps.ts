import { Category } from '../inventory/Category';

export interface CategoryModalProps {
  toggle: () => void;
  category: Category | null;
}
