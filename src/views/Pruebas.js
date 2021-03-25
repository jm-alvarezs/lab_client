import { Link } from "@reach/router";
import React from "react";

const Pruebas = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="container">
          <h1>Pruebas</h1>
          <div className="card p-3 shadow-sm">
            <div className="row">
              <div className="col col-md-8">
                <h3>Atención Simple</h3>
              </div>
              <div to="/config" className="col col-md-4 text-right">
                <Link to="/atencion" className="btn btn-dark mx-2">
                  Realizar
                </Link>
                <Link to="/config" className="btn btn-outline-dark mx-2">
                  Configurar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pruebas;
