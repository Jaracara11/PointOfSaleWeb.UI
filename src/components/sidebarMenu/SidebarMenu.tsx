import './sidebarMenu.css';
import { NavLink, useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { deleteUserAuth, validateUserRolePermission } from '../../services/user.service';
import Button from 'react-bootstrap/esm/Button';
import { ChangePasswordModal } from '../modals/changePasswordModal/ChangePasswordModal';
import { useState } from 'react';
import { Tooltip } from 'react-bootstrap';
import { useUserStore } from '../../stores/user.store';

export const SidebarMenu = () => {
  const { user } = useUserStore();
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleModal = () => setShowModal((prev) => !prev);

  const handleSignOutClick = () => {
    deleteUserAuth();
    navigate('/');
    window.location.reload();
  };

  const userPopover = (
    <Popover className="sidebar-popover">
      <Popover.Header as="h3">{user && user.name}</Popover.Header>
      <Popover.Body>
        <Button variant="dark" onClick={() => handleSignOutClick()}>
          Sign Out
        </Button>
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
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip className="sidebar-tooltip">Home</Tooltip>}
        >
          <NavLink className="nav-link" to="/home">
            <i className="bi bi-house"></i>
            <span>Home</span>
          </NavLink>
        </OverlayTrigger>

        {user && user.role !== 'Unassigned' && (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip className="sidebar-tooltip">Orders</Tooltip>}
          >
            <NavLink className="nav-link" to="orders">
              <i className="bi bi-cart"></i>
              <span>Orders</span>
            </NavLink>
          </OverlayTrigger>
        )}

        <OverlayTrigger
          placement="right"
          overlay={<Tooltip className="sidebar-tooltip">Sales</Tooltip>}
        >
          <NavLink className="nav-link" to="sales">
            <i className="bi bi-cash-coin"></i>
            <span>Sales</span>
          </NavLink>
        </OverlayTrigger>

        {validateUserRolePermission(['Admin', 'Manager']) && (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip className="sidebar-tooltip">Inventory</Tooltip>}
          >
            <NavLink className="nav-link" to="products">
              <i className="bi bi-clipboard-check"></i>
              <span>Inventory</span>
            </NavLink>
          </OverlayTrigger>
        )}

        {user && user.role === 'Admin' && (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip className="sidebar-tooltip">Users</Tooltip>}
          >
            <NavLink className="nav-link" to="user-management">
              <i className="bi bi-person-gear"></i>
              <span>Users</span>
            </NavLink>
          </OverlayTrigger>
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

      {showModal && user && (
        <ChangePasswordModal
          toggle={toggleModal}
          username={user.username}
          resetPasswordRequest={false}
        />
      )}
    </div>
  );
};
