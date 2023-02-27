import React, { useState, useContext, useEffect } from "react";
import { TestTypeContext } from "../context/TestTypeContext";
import TestTypeCard from "../components/pruebas/TestTypeCard";

const Pruebas = () => {
  const [selected, setSelected] = useState(null);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const { testTypes, getTestTypes } = useContext(TestTypeContext);

  useEffect(() => {
    getTestTypes();
  }, []);

  useEffect(() => {
    if (!showOffCanvas && selected !== null) {
      setSelected(null);
    }
  }, [showOffCanvas]);

  const handleInfo = (testType) => {
    setSelected(testType);
    setShowOffCanvas(true);
  };

  const renderTestTypes = () => {
    if (Array.isArray(testTypes)) {
      return testTypes.map((testType) => (
        <TestTypeCard
          key={testType.id}
          testType={testType}
          handleInfo={handleInfo}
        />
      ));
    }
  };

  const renderDetails = () => {
    if (selected && selected !== null) {
      return (
        <div>
          <h4>{selected.name}</h4>
          <p>
            En el centro de la pantalla irán apareciendo de manera secuencial
            distintas letras del abecedario. La tarea consiste que usted pulse
            la tecla "Espacio" cuando vea aparecer la letra "O".
          </p>
          <p>
            Es importante que responda tan rápido como pueda, ya que los
            estímulos aparecen y desaparecen rápidamente.
          </p>
          <h4 className="mb-4">{selected.author}</h4>
          <p>
            Professor of Psychology at UDEM, Cognitive Lab Director, Digital and
            Virtual Behavior Designer and Founder of Aluo, an app to remember
            your dreams
          </p>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="container">
          <h1>Pruebas</h1>
          <div className="row">{renderTestTypes()}</div>
        </div>
      </div>
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

export default Pruebas;
