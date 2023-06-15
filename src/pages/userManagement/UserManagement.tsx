import './userManagement.css';
import { Button, Table } from 'react-bootstrap';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';
import { UserAuth } from '../../context/UserContext';
import { useGetRoles, useGetUsers } from '../../hooks/users.hooks';
import { swalMessageAlert } from '../../services/swal.service';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { useState } from 'react';
import { UpsertUserModal } from '../../components/modals/upsertUserModal/UpsertUserModal';
import { ChangePasswordModal } from '../../components/modals/changePasswordModal/ChangePasswordModal';
import { UserData } from '../../interfaces/user/UserData';
import { getUserRoleName } from '../../utils/string.helper';

export const UserManagement = () => {
  const navigate = useNavigate();
  const { user } = UserAuth() || {};
  const usersQuery = useGetUsers();
  const rolesQuery = useGetRoles();
  const [searchUserQuery, setSearchUserQuery] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<UserData>();
  const [showUpsertModal, setShowUpsertModal] = useState<boolean>(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState<boolean>(false);

  const toggleUpsertModal = () => setShowUpsertModal((prev) => !prev);
  const toggleResetPasswordModal = () => setShowResetPasswordModal((prev) => !prev);

  const filteredUsers = (usersQuery.data || []).filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchUserQuery.trim().toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchUserQuery.trim().toLowerCase()) ||
      user.username.toLowerCase().includes(searchUserQuery.trim().toLowerCase())
  );

  if ((user && user.role !== 'Admin') || !user) {
    swalMessageAlert('Your user does not have permission to view this page', 'warning').then(() =>
      navigate('/home')
    );
  }

  if (usersQuery.isLoading || rolesQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="user-container">
      <h1 className="title">Users</h1>

      <div className="btn-panel">
        <Button
          variant="dark"
          onClick={() => {
            setSelectedUser(undefined);
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
            {filteredUsers.map((user: UserData) => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{getUserRoleName(user.userRoleID || 0, rolesQuery.data || [])}</td>
                <td>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setSelectedUser(user);
                      toggleUpsertModal();
                    }}
                  >
                    <i className="bi bi-pencil"></i>&nbsp;Edit
                  </Button>
                  <Button
                    variant="dark"
                    onClick={() => {
                      setSelectedUser(user);
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
        <UpsertUserModal
          toggle={toggleUpsertModal}
          user={selectedUser || null}
          roles={rolesQuery.data || []}
        />
      )}
      {showResetPasswordModal && selectedUser && (
        <ChangePasswordModal
          toggle={toggleResetPasswordModal}
          username={selectedUser.username}
          resetPasswordRequest={true}
        />
      )}
    </div>
  );
};
