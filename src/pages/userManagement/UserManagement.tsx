import { Table } from 'react-bootstrap';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';
import { UserAuth } from '../../context/UserContext';
import { useGetUsers } from '../../hooks/users.hooks';
import { swalMessageAlert } from '../../services/swal.service';
import { UserInfo } from '../../interfaces/user/UserInfo';
import { Navigate, useNavigate } from 'react-router-dom';

export const UserManagement = () => {
  const navigate = useNavigate();
  const { user } = UserAuth() || {};
  const usersQuery = useGetUsers();

  if ((user && user.role !== 'Admin') || !user) {
    swalMessageAlert('Your user does not have permission to view this page', 'warning').then(() =>
      navigate('/home')
    );
  }

  if (usersQuery.isLoading) return <LoadingSpinner />;

  return (
    <>
      {usersQuery.data && (
        <Table hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
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
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
