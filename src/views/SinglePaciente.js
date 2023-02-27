import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../components/global/Breadcrumbs";
import UsuarioData from "../components/usuarios/UsuarioData";
import { PacientesContext } from "../context/PacientesContext";
import { Link } from "@reach/router";
import { hasCredits, testsNechapi } from "../utils";
import NechapiSummary from "../components/cuestionario/NechapiSummary";
import ApplyTest from "../components/pruebas/ApplyTest";
import { UserContext } from "../context/UserContext";
import { navigate } from "@reach/router";
import { ModalContext } from "../context/ModalContext";

const SinglePaciente = ({ id }) => {
  const [canPredict, setCanPredict] = useState(false);
  const [completed, setCompleted] = useState(null);
  const [method, setMethod] = useState("kmeans");
  const [survey, setSurvey] = useState("nechapi");
  const {
    spinner,
    paciente,
    categorias,
    deletePaciente,
    clearCategorias,
    getSinglePaciente,
    getNechapiForecast,
  } = useContext(PacientesContext);

  const { user } = useContext(UserContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    getSinglePaciente(id);
    return () => {
      clearCategorias();
    };
  }, []);

  useEffect(() => {
    if (paciente !== null) {
      const { results } = paciente;
      if (results) {
        let testSet = new Set();
        results.forEach((result) => {
          const { settings } = result;
          if (settings) {
            testSet.add(settings.idTestType);
          }
        });
        testSet = Array.from(testSet);
        setCompleted(testSet);
        setCanPredict(testSet.length === 4);
      }
    }
  }, [paciente]);

  const confirmDelete = (paciente) => {
    modalComponent(
      "Precaución",
      <div>
        <p>
          ¿Estás seguro que deseas eliminar al paciente {paciente.name}? Esta
          acción NO puede deshacerse y se perderán todas sus pruebas realizadas.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deletePaciente(paciente.id)}
        >
          <i className="fa fa-trash"></i> Eliminar
        </button>
      </div>
    );
  };

  const renderUsuario = () => {
    if (paciente && paciente !== null) {
      return <UsuarioData usuario={paciente} />;
    }
    return <div className="spinner-border"></div>;
  };

  const renderCuestionarios = () => {
    if (!isNaN(id)) {
      if (paciente && paciente !== null) {
        return (
          <div className="card p-3 shadow-sm my-3">
            <div className="row border-bottom pb-2 mb-4">
              <div className="col-6">
                <h4>Aplicar un cuestionario</h4>
              </div>
              <div className="col-6 text-end">
                <b>Restantes: </b>
                {hasCredits(user)}
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-xl-8">
                <select
                  value={survey}
                  className="form-control"
                  onChange={(e) => setSurvey(e.target.value)}
                >
                  <option value="nechapi">Nechapi</option>
                  <option value="cupom">CUPOM</option>
                </select>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <button
                  onClick={() => navigate(`/cuestionario/${survey}/${id}`)}
                  className="btn btn-primary btn-block w-100"
                  disabled={hasCredits(user) === 0}
                >
                  Aplicar
                </button>
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
                <h4>Pronosticar Nechapi</h4>
              </div>
            </div>
            {canPredict ? (
              <div className="row mb-3">
                <div className="col-12 col-md-6 col-xl-8">
                  <select
                    value={method}
                    className="form-control"
                    onChange={(e) => setMethod(e.target.value)}
                  >
                    <option value="kmeans">Método A: K Means</option>
                    <option value="bayes">
                      Método B: Clasificador de Bayes
                    </option>
                    <option value="knn">Método C: K Nearest Neghbors</option>
                  </select>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <button
                    className="btn btn-outline-primary btn-block"
                    onClick={() => getNechapiForecast(id, method)}
                    disabled={spinner}
                  >
                    <i className="fas fa-calculator mr-2"></i>{" "}
                    {spinner ? (
                      <div className="spinner-border"></div>
                    ) : (
                      "Pronosticar Resultado"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p>
                  El paciente no ha completado las 4 pruebas necesarias para
                  pronosticar su Nechapi.
                </p>
                <div className="row">
                  {testsNechapi.map((test) => (
                    <div key={test.key} className="col-12 col-md-3">
                      <i
                        className={`fa ${
                          completed !== null
                            ? completed.includes(test.id)
                              ? "fa-check text-success"
                              : "fa-times"
                            : "fa-times"
                        }`}
                      ></i>{" "}
                      {test.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {categorias && categorias !== null && (
              <NechapiSummary {...categorias} />
            )}
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
          <div className="col-12 col-md-6 text-end">
            <Link to="./edit" className="btn btn-outline-secondary">
              <i className="fa fa-edit"></i> Editar
            </Link>
          </div>
        </div>
        <div className="card p-3 shadow-sm my-3">
          <h2 className="border-bottom pb-3 mb-3">Expediente</h2>
          {renderUsuario()}
        </div>
        <ApplyTest idPatient={id} />
        {renderCuestionarios()}
        {renderNechapi()}
      </div>
    </>
  );
};

export default SinglePaciente;
