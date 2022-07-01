import React, { useContext, useEffect, useState } from "react";
import { PruebasContext } from "../../context/PruebasContext";
import PruebasService from "../../services/PruebasService";

const SingleTestRun = ({ test, patient, order, testSetupCallback }) => {
  const [newTest, setNewTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const { prueba, getPrueba } = useContext(PruebasContext);

  useEffect(() => {
    if (test && test !== null) {
      getPrueba(test.id);
    }
  }, [test]);

  useEffect(() => {
    if (prueba !== null && prueba.test.idPatient !== patient.id && !loading) {
      setLoading(true);
      setTimeout(() => {
        testSetup();
      }, 1000);
    } else if (prueba !== null) {
      if (prueba.test.idPatient === patient.id) {
        setLoading(false);
      }
    }
  }, [prueba, test]);

  const testSetup = () => {
    let data = {
      ...prueba,
      ...prueba.setttings,
      ...prueba.test,
      idTestType: prueba.test.type,
      order: order + 1,
    };
    data.idPatient = patient.id;
    delete data.settings;
    delete data.test;
    PruebasService.postPrueba(data).then((res) => {
      let current = res.data.data;
      testSetupCallback();
    });
  };

  const buildUrl = () => {
    let url = `http://localhost:3000/${test.testType.handle}?idTest=${test.id}&token=${test.token}`;
    return url;
  };

  const renderTest = () => {
    if (test && test !== null && prueba !== null && loading === false) {
      return (
        <iframe
          src={buildUrl()}
          width="100%"
          className="vh-100 overflow-hidden"
        />
      );
    }
    return <div className="spinner-border"></div>;
  };

  return <div className="text-center">{renderTest()}</div>;
};

export default SingleTestRun;
