import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userValidationSchema } from '../../../services/yupValidation.service';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ErrorInputView } from '../../errorInputView/ErrorInputView';
import { UserRole } from '../../../interfaces/user/UserRole';
import { swalConfirmAlert } from '../../../services/swal.service';
import { UpsertUserModalProps } from '../../../interfaces/modals/UpsertUserModalProps';
import { UserData } from '../../../interfaces/user/UserData';
import { useDeleteUser, useSaveNewUser, useUpdateUser } from '../../../hooks/users.hooks';
import { firstCharToUpper } from '../../../utils/string.helper';

export const UpsertUserModal = ({ toggle, user, roles }: UpsertUserModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(userValidationSchema)
  });

  const [showModal, setShowModal] = useState<boolean>(true);

  const newUserMutation = useSaveNewUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const closeModal = () => {
    setShowModal(false);
    toggle();
  };

  useEffect(() => {
    if (user) {
      setValue('username', user.username);
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('email', user.email);
      setValue('userRoleID', user.userRoleID);
    }
  }, [user]);

  const upsertUser: SubmitHandler<FieldValues> = async (data) => {
    let userData: UserData;

    if (user) {
      userData = {
        username: data.username,
        firstName: firstCharToUpper(data.firstName),
        lastName: firstCharToUpper(data.lastName),
        email: data.email,
        userRoleID: data.userRoleID
      };
    } else {
      userData = {
        username: data.username,
        firstName: firstCharToUpper(data.firstName),
        lastName: firstCharToUpper(data.lastName),
        email: data.email,
        password: data.repeatNewPassword
      };
    }

    let confirmTitle = '';
    let confirmAction = null;

    if (user) {
      confirmTitle = `Are you sure you want to update ${userData.username}'s information?`;
      confirmAction = () => updateUserMutation.mutateAsync(userData);
    } else {
      confirmTitle = `Are you sure you want to add ${userData.username} as a new user?`;
      confirmAction = () => newUserMutation.mutateAsync(userData);
    }

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Save', 'question');

    isConfirmed && confirmAction().then(() => toggle());
  };

  const deleteUser = async (username: string) => {
    let confirmTitle = `Are you sure you want to <strong>DELETE</strong> the user ${username}?`;

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Delete', 'warning');

    isConfirmed && deleteUserMutation.mutateAsync(username);
    toggle();
  };

  return (
    <Modal className="form-modal" show={showModal} onHide={closeModal} centered>
      <Form onSubmit={handleSubmit(upsertUser)}>
        <h3 className="title">{user ? 'Edit' : 'Add New'} User</h3>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register('username')}
            disabled={user !== null}
          />
          <ErrorInputView error={errors.username} />
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" {...register('firstName')} />
          <ErrorInputView error={errors.firstName} />
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" {...register('lastName')} />
          <ErrorInputView error={errors.lastName} />
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter user email" {...register('email')} />
          <ErrorInputView error={errors.email} />
          {user && (
            <>
              <Form.Label>User Role</Form.Label>
              <Form.Select {...register('userRoleID')} defaultValue={watch('userRoleID') || 0}>
                <option value={0}>Select a role...</option>
                {roles.map((role: UserRole) => (
                  <option key={role.roleID} value={role.roleID}>
                    {role.roleName}
                  </option>
                ))}
              </Form.Select>
              <ErrorInputView error={errors.userRoleID} />
            </>
          )}
          {!user && (
            <div className="password-inputs">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password..."
                {...register('newPassword')}
              />
              <ErrorInputView error={errors.newPassword} />
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repeat New Password..."
                {...register('repeatNewPassword')}
              />
              <ErrorInputView error={errors.repeatNewPassword} />
            </div>
          )}
        </Form.Group>

        <Button variant="btn btn-dark" disabled={!isDirty} onClick={handleSubmit(upsertUser)}>
          <i className="bi bi-database"></i>&nbsp;
          {user ? ' Update' : ' Save'}
        </Button>

        {user && (
          <Button variant="btn btn-danger" onClick={() => deleteUser(user.username)}>
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
