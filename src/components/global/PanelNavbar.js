import React from "react";
import { Link } from "@reach/router";

const PanelNavbar = () => {
  return (
    <nav className="bg-white hide-mobile side-menu shadow px-2">
      <div className="container-fluid px-0">
        <div className="mt-4">
          <ul className="side-menu-list">
            <li
              className={`nav-item my-4 ${
                window.location.href.includes("studies") ? "bg-primary" : ""
              }`}
            >
              <Link className="nav-link" to="/studies">
                <i className="fa fa-folder" />
              </Link>
            </li>
            <li
              className={`nav-item my-4 ${
                window.location.pathname.includes("tests") ? "bg-primary" : ""
              }`}
            >
              <Link className="nav-link" to="/tests">
                <i className="fa fa-vial" />
              </Link>
            </li>
            <li
              className={`nav-item my-4 ${
                window.location.pathname.includes("patients")
                  ? "bg-primary"
                  : ""
              }`}
            >
              <Link className="nav-link" to="/patients">
                <i className="fa fa-users" />
              </Link>
            </li>
            <li
              className={`nav-item my-4 ${
                window.location.pathname.includes("results") ? "bg-primary" : ""
              }`}
            >
              <Link className="nav-link" to="/results">
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
