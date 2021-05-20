import { Link, navigate } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../components/global/Breadcrumbs";
import UsuarioData from "../components/usuarios/UsuarioData";
import UsuarioForm from "../components/usuarios/UsuarioForm";
import { UsuariosContext } from "../context/UsuariosContext";

const SinglePaciente = ({ id }) => {
  const [editMode, setEditMode] = useState(false);

  const { usuario, getUsuario, createUsuario, setPropiedadUsuario } =
    useContext(UsuariosContext);

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
            cancel={() => {
              setEditMode(false);
              if (isNaN(usuario.id)) {
                navigate("/pacientes");
              }
            }}
            setPropiedadUsuario={setPropiedadUsuario}
          />
        );
      }
      return <UsuarioData usuario={usuario} />;
    }
  };

  const renderPruebas = () => {
    if (!isNaN(id)) {
      if (usuario && usuario !== null) {
        return (
          <div className="card p-3 shadow-sm my-3">
            <h3 className="border-bottom pb-2 mb-4">Pruebas</h3>
            <Link
              to={`/config/atencion/${id}`}
              className="btn btn-outline-dark my-2"
            >
              Atención Simple
            </Link>
            <Link
              to={`/config/condicional/${id}`}
              className="btn btn-outline-dark my-2"
            >
              Atención Condicional
            </Link>
            <Link
              to={`/config/hemi/${id}`}
              className="btn btn-outline-dark my-2"
            >
              Hemi Atención
            </Link>
            <Link
              to={`/cuestionario/CUPOM/${id}`}
              className="btn btn-outline-dark my-2"
            >
              Cuestionario CUPOM
            </Link>
            <Link
              to={`/cuestionario/nechapi/${id}`}
              className="btn btn-outline-dark my-2"
            >
              Cuestionario Nechapi
            </Link>
          </div>
        );
      }
    }
  };

  return (
    <>
      <div className="container pb-5">
        <Breadcrumbs
          elements={[{ name: "Regresar a Pacientes", href: "/pacientes" }]}
        />
        <div className="row align-items-center mb-3">
          <div className="col-12 col-md-6">
            <h1>Paciente</h1>
          </div>
          <div className="col-12 col-md-6 text-right"></div>
        </div>
        <div className="card p-3 shadow-sm my-3">
          <h2 className="border-bottom pb-3 mb-3">Expediente</h2>
          {renderUsuario()}
        </div>
        {renderPruebas()}
      </div>
    </>
  );
};

export default SinglePaciente;
