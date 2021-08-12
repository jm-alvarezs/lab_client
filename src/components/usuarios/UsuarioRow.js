import { Link, navigate } from "@reach/router";
import React from "react";

const UsuarioRow = ({ usuario, confirmDelete }) => {
  const { id, name, profession, email } = usuario;

  return (
    <tr className="usuario-row" onClick={() => navigate(`/pacientes/${id}`)}>
      <td>
        {"#"}
        {id}
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <Link
          to={`/pacientes/${id}/edit`}
          className="btn btn-outline-secondary"
          onClick={(e) => e.stopPropagation()}
        >
          <i className="fa fa-edit"></i>
        </Link>
        <button
          className="btn btn-outline-danger mx-3"
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
