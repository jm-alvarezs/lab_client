import React from "react";
import TestPatient from "./TestPatient";
import TestSettings from "../pruebas/TestSettings";

const ResultParameters = ({ result }) => {
  const renderSettings = () => {
    if (result && result !== null) {
      if (result.settings && result.settings !== null) {
        return (
          <TestSettings
            settings={result.settings}
            idTestType={result.test.testType.id}
          />
        );
      }
    }
  };

  const renderPatient = () => {
    if (result && result !== null) {
      const { patient } = result.test;
      return <TestPatient patient={patient} />;
    }
  };

  return (
    <div className="row">
      <div className="col col-md-6">
        <div className="card shadow-sm p-3 my-2">
          <h3 className="pb-3 mb-3 border-bottom">Configuración</h3>
          {renderSettings()}
        </div>
      </div>
      <div className="col col-md-6">
        <div className="card shadow-sm p-3 my-2">
          <h3 className="pb-3 mb-3 border-bottom">Sujeto</h3>
          {renderPatient()}
        </div>
      </div>
    </div>
  );
};

export default ResultParameters;
