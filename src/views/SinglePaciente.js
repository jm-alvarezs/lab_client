import React, { useContext, useEffect, useState } from "react";
import UsuarioData from "../components/usuarios/UsuarioData";
import UsuarioForm from "../components/usuarios/UsuarioForm";
import { UsuariosContext } from "../context/UsuariosContext";

const SinglePaciente = ({ id }) => {
  const [editMode, setEditMode] = useState(false);

  const { usuario, getUsuario, setPropiedadUsuario } = useContext(
    UsuariosContext
  );

  useEffect(() => {
    getUsuario(id);
  }, []);

  const renderUsuario = () => {
    if (usuario && usuario !== null) {
      if (editMode) {
        return (
          <UsuarioForm
            usuario={usuario}
            cancel={() => setEditMode(false)}
            setPropiedadUsuario={setPropiedadUsuario}
          />
        );
      }
      return <UsuarioData usuario={usuario} />;
    }
  };

  return (
    <div className="container pb-5">
      <div className="row align-items-center mb-3">
        <div className="col-12 col-md-6">
          <h1>Paciente</h1>
        </div>
        <div className="col-12 col-md-6 text-right">
          <button
            className="btn btn-outline-primary"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? (
              "Cancelar"
            ) : (
              <>
                <i className="fa fa-edit"></i> Editar
              </>
            )}
          </button>
        </div>
      </div>
      <div className="card p-3 shadow-sm">{renderUsuario()}</div>
    </div>
  );
};

export default SinglePaciente;
