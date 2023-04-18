import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sidenav.css';

export const Sidenav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-primary" to="/home">
          Home
        </NavLink>
        <NavLink to="/inventory">Inventory</NavLink>

        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`offcanvas offcanvas-start ${isMenuOpen ? 'show' : ''}`}
          id="app-navbar"
        >
          <div className="offcanvas-header">
            <button
              className="btn-close text-reset"
              onClick={toggleMenu}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home" onClick={toggleMenu}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/inventory"
                  onClick={toggleMenu}
                >
                  Inventory
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
