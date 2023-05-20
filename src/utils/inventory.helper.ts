import { Category } from '../interfaces/category/Category';

export const getProductCategoryName = (productCategoryID: number, categoriesList: Category[]) => {
  const category = (categoriesList || []).find(
    (category) => category.categoryID === productCategoryID
  );
  return category ? category.categoryName : '';
};
