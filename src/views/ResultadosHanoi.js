import React, { useContext, useEffect, useState } from "react";
import MovimientosHanoi from "../components/hanoi/MovimientosHanoi";
import ResumenHanoi from "../components/hanoi/ResumenHanoi";
import SujetoPrueba from "../components/resultados/SujetoPrueba";
import { ResultadosContext } from "../context/ResultadosContext";
import ReactToPdf from "react-to-pdf";
import moment from "moment";
import ParametrosHanoi from "../components/hanoi/ParametrosHanoi";
import { PruebasContext } from "../context/PruebasContext";

const ResultadosHanoi = ({ idTest }) => {
  const [showSujeto, setShowSujeto] = useState(true);
  const { resultado, getSingleTest } = useContext(ResultadosContext);
  const { putResultados } = useContext(PruebasContext);

  useEffect(() => {
    getSingleTest(idTest);
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
            <div className="col-4 text-right">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowSujeto(!showSujeto)}
              >
                <i className={`fa fa-eye${showSujeto ? "-slash" : ""}`}></i>
              </button>
            </div>
          </div>
          {showSujeto && <SujetoPrueba patient={patient} />}
        </div>
      );
    }
  };

  const renderResumen = (toPdf) => {
    if (resultado && resultado !== null) {
      if (resultado.results.settings && resultado.results.settings !== null) {
        return (
          <ResumenHanoi
            resultado={resultado}
            movimientos={resultado.results.movements}
            finishTime={resultado.results.end}
            startTime={resultado.results.start}
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
      if (resultado.results.settings && resultado.results.settings !== null) {
        return (
          <ParametrosHanoi
            idTest={resultado.test.id}
            settings={resultado.results.settings}
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
        <div className="container" ref={targetRef}>
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
