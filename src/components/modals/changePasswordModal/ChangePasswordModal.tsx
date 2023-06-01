import { Button, Form, Modal } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { changePasswordValidationSchema } from '../../../services/yupValidation.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { ErrorInputView } from '../../errorInputView/ErrorInputView';
import { swalConfirmAlert, swalMessageAlert } from '../../../services/swal.service';
import { changeUserPassword } from '../../../repository/userRepository';
import { UserPasswordChangeRequest } from '../../../interfaces/user/UserPasswordChangeRequest';
import { handleErrorResponse } from '../../../services/error.Service';
import { LoadingSpinner } from '../../loadingSpinner/LoadingSpinner';
import { deleteUserAuth } from '../../../services/user.Service';
import { useNavigate } from 'react-router-dom';

export const ChangePasswordModal = (toggle: () => void, username: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(changePasswordValidationSchema)
  });

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(true);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
    toggle();
  };

  const changePassword: SubmitHandler<FieldValues> = async (data) => {
    const userData: UserPasswordChangeRequest = {
      username: username,
      oldpassword: data.oldPassword,
      newPassword: data.repeatNewPassword
    };

    try {
      const isConfirmed = await swalConfirmAlert(
        'Are you sure you want to change your password?',
        'Save',
        'question'
      );

      if (isConfirmed) {
        setLoadingData(true);
        await changeUserPassword(userData);
        swalMessageAlert('Password changed successfully!', 'success');
        deleteUserAuth();
        navigate('/');
      }
    } catch (error: any) {
      handleErrorResponse(error, 'UserError');
    } finally {
      setLoadingData(false);
    }
  };

  return loadingData ? (
    <LoadingSpinner />
  ) : (
    <Modal className="common-modal" show={showModal} onHide={closeModal} centered>
      <Form onSubmit={handleSubmit(changePassword)}>
        <h3 className="title">Change Password</h3>
        <Modal.Body>
          <Form.Control
            type="password"
            placeholder="Old Password..."
            {...register('oldPassword')}
          />
          <Form.Control
            type="password"
            placeholder="New Password..."
            {...register('newPassword')}
          />
          <ErrorInputView error={errors.newPassword} />
          <Form.Control
            type="password"
            placeholder="Repeat New Password..."
            {...register('repeatNewPassword')}
          />
          <ErrorInputView error={errors.repeatNewPassword} />
          <div className="btn-panel">
            <Button variant="dark" disabled={!isDirty} onClick={handleSubmit(changePassword)}>
              <i className="bi bi-shield-exclamation"></i>&nbsp;Update Password
            </Button>

            <Button variant="outline-dark" onClick={toggle}>
              <i className="bi bi-x-lg"></i>&nbsp;Cancel
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
