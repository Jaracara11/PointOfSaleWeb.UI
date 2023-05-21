import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../../../interfaces/product';
import { Category } from '../../../interfaces/category/Category';
import Form from 'react-bootstrap/esm/Form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { productValidation } from '../../../services/yupValidation.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorInputView } from '../../../components/errorInputView/ErrorInputView';

export const UpsertProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(productValidation)
  });

  const location = useLocation();
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    if (location.state.product) {
      setProduct(location.state.product);
      setCategories(location.state.categories);
    } else {
      setCategories(location.state);
    }
  }, [location.state]);

  const upsertProduct: SubmitHandler<FieldValues> = async (data) => {
    const productData: Product = {
      productID: data.productID,
      productName: data.productName,
      productDescription: data.productDescription,
      productStock: data.productStock,
      productCost: data.productCost,
      productPrice: data.productPrice,
      productCategoryID: data.productCategoryID
    };
  };

  return (
    <div className="upsert-product container-fluid">
      <h1>{location.state ? 'Edit' : 'Add New'} Product</h1>
      <Form onSubmit={handleSubmit(upsertProduct)}>
        <Form.Group className="">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            defaultValue={product?.productName}
            {...register('productName')}
          />
          <ErrorInputView error={errors.productName} />
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product description"
            defaultValue={product?.productDescription}
            {...register('productDescription')}
          />
          <Form.Label>Product Category</Form.Label>
          <Form.Select defaultValue={product?.productCategoryID} {...register('productCategoryID')}>
            <option>Select a category...</option>
            {categories &&
              categories.map((category) => (
                <option key={category.categoryID} value={category.categoryID}>
                  {category.categoryName}
                </option>
              ))}
          </Form.Select>
          <Form.Label>Product Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product stock"
            defaultValue={product?.productStock}
            {...register('productStock')}
          />
          <Form.Label>Product Cost</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product cost"
            defaultValue={product?.productCost}
            {...register('productCost')}
          />
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            defaultValue={product?.productPrice}
            {...register('productPrice')}
          />
        </Form.Group>
      </Form>
    </div>
  );
};
