import './categoryModa.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Modal } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { categoryValidationSchema } from '../../../services/yupValidation.service';
import { ErrorInputView } from '../../errorInputView/ErrorInputView';
import { Category } from '../../../interfaces/inventory/Category';
import { useEffect, useState } from 'react';
import { firstCharToUpper } from '../../../utils/string.utils';
import { swalConfirmAlert, swalMessageAlert } from '../../../services/swal.service';
import { CategoryModalProps } from '../../../interfaces/modals/CategoryModalProps';
import {
  useDeleteCategory,
  useSaveNewCategory,
  useUpdateCategory
} from '../../../hooks/categories.hooks';
import { LoadingSpinner } from '../../loadingSpinner/LoadingSpinner';

export const CategoryModal = ({ toggle, category }: CategoryModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue
  } = useForm({
    resolver: yupResolver(categoryValidationSchema)
  });

  const [showModal, setShowModal] = useState<boolean>(true);

  const newCategoryMutation = useSaveNewCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const closeModal = () => {
    setShowModal(false);
    toggle();
  };

  useEffect(() => {
    if (category) {
      setValue('categoryID', category.categoryID);
      setValue('categoryName', category.categoryName);
    }
  }, [category]);

  const upsertCategory: SubmitHandler<FieldValues> = async (data) => {
    const categoryData: Category = {
      categoryID: data.categoryID,
      categoryName: firstCharToUpper(data.categoryName)
    };

    let confirmTitle = '';
    let confirmAction = null;

    if (category) {
      confirmTitle = `Are you sure you want to change ${category.categoryName}'s name to ${categoryData.categoryName}?`;
      confirmAction = () => updateCategoryMutation.mutateAsync(categoryData);
    } else {
      confirmTitle = `Are you sure you want to add ${categoryData.categoryName} as a new category?`;
      confirmAction = () => newCategoryMutation.mutateAsync(categoryData);
    }

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Save', 'question');

    isConfirmed && confirmAction().then(() => toggle());
  };

  const deleteCategory = async (categoryData: Category) => {
    const confirmTitle = `Are you sure you want to <strong>DELETE</strong> the ${categoryData.categoryName} category?`;

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Delete', 'warning');

    if (isConfirmed) {
      categoryData.categoryID
        ? deleteCategoryMutation.mutateAsync(categoryData.categoryID)
        : swalMessageAlert(
            'Error while trying to delete category, please refresh the page and try again.',
            'error'
          );
      toggle();
    }
  };

  return newCategoryMutation.isPending ||
    updateCategoryMutation.isPending ||
    deleteCategoryMutation.isPending ? (
    <LoadingSpinner />
  ) : (
    <Modal className="category-modal" show={showModal} onHide={closeModal} centered>
      <Form onSubmit={handleSubmit(upsertCategory)}>
        <h3 className="title">{category ? 'Edit' : 'Add New'} Category</h3>
        <Modal.Body>
          <Form.Control type="text" placeholder="New Category Name" {...register('categoryName')} />
          <ErrorInputView error={errors.categoryName} />

          <Button variant="dark" disabled={!isDirty} onClick={handleSubmit(upsertCategory)}>
            <i className="bi bi-database"></i>&nbsp;{category ? ' Update' : ' Save'}
          </Button>

          {category && (
            <Button variant="danger" onClick={() => deleteCategory(category)}>
              <i className="bi bi-exclamation-circle"></i>&nbsp; Delete
            </Button>
          )}

          <Button variant="outline-dark" onClick={toggle}>
            <i className="bi bi-x-lg"></i>&nbsp;Cancel
          </Button>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
