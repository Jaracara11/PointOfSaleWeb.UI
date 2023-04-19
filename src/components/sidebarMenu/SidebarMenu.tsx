import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export const SidebarMenu = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    user && (
      <div className="container-fluid">
        <div className="row">
          <div className="bg-dark col-auto col-md-3 min-vh-100 d-flex">
            <div>
              <span className="ms-1 fs-4 d-none d-sm-inline d-flex  ms-3 text-white">
                PointOfSale.Web
              </span>
              <hr className="text-secondary d-none d-sm-block" />
              <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
                <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                  <a className="nav-link text-white fs-5" href="">
                    <i className="bi bi-house"></i>
                    <span className="ms-2 d-none d-sm-inline">Home</span>
                  </a>
                </li>
                <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                  <a className="nav-link text-white fs-5" href="">
                    <i className="bi bi-cash-coin"></i>
                    <span className="ms-2 d-none d-sm-inline">Sales</span>
                  </a>
                </li>
                <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                  <a className="nav-link text-white fs-5" href="">
                    <i className="bi bi-box"></i>
                    <span className="ms-2 d-none d-sm-inline">Products</span>
                  </a>
                </li>
                <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                  <a className="nav-link text-white fs-5" href="">
                    <i className="bi bi-clipboard-check"></i>
                    <span className="ms-2 d-none d-sm-inline">Inventory</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
