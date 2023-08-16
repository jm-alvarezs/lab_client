import React from "react";
import ResultChart from "./ResultChart";
import SplitHalfTesting from "./SplitHalfTesting";
import ResumenResultados from "./ResumenResultados";

const ResultSummary = ({ result, fiability, handlePDF }) => {
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
      if (result.results.targets) {
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col col-md-12">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <ResultChart
                      items={result.results.targets}
                      target={result.results.target}
                      type={result.test.testType.id}
                      prevTarget={result.results.prevTarget}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <ResumenResultados result={result} />
                  </div>
                </div>
              </div>
              {/*
                <div className="col col-md-6">
                  {fiability && fiability !== null && (
                    <SplitHalfTesting
                      items={result.results.targets}
                      average_one={fiability.average_one}
                      average_two={fiability.average_two}
                      column="reaction"
                    />
                  )}
                </div>
                  */}
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
