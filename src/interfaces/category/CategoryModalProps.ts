import { Category } from './Category';

export interface CategoryModalProps {
  toggle: () => void;
  category: Category | null;
}
