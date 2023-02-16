import React from "react";
import { Link } from "@reach/router";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark py-2 mw-100">
      <div className="container-fluid navbar-container">
        <Link to="/" className="navbar-brand">
          ECOGNI
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav text-end">
            <li className="nav-item">
              <Link className="nav-link" to="/cuenta">
                <i className="fa fa-user-circle user-icon fa-2x"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
