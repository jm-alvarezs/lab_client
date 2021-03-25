import { navigate } from "@reach/router";
import React from "react";

const UsuarioRow = ({ usuario, deleteUsuario }) => {
  const { id, name, email } = usuario;

  return (
    <tr className="usuario-row" onClick={() => navigate(`/pacientes/${id}`)}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={(e) => {
            e.stopPropagation();
            deleteUsuario(id);
          }}
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default UsuarioRow;
