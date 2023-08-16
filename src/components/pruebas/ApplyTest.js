import React, { useContext, useEffect, useState } from "react";
import { TestTypeContext } from "../../context/TestTypeContext";
import { hasCredits } from "../../utils";
import { AuthContext } from "../../context/AuthContext";
import { navigate } from "@reach/router";

const ApplyTest = ({ idPatient }) => {
  const [test, setTest] = useState("");

  const { testTypes, getTestTypes } = useContext(TestTypeContext);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getTestTypes();
  }, []);

  useEffect(() => {
    if (Array.isArray(testTypes)) {
      if (testTypes[0]) {
        setTest(testTypes[0].handle);
      }
    }
  }, [testTypes]);

  const handleApplyTest = () => {
    if (test && test !== null) {
      navigate(`/config/${test}/${idPatient}`);
    }
  };

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
        <div className="col-6 text-end">
          <b>Restantes: </b>
          {hasCredits(user)}
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
          <button
            disabled={hasCredits(user) === 0}
            onClick={handleApplyTest}
            className="btn btn-primary btn-block w-100"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyTest;
