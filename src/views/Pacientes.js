import React from "react";

const Pacientes = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="container">
          <h1>Pacientes</h1>
        </div>
      </div>
      <div className="row">
        <div className="container-fluid">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{renderUsuarios()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pacientes;
