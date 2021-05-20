import React, { useContext, useEffect, useState } from "react";
import UsuarioRow from "../components/usuarios/UsuarioRow";
import { Link } from "@reach/router";
import { searchRows } from "../utils";
import { PacientesContext } from "../context/PacientesContext";

const Pacientes = ({ admin }) => {
  const [query, setQuery] = useState("");

  const { pacientes, getPacientes, getPacientesAdmin } =
    useContext(PacientesContext);

  useEffect(() => {
    if (admin) {
      getPacientesAdmin();
    } else {
      getPacientes();
    }
  }, []);

  const renderUsuarios = () => {
    if (pacientes && pacientes !== null) {
      let usuariosRender = [...pacientes];
      if (query !== "") {
        usuariosRender = searchRows(query, usuariosRender);
      }
      if (usuariosRender.length === 0) {
        return (
          <tr>
            <td>
              <p>No hay usuarios</p>
            </td>
          </tr>
        );
      }
      return usuariosRender.map((usuario) => (
        <UsuarioRow key={usuario.id} usuario={usuario} />
      ));
    }
    return (
      <tr>
        <td>
          <div className="spinner-border"></div>
        </td>
      </tr>
    );
  };

  return (
    <div className="container">
      <div className="row mx-0 border-bottom pb-3 mb-3 mt-4 align-items-center">
        <div className="col-12 col-md-6 px-0">
          <h1>Pacientes</h1>
        </div>
        <div className="col-12 col-md-6 text-right px-0">
          <Link to="/pacientes/nuevo" className="btn btn-dark">
            + Agregar
          </Link>
        </div>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre o correo electrónico.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
