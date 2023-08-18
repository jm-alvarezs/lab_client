import React, { useEffect, useState } from "react";
import { getResultsCondicional } from "../../utils/condicional";
import { getResultadoSimple } from "../../utils/simple";
import ResumenResultados from "./ResumenResultados";
import ResultChart from "./ResultChart";

const ResultSummary = ({ result, handlePDF }) => {
  const [results, setResults] = useState({});

  useEffect(() => {
    if (emptyResults()) {
      handleResults();
    }
  }, [result]);

  const emptyResults = () =>
    result && result !== null && Object.keys(results).length === 0;

  const handleResults = () => {
    let resultStats = {};
    switch (result.test.idTestType) {
      case 2:
        resultStats = getResultsCondicional(
          result.results.targets,
          result.settings
        );
        break;
      default:
        resultStats = getResultadoSimple(
          result.results.targets,
          result.settings
        );
    }
    setResults(resultStats);
  };

  const renderTitle = () => {
    if (result && result !== null) {
      return (
        <span>
          <b>Prueba #{result.test.id}</b>:{renderTestType()}
        </span>
      );
    }
  };

  const renderTestType = () => {
    if (result.test.testType && result.test.testType !== null) {
      return result.test.testType.name;
    }
  };

  const renderSummary = () => {
    if (result && result !== null) {
      if (Array.isArray(result.results.targets) && result.results.results) {
        if (!results.aciertos) {
          return <div className="spinner-border"></div>;
        }
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col col-md-12">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <ResultChart
                      estimulos={result.results.targets.length}
                      aciertos={result.results.results.aciertos}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <ResumenResultados
                      result={result}
                      {...result.results.results}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return <p className="text-danger">Esta prueba no ha sido completada.</p>;
    }
  };

  return (
    <div className="card shadow-sm p-3 my-2">
      <div className="row border-bottom pb-3 mb-3 align-items-center">
        <div className="col col-md-10">
          <h1 className="h3">{renderTitle()}</h1>
        </div>
        <div className="col col-md-2 text-end">
          <button className="btn btn-outline-dark" onClick={handlePDF}>
            <i className="fa fa-print"></i>
          </button>
        </div>
      </div>
      {renderSummary()}
    </div>
  );
};

export default ResultSummary;
