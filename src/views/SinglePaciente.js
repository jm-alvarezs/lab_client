import { Link } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import UsuarioData from "../components/usuarios/UsuarioData";
import UsuarioForm from "../components/usuarios/UsuarioForm";
import { UsuariosContext } from "../context/UsuariosContext";

const SinglePaciente = ({ id }) => {
  const [editMode, setEditMode] = useState(false);

  const {
    usuario,
    getUsuario,
    createUsuario,
    setPropiedadUsuario,
  } = useContext(UsuariosContext);

  useEffect(() => {
    if (isNaN(id)) {
      createUsuario();
      setEditMode(true);
    } else {
      getUsuario(id);
    }
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
            className="btn btn-outline-dark"
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
      <div className="card p-3 shadow-sm my-3">{renderUsuario()}</div>
      <div className="card p-3 shadow-sm my-3">
        <h3 className="border-bottom pb-2 mb-4">Pruebas</h3>
        <Link
          to={`/config/atencion/${id}`}
          className="btn btn-outline-dark my-2"
        >
          Atención Simple
        </Link>
        <Link
          to={`/config/condicional${id}`}
          className="btn btn-outline-dark my-2"
        >
          Atención Condicional
        </Link>
      </div>
    </div>
  );
};

export default SinglePaciente;
