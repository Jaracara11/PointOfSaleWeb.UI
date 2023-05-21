import './sidebarMenu.css';
import { UserAuth } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export const SidebarMenu = () => {
  const { user, signOut } = UserAuth() || {};

  const userPopover = (
    <Popover className="sidebar-popover">
      <Popover.Header as="h3">{user && user.name}</Popover.Header>
      <Popover.Body>
        <NavLink className="btn btn-dark" to="/" onClick={() => signOut?.()}>
          Sign Out
        </NavLink>
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

        <NavLink className="nav-link" to="inventory">
          <i className="bi bi-clipboard-check"></i>
          <span>Inventory</span>
        </NavLink>

        {user && (
          <div className="user-profile">
            <OverlayTrigger trigger="click" placement="top" rootClose={true} overlay={userPopover}>
              <div>
                <i className="bi bi-person-circle"></i>
                <span>{user.username}</span>
              </div>
            </OverlayTrigger>
          </div>
        )}
      </div>
    </div>
  );
};
