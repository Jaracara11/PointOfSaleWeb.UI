import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { categoryValidation } from '../../services/yupValidation.service';
import { ErrorInputView } from '../errorInputView/ErrorInputView';
import { Category } from '../../interfaces/Category';
import { handleErrorResponse } from '../../services/error.Service';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../loadingSpinner/LoadingSpinner';
import { firstCharToUpper } from '../../utils/string.helper';
import {
  addCategory,
  updateCategory
} from '../../repository/categoryRepository';
import { swalSaveConfirm } from '../../services/swal.service';
import { useNavigate } from 'react-router-dom';

export const CategoryModal = (props: any) => {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(categoryValidation)
  });

  const newCategoryMutation = useMutation({
    mutationFn: addCategory,
    onError: (error) => handleErrorResponse(error, 'CategoryError')
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onError: (error) => handleErrorResponse(error, 'CategoryError')
  });

  useEffect(() => {
    if (props.category) {
      setValue('categoryName', props.category.categoryName);
      setValue('categoryID', props.category.categoryID);
    }
  }, [props.category, setValue]);

  const saveCategory: any = async (categoryData: Category) => {
    try {
      setLoadingData(true);
      categoryData.categoryName = firstCharToUpper(categoryData.categoryName);

      let confirmTitle = '';
      let confirmMessage = '';
      let confirmAction = null;

      if (props.category) {
        confirmTitle = `Are you sure you want to change category ${props.category.categoryName} to ${categoryData.categoryName}?`;
        confirmMessage = `Category ${categoryData.categoryName} updated!`;
        confirmAction = () => updateCategoryMutation.mutate(categoryData);
      } else {
        confirmTitle = `Are you sure you want to add ${categoryData.categoryName} as a new category?`;
        confirmMessage = `New category ${categoryData.categoryName} added!`;
        confirmAction = () => newCategoryMutation.mutate(categoryData);
      }

      await swalSaveConfirm(confirmTitle, confirmMessage, confirmAction);

      props.toggle();
      navigate('/inventory/categories');
    } catch (error: any) {
      handleErrorResponse(error, 'CategoryError');
    } finally {
      setLoadingData(false);
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

  return loadingData ? (
    <LoadingSpinner />
  ) : (
    <Modal
      className="category-modal"
      show={props.toggle}
      onHide={props.toggle}
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
          {props.category ? 'Update' : 'Save'}
        </Button>

        {props.category && (
          <Button variant="danger ms-3" onClick={handleSubmit(saveCategory)}>
            Delete
          </Button>
        )}

        <Button variant="outline-dark" onClick={props.toggle}>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};
