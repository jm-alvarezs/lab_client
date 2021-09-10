import React, { useContext, useEffect, useState } from "react";
import UsuarioRow from "../components/usuarios/UsuarioRow";
import { Link } from "@reach/router";
import { searchRows } from "../utils";
import { PacientesContext } from "../context/PacientesContext";
import { ModalContext } from "../context/ModalContext";

const Pacientes = ({ admin }) => {
  const [query, setQuery] = useState("");

  const { pacientes, getPacientes, getPacientesAdmin, deletePaciente } =
    useContext(PacientesContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    if (admin) {
      getPacientesAdmin();
    } else {
      getPacientes();
    }
  }, []);

  const confirmDelete = (paciente) => {
    modalComponent(
      "Precaución",
      <div>
        <p>
          ¿Estás seguro que deseas eliminar al paciente {paciente.name}? Esta
          acción NO puede deshacerse y se perderán todas sus pruebas realizadas.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deletePaciente(paciente.id)}
        >
          <i className="fa fa-trash"></i> Eliminar
        </button>
      </div>
    );
  };

  const renderUsuarios = () => {
    if (pacientes && pacientes !== null) {
      console.log(pacientes);
      let usuariosRender = [...pacientes];
      if (query !== "") {
        usuariosRender = searchRows(query, usuariosRender);
      }
      if (usuariosRender.length === 0) {
        return (
          <tr>
            <td colSpan="4">
              <p>No hay usuarios registrados</p>
            </td>
          </tr>
        );
      }
      return usuariosRender.map((usuario) => (
        <UsuarioRow
          key={usuario.id}
          usuario={usuario}
          confirmDelete={confirmDelete}
        />
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
        <div className="col-6 px-0">
          <h1>Pacientes</h1>
        </div>
        <div className="col-6 text-right px-0">
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
          <table className="table table-responsive mt-4">
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
