import React, { useContext, useEffect } from "react";
import Breadcrumbs from "../components/global/Breadcrumbs";
import UsuarioData from "../components/usuarios/UsuarioData";
import { PacientesContext } from "../context/PacientesContext";
import { Link } from "@reach/router";
import { allTests } from "../utils";
import NechapiSummary from "../components/cuestionario/NechapiSummary";

const SinglePaciente = ({ id }) => {
  const {
    spinner,
    categorias,
    paciente,
    getSinglePaciente,
    getNechapiForecast,
  } = useContext(PacientesContext);

  useEffect(() => {
    getSinglePaciente(id);
  }, []);

  const renderUsuario = () => {
    if (paciente && paciente !== null) {
      return <UsuarioData usuario={paciente} />;
    }
  };

  const renderCuestionarios = () => {
    if (!isNaN(id)) {
      if (paciente && paciente !== null) {
        return (
          <div className="card p-3 shadow-sm my-3">
            <h3 className="border-bottom pb-2 mb-4">Cuestionarios</h3>
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

  const renderOpciones = () => {
    return allTests.map((test) => (
      <Link
        key={test.id}
        to={`/config/${test.key}/${id}`}
        className="btn btn-outline-dark my-2"
      >
        {test.name}
      </Link>
    ));
  };

  const renderPruebas = () => {
    if (!isNaN(id)) {
      if (paciente && paciente !== null) {
        return (
          <div className="card p-3 shadow-sm my-3">
            <div className="row border-bottom pb-2 mb-4">
              <div className="col-6">
                <h3>Pruebas</h3>
              </div>
            </div>
            {renderOpciones()}
          </div>
        );
      }
    }
  };

  const renderNechapi = () => {
    if (!isNaN(id)) {
      if (paciente && paciente !== null) {
        return (
          <div className="card p-3 shadow-sm my-3">
            <div className="row border-bottom pb-2 mb-4">
              <div className="col-6">
                <h3>Nechapi Pronosticado</h3>
              </div>
            </div>
            {categorias && categorias !== null && (
              <NechapiSummary {...categorias} />
            )}
            <div className="row mx-0 px-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => getNechapiForecast(id)}
                disabled={spinner}
              >
                <i class="fas fa-calculator mr-2"></i>{" "}
                {spinner ? (
                  <div className="spinner-border"></div>
                ) : (
                  "Calcular Categorías"
                )}
              </button>
            </div>
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
          <div className="col-12 col-md-6 text-right">
            <Link to="./edit" className="btn btn-outline-secondary">
              <i className="fa fa-edit"></i> Editar
            </Link>
          </div>
        </div>
        <div className="card p-3 shadow-sm my-3">
          <h2 className="border-bottom pb-3 mb-3">Expediente</h2>
          {renderUsuario()}
        </div>
        {renderPruebas()}
        {renderCuestionarios()}
        {renderNechapi()}
      </div>
    </>
  );
};

export default SinglePaciente;
