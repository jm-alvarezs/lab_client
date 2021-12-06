import React, { useContext, useEffect, useState } from "react";
import SujetoPrueba from "../components/resultados/SujetoPrueba";
import { ResultadosContext } from "../context/ResultadosContext";
import ReactToPdf from "react-to-pdf";
import moment from "moment";
import FlankerEstimulos from "../components/flanker/FlankerEstimulos";
import ResumenFlanker from "../components/flanker/ResumenFlanker";
import ParametrosFlanker from "../components/flanker/ParametrosFlanker";

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

  const renderConfig = (toPdf) => {
    if (resultado && resultado !== null) {
      if (resultado.results.settings && resultado.results.settings !== null) {
        return (
          <ResumenFlanker
            resultado={resultado}
            estimulos={resultado.results.estimulos}
            finishTime={resultado.results.endTime}
            startTime={resultado.results.startTime}
            right={resultado.results.settings.rightKey}
            left={resultado.results.settings.leftKey}
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
        return <ParametrosFlanker settings={resultado.settings} />;
      }
    }
  };

  const renderEstimulos = () => {
    if (resultado && resultado !== null) {
      if (resultado.results.estimulos) {
        return (
          <FlankerEstimulos
            estimulos={resultado.results.estimulos}
            right={resultado.results.settings.rightKey}
            left={resultado.results.settings.leftKey}
          />
        );
      }
    }
  };

  return (
    <ReactToPdf
      filename={`Test_${idTest}_${moment().format("YYYY-MM-DD_HH:mm")}.pdf`}
      scale={0.65}
    >
      {({ toPdf, targetRef }) => (
        <div className="container mt-4" ref={targetRef}>
          {renderConfig(toPdf)}
          {renderParametros()}
          {renderSujeto()}
          {renderEstimulos()}
        </div>
      )}
    </ReactToPdf>
  );
};

export default ResultadosFlanker;
