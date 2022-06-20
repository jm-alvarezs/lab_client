import React from "react";
import { Link } from "@reach/router";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark-udem py-2 mw-100">
      <div className="container-fluid navbar-container container">
        <Link to="/" className="navbar-brand">
          Laboratorio de Cognición
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
          <ul className="navbar-nav text-right">
            <li className="nav-item">
              <Link className="nav-link" to="/tests">
                Pruebas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pacientes">
                Pacientes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/resultados">
                Resultados
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/payments">
                Pagos
              </Link>
            </li>
            {user.isAdmin && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/admin/pacientes">
                      Pacientes
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/resultados">
                      Resultados
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/usuarios">
                      Usuarios
                    </Link>
                  </li>
                </ul>
              </li>
            )}
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
