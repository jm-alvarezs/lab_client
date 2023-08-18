import React, { useContext, useEffect, useState } from "react";
import ResultParameters from "../components/resultados/ResultParameters";
import ResultSummary from "../components/resultados/ResultSummary";
import { ResultadosContext } from "../context/ResultadosContext";
import EstimuloRow from "../components/resultados/EstimuloRow";
import ReactToPdf from "react-to-pdf";
import moment from "moment";

const SingleResults = ({ id }) => {
  const { resultado, getSingleTest, clearSingleResultado } =
    useContext(ResultadosContext);
  const [showEstimulos, setShowEstimulos] = useState(true);

  useEffect(() => {
    getSingleTest(id);
    return clearSingleResultado;
  }, []);

  const renderEstimulos = () => {
    if (resultado && resultado !== null && showEstimulos) {
      if (resultado.results.targets) {
        return resultado.results.targets.map((target, index) => (
          <EstimuloRow
            index={index}
            estimulo={target}
            key={target.timestamp}
            clave={resultado.settings.clave}
            type={resultado.test.testType.id}
            objective={resultado.settings.target}
            prevItem={index > 0 ? resultado.results.targets[index - 1] : {}}
          />
        ));
      }
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
          <ResultSummary result={resultado} handlePDF={toPdf} />
          <ResultParameters result={resultado} />
          <div className="card shadow-sm p-3 my-2">
            <div className="border-bottom pb-3 mb-3 row mx-0">
              <div className="col col-md-8 px-0">
                <h3>Estímulos</h3>
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

export default SingleResults;
