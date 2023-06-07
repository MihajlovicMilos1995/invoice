import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Invoice
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/partners" className="nav-link">
            Partner
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/company" className="nav-link">
            Company
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
