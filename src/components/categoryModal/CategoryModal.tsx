import { yupResolver } from '@hookform/resolvers/yup';
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
        confirmAction = () => updateCategory(categoryData);
      } else {
        confirmTitle = `Are you sure you want to add ${categoryData.categoryName} as a new category?`;
        confirmMessage = `New category ${categoryData.categoryName} added!`;
        confirmAction = () => addCategory(categoryData);
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

  const deleteCategory: any = async (categoryID: number) => {
    console.log(categoryID);
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
