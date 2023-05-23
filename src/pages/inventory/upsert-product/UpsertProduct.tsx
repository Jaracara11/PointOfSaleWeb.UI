import './upsertProduct.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../../interfaces/product';
import { Category } from '../../../interfaces/category/Category';
import Form from 'react-bootstrap/esm/Form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { productValidationSchema } from '../../../services/yupValidation.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorInputView } from '../../../components/errorInputView/ErrorInputView';
import Button from 'react-bootstrap/esm/Button';

export const UpsertProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(productValidationSchema)
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

    console.log(productData);
  };

  return (
    <div className="upsert-product-container container-fluid">
      <h1>{location.state ? 'Edit' : 'Add New'} Product</h1>
      <Form className="card" onSubmit={handleSubmit(upsertProduct)}>
        <Form.Group>
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
            as="textarea"
            placeholder="Enter product description"
            defaultValue={product?.productDescription}
            {...register('productDescription')}
          />
          <ErrorInputView error={errors.productDescription} />
          <Form.Label>Product Category</Form.Label>
          <Form.Select value={product?.productCategoryID} {...register('productCategoryID')}>
            <option>Select a category...</option>
            {categories &&
              categories.map((category) => (
                <option key={category.categoryID} value={category.categoryID}>
                  {category.categoryName}
                </option>
              ))}
          </Form.Select>
          <ErrorInputView error={errors.productCategoryID} />
          <Form.Label>Product Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product stock"
            defaultValue={product?.productStock}
            {...register('productStock')}
          />
          <ErrorInputView error={errors.productStock} />
          <Form.Label>Product Cost</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product cost"
            defaultValue={product?.productCost}
            {...register('productCost')}
          />
          <ErrorInputView error={errors.productCost} />
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            defaultValue={product?.productPrice}
            {...register('productPrice')}
          />
          <ErrorInputView error={errors.productPrice} />
        </Form.Group>
        <div>
          <Button variant="btn btn-dark" disabled={!isDirty}>
            <i className="bi bi-database"></i>&nbsp;
            {product ? ' Update' : ' Save'}
          </Button>
          <Button variant="btn btn-danger">
            <i className="bi bi-exclamation-circle"></i>&nbsp; Delete
          </Button>
          <Link className="btn btn-outline-dark" to="/inventory/products">
            <i className="bi bi-arrow-left"></i>&nbsp; Back
          </Link>
        </div>
      </Form>
    </div>
  );
};
