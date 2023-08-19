import { Link, navigate } from "@reach/router";
import React from "react";

const UsuarioRow = ({ usuario, confirmDelete }) => {
  const { id, name, profession, email } = usuario;

  return (
    <tr className="usuario-row" onClick={() => navigate(`/patients/${id}`)}>
      <td>
        {"#"}
        {id}
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <Link
          to={`/patients/${id}/edit`}
          className="btn btn-outline-dark"
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
