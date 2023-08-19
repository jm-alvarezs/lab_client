import React, { useContext, useEffect, useState } from "react";
import ParametrosFlanker from "../components/flanker/ParametrosFlanker";
import FlankerEstimulos from "../components/flanker/FlankerEstimulos";
import ResumenFlanker from "../components/flanker/ResumenFlanker";
import { ResultadosContext } from "../context/ResultadosContext";
import TestPatient from "../components/resultados/TestPatient";
import ReactToPdf from "react-to-pdf";
import moment from "moment";

const ResultadosFlanker = ({ idTest }) => {
  const [showSujeto, setShowSujeto] = useState(true);
  const { resultado, getSingleTest } = useContext(ResultadosContext);

  useEffect(() => {
    getSingleTest(idTest);
  }, []);

  const renderSujeto = () => {
    if (resultado && resultado !== null) {
      const { patient } = resultado.test;
      return (
        <div className="col-12 col-md-6">
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
        </div>
      );
    }
  };

  const renderConfig = (toPdf) => {
    if (resultado && resultado !== null) {
      if (
        resultado.settings &&
        resultado.settings !== null &&
        resultado.results &&
        resultado.results !== null
      ) {
        return (
          <ResumenFlanker
            resultado={resultado}
            {...resultado.results.results}
            estimulos={resultado.results.estimulos}
            finishTime={resultado.results.endTime}
            startTime={resultado.results.startTime}
            right={resultado.settings.rightKey}
            left={resultado.settings.leftKey}
            toPdf={toPdf}
          />
        );
      }
      return <p className="text-danger">Esta prueba no ha sido completada.</p>;
    }
    return <div className="spinner-border"></div>;
  };

  const renderParametros = () => {
    if (resultado && resultado !== null) {
      if (resultado.settings) {
        return (
          <div className="col-12 col-md-6">
            <ParametrosFlanker settings={resultado.settings} />
          </div>
        );
      }
    }
  };

  const renderEstimulos = () => {
    if (resultado && resultado !== null) {
      if (resultado.results.estimulos) {
        return (
          <FlankerEstimulos
            estimulos={resultado.results.estimulos}
            right={resultado.settings.rightKey}
            left={resultado.settings.leftKey}
          />
        );
      }
    }
  };

  return (
    <ReactToPdf
      filename={`Test_${idTest}_${moment().format("YYYY-MM-DD_HH:mm")}.pdf`}
      scale={0.5}
    >
      {({ toPdf, targetRef }) => (
        <div className="container mt-4" ref={targetRef}>
          {renderConfig(toPdf)}
          <div className="row">
            {renderParametros()}
            {renderSujeto()}
          </div>
          {renderEstimulos()}
        </div>
      )}
    </ReactToPdf>
  );
};

export default ResultadosFlanker;
