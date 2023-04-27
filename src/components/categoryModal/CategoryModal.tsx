import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { categoryValidation } from '../../services/yupValidation.service';
import { ErrorInputView } from '../errorHandlers/errorInputView/ErrorInputView';
import { Category } from '../../interfaces/Category';
import { handleErrorResponse } from '../../services/error.Service';
import { useState } from 'react';
import { LoadingSpinner } from '../loadingSpinner/LoadingSpinner';
import { firstCharToUpper } from '../../utils/string.helper';
import { addCategory } from '../../repository/categoryRepository';
import { swalSaveConfirm } from '../../services/swal.service';

export const CategoryModal = (props: any) => {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(categoryValidation)
  });

  const addNewCategory: any = async (categoryData: Category) => {
    try {
      setLoadingData(true);
      categoryData.categoryName = firstCharToUpper(categoryData.categoryName);
      await swalSaveConfirm(
        `Are you sure you want to add ${categoryData.categoryName} as a new category?`,
        `New category ${categoryData.categoryName} added!`,
        () => addCategory(categoryData)
      );
      props.toggle();
    } catch (error: any) {
      handleErrorResponse(error, 'CategoryError');
    } finally {
      setLoadingData(false);
    }
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
        <Form onSubmit={handleSubmit(addNewCategory)}>
          <Form.Control
            className="mt-4"
            type="text"
            placeholder="New Category Name"
            {...register('categoryName')}
          />
          <ErrorInputView error={errors.categoryName} />
        </Form>
        <Button variant="dark ms-3" onClick={handleSubmit(addNewCategory)}>
          Save
        </Button>
        <Button variant="outline-dark" onClick={props.toggle}>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};
