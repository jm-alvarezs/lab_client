import React from "react";
import { Link } from "@reach/router";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-3">
      <div className="container">
        <a className="navbar-brand" href="#">
          Laboratorio
        </a>
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
          <ul className="navbar-nav ml-auto align-items-center">
            <li className="nav-item ml-2">
              <Link className="nav-link" to="/pruebas">
                Pruebas
              </Link>
            </li>
            <li className="nav-item ml-2">
              <Link className="nav-link" to="/resultados">
                Resultados
              </Link>
            </li>
            <li className="nav-item ml-2">
              <Link className="nav-link" to="/cuenta">
                <i className="fa fa-user-circle text-secondary fa-2x"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
