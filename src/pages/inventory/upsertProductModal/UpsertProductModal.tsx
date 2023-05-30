import './upsertProductModal.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../../../interfaces/inventory/product';
import { Category } from '../../../interfaces/inventory/Category';
import { Form, Button, Modal } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { productValidationSchema } from '../../../services/yupValidation.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorInputView } from '../../../components/errorInputView/ErrorInputView';
import { firstCharToUpper } from '../../../utils/string.helper';
import { swalConfirmAlert } from '../../../services/swal.service';
import {
  useDeleteProduct,
  useSaveNewProduct,
  useUpdateProduct
} from '../../../hooks/products.hooks';

export const UpsertProductModal = (toggle: () => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(productValidationSchema)
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>();
  const [showModal, setShowModal] = useState<boolean>(true);

  const newProductMutation = useSaveNewProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const closeModal = () => {
    setShowModal(false);
    toggle();
  };

  useEffect(() => {
    if (location.state.product) {
      setValue('productID', location.state.product.productID);
      setValue('productName', location.state.product.productName);
      setValue('productDescription', location.state.product.productDescription);
      setValue('productStock', location.state.product.productStock);
      setValue('productCost', location.state.product.productCost);
      setValue('productPrice', location.state.product.productPrice);
      setValue('productCategoryID', location.state.product.productCategoryID);
    }
    setCategories(location.state.categories || location.state);
  }, []);

  const upsertProduct: SubmitHandler<FieldValues> = async (data) => {
    const productData: Product = {
      productID: data.productID,
      productName: firstCharToUpper(data.productName),
      productDescription: firstCharToUpper(data.productDescription),
      productStock: data.productStock,
      productCost: data.productCost,
      productPrice: data.productPrice,
      productCategoryID: data.productCategoryID
    };

    let confirmTitle = '';
    let confirmAction = null;

    if (location.state.product) {
      confirmTitle = `Are you sure you want to update ${productData.productName}'s information?`;
      confirmAction = () => updateProductMutation.mutateAsync(productData);
    } else {
      confirmTitle = `Are you sure you want to add ${productData.productName} as a new product?`;
      confirmAction = () => newProductMutation.mutateAsync(productData);
    }

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Save', 'question');

    isConfirmed && confirmAction().then(() => navigate('/products'));
  };

  const deleteProduct = async (productID: number) => {
    let confirmTitle = `Are you sure you want to <strong>DELETE</strong> the ${location.state.product.productName} product?`;

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Delete', 'warning');

    isConfirmed && deleteProductMutation.mutateAsync(productID).then(() => navigate('/products'));
  };

  return (
    <Modal className="product-upsert-modal" show={showModal} onHide={closeModal} centered>
      <Form className="card" onSubmit={handleSubmit(upsertProduct)}>
        <h1 className="title">{location.state.product ? 'Edit' : 'Add New'} Product</h1>
        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" placeholder="Enter product name" {...register('productName')} />
          <ErrorInputView error={errors.productName} />
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter product description"
            {...register('productDescription')}
          />
          <ErrorInputView error={errors.productDescription} />
          <Form.Label>Product Category</Form.Label>
          <Form.Select {...register('productCategoryID')}>
            <option value={0}>Select a category...</option>
            {categories &&
              categories.map((category) => (
                <option
                  key={category.categoryID}
                  value={category.categoryID}
                  selected={category.categoryID === watch('productCategoryID')}
                >
                  {category.categoryName}
                </option>
              ))}
          </Form.Select>
          <ErrorInputView error={errors.productCategoryID} />
          <Form.Label>Product Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product stock"
            {...register('productStock')}
          />
          <ErrorInputView error={errors.productStock} />
          <Form.Label>Product Cost</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product cost"
            {...register('productCost')}
          />
          <ErrorInputView error={errors.productCost} />
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            {...register('productPrice')}
          />
          <ErrorInputView error={errors.productPrice} />
        </Form.Group>
        <div className="btn-panel">
          <Button variant="btn btn-dark" disabled={!isDirty} onClick={handleSubmit(upsertProduct)}>
            <i className="bi bi-database"></i>&nbsp;
            {location.state.product ? ' Update' : ' Save'}
          </Button>

          {location.state.product && (
            <Button
              variant="btn btn-danger"
              onClick={() => deleteProduct(location.state.product.productID)}
            >
              <i className="bi bi-exclamation-circle"></i>&nbsp; Delete
            </Button>
          )}

          <Button variant="outline-dark" onClick={() => navigate('/products')}>
            <i className="bi bi-arrow-left"></i>&nbsp; Back
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
