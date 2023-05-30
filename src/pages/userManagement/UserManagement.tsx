import { UserAuth } from '../../context/UserContext';
import { swalMessageAlertWithTitle } from '../../services/swal.service';

export const UserManagement = () => {
  const { user } = UserAuth() || {};

  if ((user && user.role !== 'Admin') || !user) {
    swalMessageAlertWithTitle(
      'Forbidden',
      'Your user does not have permission to view this page',
      'warning'
    );
    return <p>Forbidden</p>;
  }

  return <div>User Management</div>;
};
