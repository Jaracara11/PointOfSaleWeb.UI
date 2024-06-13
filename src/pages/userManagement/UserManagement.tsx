import { Table } from 'react-bootstrap';
import { useGetRoles, useGetUsers } from '../../hooks/users.hooks';
import { swalMessageAlert } from '../../services/swal.service';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { useState } from 'react';
import { UpsertUserModal } from '../../components/modals/upsertUserModal/UpsertUserModal';
import { ChangePasswordModal } from '../../components/modals/changePasswordModal/ChangePasswordModal';
import { UserData } from '../../interfaces/user/UserData';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';
import { useUserStore } from '../../stores/user.store';
import { getUserRoleName } from '../../services/user.service';

export const UserManagement = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
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
    swalMessageAlert('Your user does not have permission to view this page', 'warning').then(() => navigate('/home'));
  }

  return usersQuery.isPending || rolesQuery.isPending ? (
    <LoadingSpinner />
  ) : (
    <div className="users common-container">
      <div className="row">
        <h1 className="title">Users</h1>
      </div>

      <div className="row">
        <div>
          <button
            className="btn btn-dark"
            onClick={() => {
              setSelectedUser(undefined);
              toggleUpsertModal();
            }}
          >
            <i className="bi bi-plus-lg"></i>
            &nbsp;Add New User
          </button>
        </div>
        <div>
          <SearchInput searchQuery={searchUserQuery} setSearchQuery={setSearchUserQuery} />
        </div>
      </div>

      <div className="row">
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
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => {
                        setSelectedUser(user);
                        toggleUpsertModal();
                      }}
                    >
                      <i className="bi bi-pencil"></i>&nbsp;Edit
                    </button>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        setSelectedUser(user);
                        toggleResetPasswordModal();
                      }}
                    >
                      <i className="bi bi-shield-exclamation"></i>&nbsp;Reset Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {showUpsertModal && <UpsertUserModal toggle={toggleUpsertModal} user={selectedUser || null} roles={rolesQuery.data || []} />}

      {showResetPasswordModal && selectedUser && (
        <ChangePasswordModal toggle={toggleResetPasswordModal} username={selectedUser.username} resetPasswordRequest={true} />
      )}
    </div>
  );
};
