import './upsertProduct.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../../../interfaces/product';
import { Category } from '../../../interfaces/category/Category';
import {Form, Button} from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { productValidationSchema } from '../../../services/yupValidation.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorInputView } from '../../../components/errorInputView/ErrorInputView';
import { firstCharToUpper } from '../../../utils/string.helper';
import { useSaveNewProduct, useUpdateProduct } from '../../../hooks/products.hooks';
import { swalConfirmAlert } from '../../../services/swal.service';

export const UpsertProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue
  } = useForm({
    resolver: yupResolver(productValidationSchema)
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>();

  const newProductMutation = useSaveNewProduct();
  const updateProductMutation = useUpdateProduct();

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
      productName: firstCharToUpper(data.productName),
      productDescription: firstCharToUpper(data.productDescription),
      productStock: data.productStock,
      productCost: data.productCost,
      productPrice: data.productPrice,
      productCategoryID: data.productCategoryID
    };

    let confirmTitle = '';
    let confirmAction = null;

    if (product) {
      confirmTitle = `Are you sure you want to update ${productData.productName}'s information?`;
      confirmAction = () => updateProductMutation.mutateAsync(productData);
    } else {
      confirmTitle = `Are you sure you want to add ${productData.productName} as a new product?`;
      confirmAction = () => newProductMutation.mutateAsync(productData);
    }

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Save', 'question');

    isConfirmed && confirmAction().then(() => navigate('/inventory/products'));
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
            value={product?.productName}
            {...register('productName')}
          />
          <ErrorInputView error={errors.productName} />
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter product description"
            value={product?.productDescription}
            {...register('productDescription')}
          />
          <ErrorInputView error={errors.productDescription} />
          <Form.Label>Product Category</Form.Label>
          <Form.Select value={product?.productCategoryID} {...register('productCategoryID')}>
            <option value={0}>Select a category...</option>
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
            value={product?.productStock}
            defaultValue={0}
            {...register('productStock')}
          />
          <ErrorInputView error={errors.productStock} />
          <Form.Label>Product Cost</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product cost"
            value={product?.productCost}
            defaultValue={0}
            {...register('productCost')}
          />
          <ErrorInputView error={errors.productCost} />
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            value={product?.productPrice}
            defaultValue={0}
            {...register('productPrice')}
          />
          <ErrorInputView error={errors.productPrice} />
        </Form.Group>
        <div>
          <Button variant="btn btn-dark" disabled={!isDirty} onClick={handleSubmit(upsertProduct)}>
            <i className="bi bi-database"></i>&nbsp;
            {product ? ' Update' : ' Save'}
          </Button>
          <Button variant="btn btn-danger">
            <i className="bi bi-exclamation-circle"></i>&nbsp; Delete
          </Button>
          <Button variant="outline-dark" onClick={() => navigate('/inventory/products')}>
            <i className="bi bi-arrow-left"></i>&nbsp; Back
          </Button>
        </div>
      </Form>
    </div>
  );
};
