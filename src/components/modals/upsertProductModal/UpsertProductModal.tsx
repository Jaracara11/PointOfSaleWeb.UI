import { useEffect, useState } from 'react';
import { Product } from '../../../interfaces/inventory/products/Product';
import { Category } from '../../../interfaces/inventory/Category';
import { Form, Button, Modal } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { productValidationSchema } from '../../../services/yupValidation.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorInputView } from '../../errorInputView/ErrorInputView';
import { firstCharToUpper } from '../../../utils/string.helper';
import { swalConfirmAlert, swalMessageAlert } from '../../../services/swal.service';
import {
  useDeleteProduct,
  useSaveNewProduct,
  useUpdateProduct
} from '../../../hooks/products.hooks';
import { ProductModalProps } from '../../../interfaces/modals/ProductModalProps';
import { LoadingSpinner } from '../../loadingSpinner/LoadingSpinner';

export const UpsertProductModal = ({ toggle, product, categories }: ProductModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(productValidationSchema)
  });

  const [showModal, setShowModal] = useState<boolean>(true);

  const newProductMutation = useSaveNewProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const closeModal = () => {
    setShowModal(false);
    toggle();
  };

  useEffect(() => {
    if (product) {
      setValue('productID', product.productID);
      setValue('productName', product.productName);
      setValue('productDescription', product.productDescription);
      setValue('productStock', product.productStock);
      setValue('productCost', product.productCost);
      setValue('productPrice', product.productPrice);
      setValue('productCategoryID', product.productCategoryID);
    }
  }, [product]);

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

    if (product) {
      confirmTitle = `Are you sure you want to update ${productData.productName}'s information?`;
      confirmAction = () => updateProductMutation.mutateAsync(productData);
    } else {
      confirmTitle = `Are you sure you want to add ${productData.productName} as a new product?`;
      confirmAction = () => newProductMutation.mutateAsync(productData);
    }

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Save', 'question');

    isConfirmed && confirmAction().then(() => toggle());
  };

  const deleteProduct = async (product: Product) => {
    let confirmTitle = `Are you sure you want to <strong>DELETE</strong> the ${product.productName} product?`;

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Delete', 'warning');

    if (isConfirmed) {
      product.productID
        ? deleteProductMutation.mutateAsync(product.productID)
        : swalMessageAlert(
            'Error while trying to delete product, please refresh the page and try again.',
            'error'
          );
      toggle();
    }
  };

  return newProductMutation.isLoading ||
    updateProductMutation.isLoading ||
    deleteProductMutation.isLoading ? (
    <LoadingSpinner />
  ) : (
    <Modal className="form-modal" show={showModal} onHide={closeModal} centered>
      <Form onSubmit={handleSubmit(upsertProduct)}>
        <h3 className="title">{product ? 'Edit' : 'Add New'} Product</h3>
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
          <Form.Select
            {...register('productCategoryID')}
            defaultValue={watch('productCategoryID') || 0}
          >
            <option value={0}>Select a category...</option>
            {categories &&
              categories.map((category: Category) => (
                <option key={category.categoryID} value={category.categoryID}>
                  {category.categoryName}
                </option>
              ))}
          </Form.Select>
          <ErrorInputView error={errors.productCategoryID} />
          <Form.Label>Product Stock</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product stock"
            {...register('productStock')}
          />
          <ErrorInputView error={errors.productStock} />
          <Form.Label>Product Cost</Form.Label>
          <Form.Control type="text" placeholder="Enter product cost" {...register('productCost')} />
          <ErrorInputView error={errors.productCost} />
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product price"
            {...register('productPrice')}
          />
          <ErrorInputView error={errors.productPrice} />
        </Form.Group>

        <Button variant="btn btn-dark" disabled={!isDirty} onClick={handleSubmit(upsertProduct)}>
          <i className="bi bi-database"></i>&nbsp;
          {product ? ' Update' : ' Save'}
        </Button>

        {product && (
          <Button variant="btn btn-danger" onClick={() => deleteProduct(product)}>
            <i className="bi bi-exclamation-circle"></i>&nbsp; Delete
          </Button>
        )}

        <Button variant="outline-dark" onClick={toggle}>
          <i className="bi bi-x-lg"></i>&nbsp;Cancel
        </Button>
      </Form>
    </Modal>
  );
};
