import React, { useContext, useEffect, useState } from "react";
import PruebaConfig from "../components/pruebas/PruebaConfig";
import { ResultadosContext } from "../context/ResultadosContext";
import moment from "moment";
import SplitHalfTesting from "./SplitHalfTesting";
import ResultChart from "../components/resultados/ResultChart";
import EstimuloRow from "../components/resultados/EstimuloRow";
import { calculateAverage } from "../utils";
import ReactToPdf from "react-to-pdf";
import ResumenResultados from "../components/resultados/ResumenResultados";
import SujetoPrueba from "../components/resultados/SujetoPrueba";

const SingleResults = ({ id }) => {
  const { resultado, fiability, getSingleTest, getFiablity } =
    useContext(ResultadosContext);
  const [showEstimulos, setShowEstimulos] = useState(true);

  useEffect(() => {
    getSingleTest(id);
    getFiablity();
  }, []);

  const renderConfig = () => {
    if (resultado && resultado !== null) {
      if (resultado.results.settings && resultado.results.settings !== null) {
        return <PruebaConfig prueba={resultado.results.settings} />;
      }
    }
  };

  const renderEstimulos = () => {
    if (resultado && resultado !== null && showEstimulos) {
      if (resultado.results.targets) {
        return resultado.results.targets.map((target, index) => (
          <EstimuloRow
            key={target.timestamp}
            target={target}
            type={resultado.test.testType.id}
            objective={resultado.results.target}
            index={index}
            prevItem={index > 0 ? resultado.results.targets[index - 1] : {}}
            clave={resultado.results.settings.clave}
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
                      type={resultado.test.testType.id}
                      prevTarget={resultado.results.prevTarget}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <ResumenResultados resultado={resultado} />
                  </div>
                </div>
              </div>
              <div className="col col-md-6">
                {fiability && fiability !== null && (
                  <SplitHalfTesting
                    items={resultado.results.targets}
                    average_one={fiability.average_one}
                    average_two={fiability.average_two}
                    column="reaction"
                    result={getTiempoReaccion()}
                  />
                )}
              </div>
            </div>
          </div>
        );
      }
      return <p>Prueba no completada.</p>;
    }
  };

  const renderSujeto = () => {
    if (resultado && resultado !== null) {
      const { patient } = resultado.test;
      return <SujetoPrueba patient={patient} />;
    }
  };

  const renderHeaders = () => {
    if (resultado && resultado !== null && showEstimulos) {
      switch (resultado.test.testType.id) {
        case 3:
          return (
            <div className="row">
              <div className="col col-md-1">#</div>
              <div className="col col-md-2">Emisión</div>
              <div className="col col-md-2">Caracter</div>
              <div className="col col-md-1">QN</div>
              <div className="col col-md-2">Click</div>
              <div className="col col-md-2">TR</div>
              <div className="col col-md-2">Resultado</div>
            </div>
          );
        default:
          return (
            <div className="row bold">
              <div className="col col-md-2">#</div>
              <div className="col col-md-2">Emisión</div>
              <div className="col col-md-2">Caracter</div>
              <div className="col col-md-2">Click</div>
              <div className="col col-md-2">TR</div>
              <div className="col col-md-2">Resultado</div>
            </div>
          );
      }
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
                  {resultado && resultado !== null ? (
                    <b>Prueba #{resultado.test.id}</b>
                  ) : (
                    ""
                  )}
                  :{" "}
                  {resultado && resultado !== null ? (
                    resultado.test.testType.name
                  ) : (
                    <div className="spinner-border"></div>
                  )}
                </h1>
              </div>
              <div className="col col-md-2 text-right">
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
              <div className="col col-md-4 text-right px-0">
                <button
                  className="btn btn-outline-secondary"
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

export default SingleResults;
