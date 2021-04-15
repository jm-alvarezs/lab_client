import React, { useContext, useEffect, useState } from "react";
import PruebaConfig from "../components/PruebaConfig";
import { ResultadosContext } from "../context/ResultadosContext";
import moment from "moment";
import SplitHalfTesting from "./SplitHalfTesting";
import ResultChart from "../components/ResultChart";
import EstimuloRow from "../components/resultados/EstimuloRow";
import {
  calculateAverage,
  getResultadoTargets,
  getResultadoTargetsCondicional,
} from "../utils";

const SingleResults = ({ id }) => {
  const { resultado, getSingleTest } = useContext(ResultadosContext);
  const [showEstimulos, setShowEstimulos] = useState(true);

  useEffect(() => {
    getSingleTest(id);
  }, []);

  const renderConfig = () => {
    if (resultado && resultado !== null) {
      if (resultado.results.settings && resultado.results.settings !== null) {
        return <PruebaConfig prueba={resultado.results.settings} />;
      }
    }
  };

  const renderEstimulos = () => {
    if (resultado && resultado !== null) {
      if (resultado.results.targets) {
        return resultado.results.targets.map((target) => (
          <EstimuloRow
            key={target.timestamp}
            target={target}
            type={resultado.test.testType.name}
            objective={resultado.results.target}
          />
        ));
      }
    }
  };

  const getTiempoReaccion = () => {
    if (resultado && resultado !== null) {
      if (resultado.results.targets && resultado.results.targets !== null) {
        let reacciones = resultado.results.targets.map((target) =>
          target.reaction ? target.reaction : null
        );
        reacciones = reacciones.filter((item) => item !== null);
        return calculateAverage(reacciones);
      }
    }
    return "N/D";
  };

  const renderResults = () => {
    if (resultado && resultado !== null) {
      if (resultado.results.targets) {
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col col-md-6">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <ResultChart
                      items={resultado.results.targets}
                      target={resultado.results.target}
                      type={
                        window.location.href.includes("condicional")
                          ? "condicional"
                          : "simple"
                      }
                      prevTarget={resultado.results.prevTarget}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <h3>Resumen</h3>
                    <p>
                      Aciertos:{" "}
                      {resultado.test.testType.name.includes("condicional")
                        ? getResultadoTargetsCondicional(
                            resultado.results.targets,
                            resultado.results.target,
                            resultado.results.prevTarget,
                            "aciertos"
                          )
                        : getResultadoTargets(
                            resultado.results.targets,
                            resultado.results.target,
                            "aciertos"
                          )}
                    </p>
                    <p>
                      Errores:{" "}
                      {resultado.test.testType.name.includes("condicional")
                        ? getResultadoTargetsCondicional(
                            resultado.results.targets,
                            resultado.results.target,
                            resultado.results.prevTarget,
                            "errores"
                          )
                        : getResultadoTargets(
                            resultado.results.targets,
                            resultado.results.target,
                            "errores"
                          )}
                    </p>
                    <h4>Detalle</h4>
                    <p>
                      Omisiones Correctas:{" "}
                      {resultado.test.testType.name.includes("condicional")
                        ? getResultadoTargetsCondicional(
                            resultado.results.targets,
                            resultado.results.target,
                            resultado.results.prevTarget,
                            "omision",
                            true
                          )
                        : getResultadoTargets(
                            resultado.results.targets,
                            resultado.results.target,
                            "omision",
                            true
                          )}
                    </p>
                    <p>
                      Omisiones Incorrectas:{" "}
                      {resultado.test.testType.name.includes("condicional")
                        ? getResultadoTargetsCondicional(
                            resultado.results.targets,
                            resultado.results.target,
                            resultado.results.prevTarget,
                            "omision",
                            false
                          )
                        : getResultadoTargets(
                            resultado.results.targets,
                            resultado.results.target,
                            "omision",
                            false
                          )}
                    </p>
                    <p>
                      Clicks Correctos:{" "}
                      {resultado.test.testType.name.includes("condicional")
                        ? getResultadoTargetsCondicional(
                            resultado.results.targets,
                            resultado.results.target,
                            resultado.results.prevTarget,
                            "click",
                            true
                          )
                        : getResultadoTargets(
                            resultado.results.targets,
                            resultado.results.target,
                            "click",
                            true
                          )}
                    </p>
                    <p>
                      Clicks Incorrectos:{" "}
                      {resultado.test.testType.name.includes("condicional")
                        ? getResultadoTargetsCondicional(
                            resultado.results.targets,
                            resultado.results.target,
                            resultado.results.prevTarget,
                            "click",
                            false
                          )
                        : getResultadoTargets(
                            resultado.results.targets,
                            resultado.results.target,
                            "click",
                            false
                          )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col col-md-6">
                <SplitHalfTesting
                  items={resultado.results.targets}
                  column="reaction"
                  result=""
                />
              </div>
            </div>
          </div>
        );
      }
    }
  };

  const renderSujeto = () => {
    if (resultado && resultado !== null) {
      const { patient } = resultado.test;
      const {
        name,
        email,
        birthDate,
        gender,
        antecedent,
        dominantHand,
        drugsConsumption,
        whichDrugs,
        durgsTreatment,
        dose,
        damageLocation,
      } = patient;
      return (
        <div>
          <h4>{name}</h4>
          <p>{email}</p>
          <p>Género: {gender}</p>
          <p>Fecha de Nacimiento: {moment(birthDate).format("DD MMM YYYY")}</p>
          <label>Antecedentes:</label>
          <p>{antecedent}</p>
          <p>Mano Dominante: {dominantHand}</p>
          <p>Consumo de Drogas: {drugsConsumption}</p>
          <p>Drogas: {whichDrugs}</p>
          <p>Tratamiento: {durgsTreatment}</p>
          <p>Dosis: {dose}</p>
          <p>Ubicación del Daño: {damageLocation}</p>
        </div>
      );
    }
  };

  return (
    <div className="container pb-3">
      <div className="card shadow-sm p-3 my-2">
        <div className="row border-bottom pb-3 mb-3 align-items-center">
          <div className="col col-md-10">
            <h1 className="h3">
              <b>Resultados:</b>{" "}
              {resultado && resultado !== null ? (
                resultado.test.testType.name
              ) : (
                <div className="spinner-border"></div>
              )}
            </h1>
          </div>
          <div className="col col-md-2 text-right">
            <button className="btn btn-outline-dark">
              <i className="fa fa-print"></i>
            </button>
          </div>
        </div>
        {renderResults()}
      </div>
      <div className="row">
        <div className="col col-md-6">
          <div className="card shadow-sm p-3 my-2">
            <h3 className="pb-3 mb-3 border-bottom">Configuración</h3>
            {renderConfig()}
          </div>
        </div>
        <div className="col col-md-6">
          <div className="card shadow-sm p-3 my-2">
            <h3 className="pb-3 mb-3 border-bottom">Sujeto</h3>
            {renderSujeto()}
          </div>
        </div>
      </div>
      <div className="card shadow-sm p-3 my-2">
        <div className="border-bottom pb-3 mb-3 row mx-0">
          <div className="col col-md-8 px-0">
            <h3>Estímulos</h3>
            <p className="mb-1">Reaccion Media: {getTiempoReaccion()}ms</p>
          </div>
          <div className="col col-md-4 text-right px-0">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowEstimulos(!showEstimulos)}
            >
              <i className={`fa fa-eye${showEstimulos ? "-slash" : ""}`}></i>
            </button>
          </div>
        </div>

        {showEstimulos && (
          <>
            <div className="row">
              <div className="col col-md-2">Emisión</div>
              <div className="col col-md-2">Caracter</div>
              <div className="col col-md-2">Click</div>
              <div className="col col-md-2">TR</div>
              <div className="col col-md-2">Resultado</div>
            </div>
            {renderEstimulos()}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleResults;
