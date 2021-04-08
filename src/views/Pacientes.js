import { Link } from "@reach/router";
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
      return usuarios.map((usuario) => (
        <UsuarioRow key={usuario.id} usuario={usuario} />
      ));
    }
  };

  return (
    <div className="container">
      <div className="row mx-0 border-bottom pb-3 mb-3 mt-4 align-items-center">
        <div className="col-12 col-md-6 px-0">
          <h1>Pacientes</h1>
        </div>
        <div className="col-12 col-md-6 text-right px-0">
          <Link to="/usuarios/nuevo" className="btn btn-dark">
            + Agregar
          </Link>
        </div>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre o correo electrónico.."
      />
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
