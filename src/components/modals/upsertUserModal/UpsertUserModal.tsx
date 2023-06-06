import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userValidationSchema } from '../../../services/yupValidation.service';
import { useEffect, useState } from 'react';
import { getUserByUsername } from '../../../repository/userRepository';
import { Button, Form, Modal } from 'react-bootstrap';
import { ErrorInputView } from '../../errorInputView/ErrorInputView';
import { UserRole } from '../../../interfaces/user/UserRole';
import { UserData } from '../../../interfaces/user/UserData';
import { swalConfirmAlert } from '../../../services/swal.service';
import { useGetRoles } from '../../../hooks/users.hooks';

export const UpsertUserModal = ({ toggle, username }: { toggle: () => void; username: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(userValidationSchema)
  });

  const rolesQuery = useGetRoles();
  const [user, setUser] = useState<UserData>();
  const [showModal, setShowModal] = useState<boolean>(true);

  const closeModal = () => {
    setShowModal(false);
    toggle();
  };

  useEffect(() => {
    if (username) {
      getUserByUsername(username).then((response) => {
        setUser(response);
        setValue('username', response.username);
        setValue('firstName', response.firstName);
        setValue('lastName', response.lastName);
        setValue('email', response.email);
        setValue('userRoleID', response.userRoleID);
      });
    }
  }, [username]);

  const upsertUser: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  const deleteUser = async (username: string) => {
    let confirmTitle = `Are you sure you want to <strong>DELETE</strong> the user ${username}?`;

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Delete', 'warning');

    // if (isConfirmed) {
    //   product.productID
    //     ? deleteProductMutation.mutateAsync(product.productID)
    //     : swalMessageAlert(
    //         'Error while trying to delete product, please refresh the page and try again.',
    //         'error'
    //       );
    toggle();
  };

  return (
    <Modal className="form-modal" show={showModal} onHide={closeModal} centered>
      <Form onSubmit={handleSubmit(upsertUser)}>
        <h3 className="title">{username ? 'Edit' : 'Add New'} User</h3>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" {...register('username')} />
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
          <Form.Label>User Role</Form.Label>
          <Form.Select {...register('userRoleID')} defaultValue={watch('userRoleID') || 0}>
            <option value={0}>Select a role...</option>
            {rolesQuery.data &&
              rolesQuery.data.map((role: UserRole) => (
                <option key={role.roleID} value={role.roleID}>
                  {role.roleName}
                </option>
              ))}
          </Form.Select>
          <ErrorInputView error={errors.userRoleID} />
          {!username && (
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

        <div className="btn-panel">
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
        </div>
      </Form>
    </Modal>
  );
};
