import React, { useContext, useEffect, useState } from "react";
import SurveyConfigCard from "../../components/cuestionario/SurveyConfigCard";
import TestConfigCard from "../../components/pruebas/TestConfigCard";
import { ModalContext } from "../../context/ModalContext";
import { MultiTestContext } from "../../context/MultiTestContext";
import { TestTypeContext } from "../../context/TestTypeContext";

const MultiTestConfig = ({ idMultiTest }) => {
  const [copied, setCopied] = useState(false);
  const { multitest, createMultiTest, getSingleMultiTest } =
    useContext(MultiTestContext);

  const { testTypes, getTestTypes } = useContext(TestTypeContext);

  const { success } = useContext(ModalContext);

  useEffect(() => {
    if (isNaN(idMultiTest)) {
      createMultiTest();
    } else {
      getSingleMultiTest(idMultiTest);
    }
    getTestTypes();
  }, []);

  useEffect(() => {
    if (copied) {
      success("Enlace copiado al portapapeles.");
    }
  }, [copied]);

  const copyURL = () => {
    var copyText = document.getElementById("url-input");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    navigator.clipboard.writeText(copyText.value).then(() => {
      setCopied(true);
    });
  };

  const renderTests = () => {
    if (multitest && multitest !== null) {
      if (multitest.tests.length === 0) {
        return <p>Aún no hay ejercicios registrados.</p>;
      }
      return multitest.tests
        .filter((test) => test.idPatient === null)
        .map((test) => <TestConfigCard key={test.id} test={test} />);
    }
  };

  const renderOptions = () => {
    if (Array.isArray(testTypes)) {
      return (
        <div className="row mb-5">
          <div className="col-8">
            <select className="form-control">
              {testTypes.map((testType) => (
                <option key={testType.id} value={testType.id}>
                  {testType.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <button className="btn btn-dark btn-block">Agregar</button>
          </div>
        </div>
      );
    }
  };

  const renderSurveys = () => {
    if (multitest && multitest !== null) {
      if (multitest.surveys.length === 0) {
        return <p>No hay cuestionarios para esta prueba.</p>;
      }
      return multitest.surveys.map((survey) => (
        <SurveyConfigCard survey={survey} />
      ));
    }
  };

  return (
    <div className="container">
      <div className="row mx-0 border-bottom pb-3 mb-3 mt-4 align-items-center">
        <div className="col-6 px-0">
          <h1>Configurar Prueba #{idMultiTest}</h1>
        </div>
        <div className="col-6 text-right px-0">
          <button className="btn btn-outline-dark mx-2" onClick={copyURL}>
            <i className="fa fa-link me-2"></i> Compartir
          </button>
          <button className="btn btn-outline-dark">
            <i className="far fa-file-excel me-2"></i> Descargar Resultados
          </button>
        </div>
      </div>
      <h3>Ejercicios en esta Prueba</h3>
      {renderTests()}
      <h3>Cuestionarios en esta Prueba</h3>
      {renderSurveys()}
      <input
        id="url-input"
        type="text"
        value={`http://localhost:3000/multi/${idMultiTest}`}
        className="invisible"
        onChange={(e) => e}
      />
    </div>
  );
};

export default MultiTestConfig;
