import './changePasswordModal.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { changePasswordValidationSchema } from '../../../services/yupValidation.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { ErrorInputView } from '../../errorInputView/ErrorInputView';
import { swalConfirmAlert, swalMessageAlert } from '../../../services/swal.service';
import { changeUserPassword, resetUserPassword } from '../../../repository/userRepository';
import { UserPasswordChangeRequest } from '../../../interfaces/user/UserPasswordChangeRequest';
import { handleErrorResponse } from '../../../services/error.Service';
import { deleteUserAuth } from '../../../services/user.Service';
import { useNavigate } from 'react-router-dom';
import { ChangePasswordModalProps } from '../../../interfaces/modals/ChangePasswordModalProps';

export const ChangePasswordModal = ({
  toggle,
  username,
  resetPasswordRequest
}: ChangePasswordModalProps) => {
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

  const resetPassword: SubmitHandler<FieldValues> = async (data) => {
    const userData: UserPasswordChangeRequest = {
      username: username,
      newPassword: data.repeatNewPassword
    };

    try {
      const isConfirmed = await swalConfirmAlert(
        `Are you sure you want to change ${username}'s password?`,
        'Change',
        'question'
      );

      if (isConfirmed) {
        setLoadingData(true);
        await resetUserPassword(userData);
        swalMessageAlert('Password changed successfully!', 'success');
        toggle();
      }
    } catch (error: any) {
      handleErrorResponse(error, 'UserError');
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <Modal className="password-modal" show={showModal} onHide={closeModal} centered>
      <Form onSubmit={handleSubmit(resetPasswordRequest ? resetPassword : changePassword)}>
        <h3 className="title">{resetPasswordRequest ? `Reset ${username}` : 'Change'} Password</h3>
        <Modal.Body>
          {!resetPasswordRequest && (
            <Form.Control
              type="password"
              placeholder="Old Password..."
              {...register('oldPassword')}
            />
          )}
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
          <div>
            <Button
              variant="dark"
              disabled={!isDirty}
              onClick={handleSubmit(resetPasswordRequest ? resetPassword : changePassword)}
            >
              <i className="bi bi-shield-exclamation"></i>&nbsp;
              {resetPasswordRequest ? 'Reset' : 'Update'} Password
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
