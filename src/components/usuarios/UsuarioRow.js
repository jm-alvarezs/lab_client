import { navigate } from "@reach/router";
import React from "react";

const UsuarioRow = ({ usuario, confirmDelete }) => {
  const { id, name, profession, email } = usuario;

  return (
    <tr className="usuario-row" onClick={() => navigate(`/pacientes/${id}`)}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{profession}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={(e) => {
            e.stopPropagation();
            confirmDelete(usuario);
          }}
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default UsuarioRow;
