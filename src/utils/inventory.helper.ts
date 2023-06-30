import { Category } from '../interfaces/inventory/Category';
import { Product } from '../interfaces/inventory/products/Product';

export const getProductCategoryName = (productCategoryID: number, categoriesList: Category[]) => {
  const category = (categoriesList || []).find(
    (category) => category.categoryID === productCategoryID
  );
  return category ? category.categoryName : '';
};

export const parseProductsFromString = (productsJson: string) =>
  (JSON.parse(productsJson) as Product[]) || [];
