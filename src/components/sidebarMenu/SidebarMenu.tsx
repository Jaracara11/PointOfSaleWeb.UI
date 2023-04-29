import './sidebarMenu.css';
import { UserAuth } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';

export const SidebarMenu = () => {
  const { user } = UserAuth();

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

        <NavLink className="nav-link" to="/products">
          <i className="bi bi-box"></i>
          <span>Products</span>
        </NavLink>

        <NavLink className="nav-link" to="inventory">
          <i className="bi bi-clipboard-check"></i>
          <span>Inventory</span>
        </NavLink>

        {user && (
          <div className="user-profile">
            <i className="bi bi-person-circle"></i>
            <span>{user.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
