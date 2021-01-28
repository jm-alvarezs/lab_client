import React from "react";

const UsuarioRow = ({ usuario, deleteUsuario }) => {
  const { id, nombre, apellidos, correo } = usuario;

  return (
    <tr>
      <td>{id}</td>
      <td>{nombre}</td>
      <td>{apellidos}</td>
      <td>{correo}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => deleteUsuario(id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default UsuarioRow;
