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

export const UserManagement = () => {
  const navigate = useNavigate();
  const { user } = UserAuth() || {};
  const usersQuery = useGetUsers();
  const [searchUserQuery, setSearchUserQuery] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => setShowModal((prev) => !prev);

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
            setSelectedUser('');
            toggleModal();
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
                <td>
                  <i className="bi bi-dot"></i>
                  {user.username}
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setSelectedUser(user.username);
                      toggleModal();
                    }}
                  >
                    <i className="bi bi-pencil"></i>&nbsp;Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && <UpsertUserModal toggle={toggleModal} username={selectedUser} />}
    </div>
  );
};
