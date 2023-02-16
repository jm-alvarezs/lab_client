import React from "react";
import { Link } from "@reach/router";

const PanelNavbar = () => {
  return (
    <nav className="bg-white hide-mobile side-menu px-2">
      <div className="container-fluid px-0">
        <div className="mt-4">
          <ul className="side-menu-list">
            <li className="nav-item my-4">
              <Link className="nav-link" to="/tests">
                <i className="fa fa-folder" />
              </Link>
            </li>
            <li className="nav-item my-4">
              <Link className="nav-link" to="/tests">
                <i className="fa fa-vial" />
              </Link>
            </li>
            <li className="nav-item my-4">
              <Link className="nav-link" to="/pacientes">
                <i className="fa fa-users" />
              </Link>
            </li>
            <li className="nav-item my-4">
              <Link className="nav-link" to="/resultados">
                <i className="fa fa-poll" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PanelNavbar;
