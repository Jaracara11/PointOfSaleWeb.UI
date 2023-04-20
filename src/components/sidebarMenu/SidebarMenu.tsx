import './sidebarMenu.css';
import { UserAuth } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';

export const SidebarMenu = () => {
  const { user } = UserAuth();
  //console.log(user);
  return (
    user && (
      <div className="container-fluid" id="sidebar-menu">
        <div className="row">
          <div className="bg-dark col-auto col-md-3 min-vh-100 d-flex">
            <div>
              <span>PointOfSale.Web</span>
              <hr className="text-secondary d-none d-sm-block" />
              <ul className="nav nav-pills flex-column">
                <li className="nav-item py-sm-0">
                  <NavLink className="nav-link fs-5" to="/home">
                    <i className="bi bi-house"></i>
                    <span className="ms-2 d-none d-sm-inline">Home</span>
                  </NavLink>
                </li>
                <li className="nav-item py-sm-0">
                  <NavLink className="nav-link fs-5" to="sales">
                    <i className="bi bi-cash-coin"></i>
                    <span className="ms-2 d-none d-sm-inline">Sales</span>
                  </NavLink>
                </li>
                <li className="nav-item py-sm-0">
                  <NavLink className="nav-link fs-5" to="/products">
                    <i className="bi bi-box"></i>
                    <span className="ms-2 d-none d-sm-inline">Products</span>
                  </NavLink>
                </li>
                <li className="nav-item py-sm-0">
                  <NavLink className="nav-link fs-5" to="inventory">
                    <i className="bi bi-clipboard-check"></i>
                    <span className="ms-2 d-none d-sm-inline">Inventory</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
