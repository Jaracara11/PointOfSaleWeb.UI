import { Category } from '../interfaces/inventory/Category';
import { OrderProduct } from '../interfaces/order/OrderProduct';

export const getProductCategoryName = (productCategoryID: number, categoriesList: Category[]) => {
  const category = (categoriesList || []).find((category) => category.categoryID === productCategoryID);
  return category ? category.categoryName : '';
};

export const parseProductsJSON = (productsJson: string): OrderProduct[] => {
  if (!productsJson || productsJson.trim() === '') {
    return [
      {
        productName: 'Product no longer exist',
        productDescription: '',
        productQuantity: 0,
        productPrice: 0,
        productCategory: ''
      }
    ];
  } else {
    return JSON.parse(productsJson).map((product: any) => ({
      productName: product.ProductName,
      productDescription: product.ProductDescription,
      productQuantity: product.ProductQuantity,
      productPrice: product.ProductPrice,
      productCategory: product.ProductCategoryName
    }));
  }
};
