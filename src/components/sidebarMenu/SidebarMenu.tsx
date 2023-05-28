import './sidebarMenu.css';
import { UserAuth } from '../../context/UserContext';
import { Link, NavLink } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { deleteUserAuth, validateUserRolePermission } from '../../services/user.Service';
import Button from 'react-bootstrap/esm/Button';
import { ChangePasswordModal } from '../modals/changePasswordModal/ChangePasswordModal';
import { useState } from 'react';

export const SidebarMenu = () => {
  const { user } = UserAuth() || {};
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => setShowModal((prev) => !prev);

  const userPopover = (
    <Popover className="sidebar-popover">
      <Popover.Header as="h3">{user && user.name}</Popover.Header>
      <Popover.Body>
        <Link className="btn btn-dark" to="/" onClick={() => deleteUserAuth()}>
          Sign Out
        </Link>
        <Button variant="outline-dark" onClick={() => toggleModal()}>
          Change Password
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="sidebar-menu bg-dark">
      <div className="brand">
        <span>PointOfSale.Web</span>
      </div>

      <hr className="text-secondary" />

      <div className="links">
        <NavLink className="nav-link" to="/home">
          <i className="bi bi-house"></i>
          <span>Home</span>
        </NavLink>

        <NavLink className="nav-link" to="sales">
          <i className="bi bi-cash-coin"></i>
          <span>Sales</span>
        </NavLink>

        <NavLink className="nav-link" to="products">
          <i className="bi bi-clipboard-check"></i>
          <span>Inventory</span>
        </NavLink>

        {user && validateUserRolePermission(['Admin', 'Manager']) && (
          <NavLink className="nav-link" to="user">
            <i className="bi bi-person-gear"></i>
            <span>User Management</span>
          </NavLink>
        )}

        {user && (
          <div className="user-profile">
            <OverlayTrigger trigger="click" placement="top" rootClose={true} overlay={userPopover}>
              <div>
                <i className="bi bi-person-circle"></i>
                <span>{user.username}</span>
                <p>{user.role}</p>
              </div>
            </OverlayTrigger>
          </div>
        )}
      </div>

      {showModal && user && <ChangePasswordModal toggle={toggleModal} username={user.username} />}
    </div>
  );
};
