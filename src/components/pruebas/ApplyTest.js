import React, { useContext, useEffect, useState } from "react";
import { TestTypeContext } from "../../context/TestTypeContext";
import { Link } from "@reach/router";

const ApplyTest = ({ idPatient }) => {
  const [test, setTest] = useState("");

  const { testTypes, getTestTypes } = useContext(TestTypeContext);

  useEffect(() => {
    getTestTypes();
  }, []);

  const renderOpciones = () => {
    if (Array.isArray(testTypes)) {
      return testTypes.map((test) => (
        <option key={test.id} value={test.handle}>
          {test.name}
        </option>
      ));
    }
  };

  return (
    <div className="card p-3 shadow-sm my-3">
      <div className="row border-bottom pb-2 mb-4">
        <div className="col-6">
          <h4>Aplicar una Prueba</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 col-xl-8">
          <select
            value={test}
            className="form-control mb-3"
            onChange={(e) => setTest(e.target.value)}
          >
            {renderOpciones()}
          </select>
        </div>
        <div className="col-12 col-md-6 col-xl-4">
          <Link
            to={`/config/${test}/${idPatient}`}
            className="btn btn-dark btn-block"
          >
            Aplicar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplyTest;
