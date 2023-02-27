import React, { useContext, useEffect, useState } from "react";
import SurveyConfigCard from "../../components/cuestionario/SurveyConfigCard";
import TestConfigCard from "../../components/pruebas/TestConfigCard";
import { ModalContext } from "../../context/ModalContext";
import { MultiTestContext } from "../../context/MultiTestContext";
import { TestTypeContext } from "../../context/TestTypeContext";

const MultiTestConfig = ({ idMultiTest }) => {
  const [copied, setCopied] = useState(false);
  const [testType, setTestType] = useState(null);
  const [settings, setSettings] = useState(null);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
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
      if (Array.isArray(multitest.tests)) {
        let multitestsRender = multitest.tests
          .filter((test) => test.idPatient === null)
          .sort((a, b) => (a.order < b.order ? -1 : 1));
        if (multitestsRender.length === 0) {
          return <p>Aún no hay ejercicios registrados.</p>;
        }
        return (
          <div className="row">
            {multitestsRender.map((test) => (
              <TestConfigCard
                key={test.id}
                test={test}
                handleShowSettings={handleSettings}
              />
            ))}
          </div>
        );
      }
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
            <button className="btn btn-primary btn-block">Agregar</button>
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
      return multitest.surveys
        .filter((survey) => survey.idPatient === null)
        .map((survey) => (
          <SurveyConfigCard
            key={survey.id}
            survey={survey}
            handleShowSettings={handleSettings}
          />
        ));
    }
  };

  const handleSettings = (testType, settings) => {
    setTestType(testType);
    setSettings(settings);
    setShowOffCanvas(true);
  };

  const renderSettings = () => {
    if (settings && settings !== null) {
      let columns = Object.keys(settings).filter(
        (key) =>
          !String(key).startsWith("id") &&
          key !== "_id" &&
          key !== "createdAt" &&
          key !== "updatedAt"
      );
      return (
        <div>
          <h5 className="border-bottom pb-2">Parámetros</h5>
          {columns.map((key) => (
            <div key={key} className="row">
              <div className="col-8">{key}</div>
              <div className="col-4">{settings[key]}</div>
            </div>
          ))}
        </div>
      );
    }
  };

  const renderDetails = () => {
    if (testType && testType !== null) {
      return (
        <div>
          <h4>{testType.name}</h4>
          <p className="text-muted mb-4">{testType.author}</p>
          {renderSettings()}
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div className="row mx-0 border-bottom pb-2 mb-3 mt-4 align-items-center">
        <div className="col-6 px-0">
          <h1>Configurar Estudio #{idMultiTest}</h1>
        </div>
        <div className="col-6 text-end px-0">
          <button className="btn btn-outline-dark mx-2" onClick={copyURL}>
            <i className="fa fa-link me-1"></i> Compartir
          </button>
          <button className="btn btn-outline-dark">
            <i className="far fa-file-excel me-1"></i> Descargar Resultados
          </button>
        </div>
      </div>
      <h3>Ejercicios</h3>
      {renderTests()}
      <h3>Cuestionarios</h3>
      {renderSurveys()}
      <input
        id="url-input"
        type="text"
        value={
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://lab-cognicion.web.app" + `/multi/${idMultiTest}`
        }
        className="invisible"
        onChange={(e) => e}
      />

      <div
        tabIndex="-1"
        id="staticBackdrop"
        data-bs-backdrop="static"
        className={`offcanvas offcanvas-end ${showOffCanvas ? "show" : ""}`}
        aria-labelledby="staticBackdropLabel"
      >
        <div className="offcanvas-header pb-2">
          <h5 className="offcanvas-title" id="staticBackdropLabel">
            Detalles
          </h5>
          <button
            type="button"
            className="btn btn-link text-muted no-decoration"
            data-bs-dismiss="offcanvas"
            onClick={() => setShowOffCanvas(false)}
            aria-label="Close"
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="offcanvas-body pt-4">
          <div>{renderDetails()}</div>
        </div>
      </div>
      {showOffCanvas && <div className="offcanvas-backdrop fade show"></div>}
    </div>
  );
};

export default MultiTestConfig;
