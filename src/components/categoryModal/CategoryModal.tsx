import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { categoryValidation } from '../../services/yupValidation.service';
import { ErrorInputView } from '../errorInputView/ErrorInputView';
import { Category } from '../../interfaces/Category';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../loadingSpinner/LoadingSpinner';
import { firstCharToUpper } from '../../utils/string.helper';
import { swalSaveConfirm } from '../../services/swal.service';
import { CategoryModalProps } from '../../interfaces/CategoryModalProps';
import {
  useSaveNewCategory,
  useUpdateCategory
} from '../../hooks/categories.hooks';

export const CategoryModal = ({ toggle, category }: CategoryModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(categoryValidation)
  });

  const [showModal, setShowModal] = useState<boolean>(true);
  const newCategoryMutation = useSaveNewCategory();
  const updateCategoryMutation = useUpdateCategory();

  const closeModal = () => {
    setShowModal(false);
    toggle();
  };

  useEffect(() => {
    if (category) {
      setValue('categoryName', category.categoryName);
      setValue('categoryID', category.categoryID);
    }
  }, [category, setValue]);

  const saveCategory: SubmitHandler<FieldValues> = async (data) => {
    const categoryData: Category = {
      categoryID: data.categoryID,
      categoryName: data.categoryName
    };

    categoryData.categoryName = firstCharToUpper(categoryData.categoryName);

    let confirmTitle = '';
    let confirmAction = null;

    if (category) {
      confirmTitle = `Are you sure you want to change category ${category.categoryName} name to ${categoryData.categoryName}?`;
      confirmAction = () => updateCategoryMutation.mutateAsync(categoryData);
    } else {
      confirmTitle = `Are you sure you want to add ${categoryData.categoryName} as a new category?`;
      confirmAction = () => newCategoryMutation.mutateAsync(categoryData);
    }

    const isConfirmed = await swalSaveConfirm(confirmTitle);

    if (isConfirmed) {
      confirmAction();
      toggle();
    }
  };

  const deleteCategory = async (categoryID: number) => {
    console.log(categoryID);
    //  try {
    //    const result = await swalDeleteConfirm(
    //      `Are you sure you want to delete category with ID ${categoryID}?`,
    //      'Category deleted!'
    //    );

    //    if (result.isConfirmed) {
    //      await mutateDeleteCategory(categoryID);
    //      navigate('/inventory/categories');
    //    }
    //  } catch (error: any) {
    //    handleErrorResponse(error, 'CategoryError');
    //  }
  };

  if (newCategoryMutation.isLoading || updateCategoryMutation.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Modal
      className="category-modal"
      show={showModal}
      onHide={closeModal}
      centered
    >
      <Modal.Body>
        <Form onSubmit={handleSubmit(saveCategory)}>
          <Form.Control
            className="mt-4"
            type="text"
            placeholder="New Category Name"
            {...register('categoryName')}
          />
          <ErrorInputView error={errors.categoryName} />
        </Form>
        <Button variant="dark ms-3" onClick={handleSubmit(saveCategory)}>
          {category ? 'Update' : 'Save'}
        </Button>

        {category && (
          <Button variant="danger ms-3" onClick={handleSubmit(saveCategory)}>
            Delete
          </Button>
        )}

        <Button variant="outline-dark" onClick={toggle}>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};
