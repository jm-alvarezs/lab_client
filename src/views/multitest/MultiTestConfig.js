import React, { useContext, useEffect } from "react";
import TestConfigCard from "../../components/pruebas/TestConfigCard";
import { MultiTestContext } from "../../context/MultiTestContext";
import { TestTypeContext } from "../../context/TestTypeContext";

const MultiTestConfig = ({ idMultiTest }) => {
  const { multitest, createMultiTest, getSingleMultiTest } =
    useContext(MultiTestContext);

  const { testTypes, getTestTypes } = useContext(TestTypeContext);

  useEffect(() => {
    if (isNaN(idMultiTest)) {
      createMultiTest();
    } else {
      getSingleMultiTest(idMultiTest);
    }
    getTestTypes();
  }, []);

  const renderTests = () => {
    if (multitest && multitest !== null) {
      if (multitest.tests.length === 0) {
        return <p>Aún no hay ejercicios registrados.</p>;
      }
      return multitest.tests.map((test) => (
        <TestConfigCard key={test.id} test={test} />
      ));
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

  return (
    <div className="container">
      <div className="row mx-0 border-bottom pb-3 mb-3 mt-4 align-items-center">
        <div className="col-6 px-0">
          <h1>Configurar Prueba #{idMultiTest}</h1>
        </div>
        <div className="col-6 text-right px-0"></div>
      </div>
      {renderOptions()}
      <h3>Ejercicios en esta Prueba</h3>
      {renderTests()}
    </div>
  );
};

export default MultiTestConfig;
