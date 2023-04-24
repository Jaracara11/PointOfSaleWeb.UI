import { NavLink } from 'react-router-dom';

export const Inventory = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/inventory/products">
            <span>Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventory/categories">
            <span>Categories</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
};
