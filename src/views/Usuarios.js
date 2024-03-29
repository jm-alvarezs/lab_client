import React, { useContext, useEffect, useState } from "react";
import UsuarioRow from "../components/usuarios/UsuarioRow";
import { ModalContext } from "../context/ModalContext";
import { UsuariosContext } from "../context/UsuariosContext";
import { searchRows } from "../utils";

const Usuarios = () => {
  const [query, setQuery] = useState("");
  const { usuarios, getUsuariosAdmin, deleteUsuario } =
    useContext(UsuariosContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    getUsuariosAdmin();
  }, []);

  const confirmDelete = (usuario) => {
    modalComponent(
      "Precaución",
      <div>
        <p>
          ¿Estás seguro que deseas eliminar al usuario {usuario.name}? Esto le
          removerá el acceso a la plataforma.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deleteUsuario(usuario.id)}
        >
          <i className="fa fa-trash"></i> Eliminar
        </button>
      </div>
    );
  };

  const renderUsuarios = () => {
    if (usuarios && usuarios !== null) {
      if (usuarios.length === 0)
        return (
          <tr>
            <td>No hay usuarios registrados</td>
          </tr>
        );
      let usuariosRender = [...usuarios];
      if (query !== "") {
        usuariosRender = searchRows(query, usuariosRender);
      }
      return usuariosRender.map((usuario) => (
        <UsuarioRow
          key={usuario.id}
          usuario={usuario}
          confirmDelete={confirmDelete}
        />
      ));
    }
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <h2 className="border-bottom pb-3 mb-3">Usuarios</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="card shadow-sm p-3">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Profesión</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>{renderUsuarios()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
