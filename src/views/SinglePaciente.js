import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../components/global/Breadcrumbs";
import UsuarioData from "../components/usuarios/UsuarioData";
import { PacientesContext } from "../context/PacientesContext";
import { Link } from "@reach/router";
import { allTests } from "../utils";
import NechapiSummary from "../components/cuestionario/NechapiSummary";

const SinglePaciente = ({ id }) => {
  const [test, setTest] = useState(1);
  const [survey, setSurvey] = useState("nechapi");
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
            <h4 className="border-bottom pb-2 mb-4">Aplicar un cuestionario</h4>
            <div className="row">
              <div className="col-12 col-md-6 col-xl-8">
                <select
                  value={survey}
                  className="form-control"
                  onChange={(e) => setSurvey(e.target.value)}
                >
                  <option value="nechapi">Nechapi</option>
                  <option value="nechapi">CUPOM</option>
                </select>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <Link
                  to={`/cuestionario/${survey}/${id}`}
                  className="btn btn-dark btn-block"
                >
                  Aplicar
                </Link>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  const renderOpciones = () => {
    return allTests.map((test) => (
      <option key={test.id} value={test.key}>
        {test.name}
      </option>
    ));
  };

  const renderPruebas = () => {
    if (!isNaN(id)) {
      if (paciente && paciente !== null) {
        return (
          <div className="card p-3 shadow-sm my-3">
            <div className="row border-bottom pb-2 mb-4">
              <div className="col-6">
                <h4>Aplicar una Prueba</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-xl-8">
                <select
                  value={test}
                  className="form-control mb-3"
                  onChange={(e) => setTest(e.target.value)}
                >
                  {renderOpciones()}
                </select>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <Link
                  to={`/config/${test}/${id}`}
                  className="btn btn-dark btn-block"
                >
                  Aplicar
                </Link>
              </div>
            </div>
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
