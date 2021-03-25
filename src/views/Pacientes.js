import React, { useContext, useEffect } from "react";
import UsuarioRow from "../components/usuarios/UsuarioRow";
import { UsuariosContext } from "../context/UsuariosContext";

const Pacientes = () => {
  const { usuarios, getUsuarios } = useContext(UsuariosContext);

  useEffect(() => {
    getUsuarios();
  }, []);

  const renderUsuarios = () => {
    if (usuarios && usuarios !== null) {
      return usuarios.map((usuario) => <UsuarioRow usuario={usuario} />);
    }
  };

  return (
    <div className="container">
      <div className="row mx-0 border-bottom pb-3 mb-3">
        <div className="container px-0">
          <h1>Pacientes</h1>
        </div>
      </div>
      <div className="row mx-0">
        <div className="container card">
          <table className="table mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
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
