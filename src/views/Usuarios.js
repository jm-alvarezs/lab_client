import React, { useContext } from "react";
import UsuarioRow from "../components/usuarios/UsuarioRow";
import { UsuariosContext } from "../context/UsuariosContext";

const Usuarios = () => {
  const { usuarios } = useContext(UsuariosContext);

  const renderUsuarios = () => {
    if (usuarios && usuarios !== null) {
      return usuarios.map((usuario) => (
        <UsuarioRow key={usuario.id} usuario={usuario} />
      ));
    }
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{renderUsuarios()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
