import React, { useContext, useEffect, useState } from "react";
import { ResultadosContext } from "../../../context/ResultadosContext";
import TestPatient from "../../../components/resultados/TestPatient";
import StroopRow from "../../../components/resultados/StroopRow";
import { calculateAverage } from "../../../utils";
import StroopConfig from "./StroopConfig";
import ReactToPdf from "react-to-pdf";
import moment from "moment";
import StroopSummary from "./StroopSummary";

const StroopResults = ({ id }) => {
  const { resultado, getSingleTest, clearSingleResultado } =
    useContext(ResultadosContext);
  const [showEstimulos, setShowEstimulos] = useState(true);

  useEffect(() => {
    getSingleTest(id);
    return clearSingleResultado;
  }, []);

  const renderConfig = () => {
    if (resultado && resultado !== null) {
      if (resultado.settings && resultado.settings !== null) {
        return (
          <StroopConfig
            prueba={resultado}
            idTestType={resultado.test.testType.id}
          />
        );
      }
    }
  };

  const renderEstimulos = () => {
    if (resultado && resultado !== null && showEstimulos) {
      if (resultado.results.estimulos) {
        return resultado.results.estimulos.map((target, index) => (
          <StroopRow
            key={target.timestamp}
            target={target}
            type={resultado.test.testType.id}
            objective={resultado.settings.target}
            index={index}
            clave={resultado.settings.clave}
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
        return calculateAverage(reacciones).toFixed(4);
      }
    }
    return "N/D";
  };

  const renderResults = () => {
    if (resultado && resultado !== null) {
      if (resultado.results && resultado.results !== null) {
        return <StroopSummary test={resultado.results} />;
      }
      return <p className="text-danger">Esta prueba no ha sido completada.</p>;
    }
  };

  const renderSujeto = () => {
    if (resultado && resultado !== null) {
      const { patient } = resultado.test;
      return <TestPatient patient={patient} />;
    }
  };

  const renderHeaders = () => {
    if (resultado && resultado !== null && showEstimulos) {
      return (
        <div className="row bold">
          <div className="col">#</div>
          <div className="col">Texto</div>
          <div className="col">Tinta</div>
          <div className="col">Click</div>
          <div className="col">Tipo</div>
          <div className="col">TR (ms)</div>
          <div className="col">Resultado</div>
        </div>
      );
    }
  };

  return (
    <ReactToPdf
      filename={`resultados_${id}_${moment().format(
        "YYYY-MM-DD-HH:mm:ss"
      )}.pdf`}
      scale={0.65}
    >
      {({ toPdf, targetRef }) => (
        <div className="container pb-3" ref={targetRef}>
          <div className="card shadow-sm p-3 my-2">
            <div className="row border-bottom pb-3 mb-3 align-items-center">
              <div className="col col-md-10">
                <h1 className="h3">
                  {resultado && resultado !== null && (
                    <b>Prueba #{resultado !== null && resultado.test.id}</b>
                  )}
                  :{" "}
                  {resultado && resultado !== null ? (
                    resultado.test.testType.name
                  ) : (
                    <div className="spinner-border"></div>
                  )}
                </h1>
              </div>
              <div className="col col-md-2 text-end">
                <button className="btn btn-outline-dark" onClick={toPdf}>
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
              <div className="col col-md-4 text-end px-0">
                <button
                  className="btn btn-outline-dark"
                  onClick={() => setShowEstimulos(!showEstimulos)}
                >
                  <i
                    className={`fa fa-eye${showEstimulos ? "-slash" : ""}`}
                  ></i>
                </button>
              </div>
            </div>
            {renderHeaders()}
            {renderEstimulos()}
          </div>
        </div>
      )}
    </ReactToPdf>
  );
};

export default StroopResults;
