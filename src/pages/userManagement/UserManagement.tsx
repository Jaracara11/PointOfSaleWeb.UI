import './userManagement.css';
import { Button, Table } from 'react-bootstrap';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';
import { UserAuth } from '../../context/UserContext';
import { useGetUsers } from '../../hooks/users.hooks';
import { swalMessageAlert } from '../../services/swal.service';
import { UserInfo } from '../../interfaces/user/UserInfo';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { useState } from 'react';
import { UpsertUserModal } from '../../components/modals/upsertUserModal/UpsertUserModal';
import { ChangePasswordModal } from '../../components/modals/changePasswordModal/ChangePasswordModal';

export const UserManagement = () => {
  const navigate = useNavigate();
  const { user } = UserAuth() || {};
  const usersQuery = useGetUsers();
  const [searchUserQuery, setSearchUserQuery] = useState<string>('');
  const [selectedUsername, setSelectedUsername] = useState<string>('');
  const [showUpsertModal, setShowUpsertModal] = useState<boolean>(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState<boolean>(false);

  const toggleUpsertModal = () => setShowUpsertModal((prev) => !prev);
  const toggleResetPasswordModal = () => setShowResetPasswordModal((prev) => !prev);

  if ((user && user.role !== 'Admin') || !user) {
    swalMessageAlert('Your user does not have permission to view this page', 'warning').then(() =>
      navigate('/home')
    );
  }

  if (usersQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="user-container">
      <h1 className="title">Users</h1>

      <div className="btn-panel">
        <Button
          variant="dark"
          onClick={() => {
            setSelectedUsername('');
            toggleUpsertModal();
          }}
        >
          <i className="bi bi-plus-lg"></i>
          &nbsp;Add New User
        </Button>

        <SearchInput searchQuery={searchUserQuery} setSearchQuery={setSearchUserQuery} />
      </div>

      {usersQuery.data && (
        <Table hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersQuery.data.map((user: UserInfo) => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setSelectedUsername(user.username);
                      toggleUpsertModal();
                    }}
                  >
                    <i className="bi bi-pencil"></i>&nbsp;Edit
                  </Button>
                  <Button
                    variant="dark"
                    onClick={() => {
                      setSelectedUsername(user.username);
                      toggleResetPasswordModal();
                    }}
                  >
                    <i className="bi bi-shield-exclamation"></i>&nbsp;Reset Password
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showUpsertModal && (
        <UpsertUserModal toggle={toggleUpsertModal} username={selectedUsername} />
      )}
      {showResetPasswordModal && user && (
        <ChangePasswordModal
          toggle={toggleResetPasswordModal}
          username={user.username}
          resetPasswordRequest={true}
        />
      )}
    </div>
  );
};
