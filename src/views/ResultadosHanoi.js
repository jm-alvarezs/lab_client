import React, { useContext, useEffect, useState } from "react";
import MovimientosHanoi from "../components/hanoi/MovimientosHanoi";
import ParametrosHanoi from "../components/hanoi/ParametrosHanoi";
import { ResultadosContext } from "../context/ResultadosContext";
import TestPatient from "../components/resultados/TestPatient";
import ResumenHanoi from "../components/hanoi/ResumenHanoi";
import { PruebasContext } from "../context/PruebasContext";
import ReactToPdf from "react-to-pdf";
import moment from "moment";

const ResultadosHanoi = ({ idTest }) => {
  const [showSujeto, setShowSujeto] = useState(true);
  const { resultado, getSingleTest } = useContext(ResultadosContext);
  const { putResultados } = useContext(PruebasContext);

  const fetchTest = () => getSingleTest(idTest);

  useEffect(() => {
    fetchTest();
  }, []);

  const renderSujeto = () => {
    if (resultado && resultado !== null) {
      const { patient } = resultado.test;
      return (
        <div className="card shadow-sm p-3 mb-4">
          <div className="row pb-3 mb-3 border-bottom">
            <div className="col-8">
              <h3 className="bold">Sujeto</h3>
            </div>
            <div className="col-4 text-end">
              <button
                className="btn btn-outline-dark"
                onClick={() => setShowSujeto(!showSujeto)}
              >
                <i className={`fa fa-eye${showSujeto ? "-slash" : ""}`}></i>
              </button>
            </div>
          </div>
          {showSujeto && <TestPatient patient={patient} />}
        </div>
      );
    }
  };

  const renderResumen = (toPdf) => {
    if (resultado && resultado !== null) {
      if (resultado.results && resultado.results !== null) {
        return (
          <ResumenHanoi
            resultado={resultado}
            movimientos={resultado.results.movements}
            finishTime={resultado.results.end}
            startTime={resultado.results.start}
            {...resultado.results.results}
            toPdf={toPdf}
          />
        );
      }
      return (
        <p className="text-danger mt-4">Esta prueba no ha sido completada.</p>
      );
    }
    return <div className="spinner-border"></div>;
  };

  const renderParametros = () => {
    if (resultado && resultado !== null) {
      if (resultado.settings && resultado.settings !== null) {
        return (
          <ParametrosHanoi
            resultado={resultado.results}
            idTest={resultado.test.id}
            handleCallback={fetchTest}
            settings={resultado.settings}
            putResultados={putResultados}
          />
        );
      }
    }
  };

  const renderEstimulos = () => {
    if (resultado && resultado !== null) {
      if (resultado.results.movements) {
        return <MovimientosHanoi movimientos={resultado.results.movements} />;
      }
    }
  };

  return (
    <ReactToPdf
      filename={`Test_${idTest}_${moment().format("YYYY-MM-DD_HH:mm")}.pdf`}
      scale={0.65}
    >
      {({ toPdf, targetRef }) => (
        <div className="container pt-4" ref={targetRef}>
          {renderResumen(toPdf)}
          {renderParametros()}
          {renderSujeto()}
          {renderEstimulos()}
        </div>
      )}
    </ReactToPdf>
  );
};

export default ResultadosHanoi;
