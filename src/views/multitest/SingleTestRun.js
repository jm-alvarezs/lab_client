import React, { useContext, useEffect, useState } from "react";
import { PruebasContext } from "../../context/PruebasContext";
import PruebasService from "../../services/PruebasService";
import UsuarioService from "../../services/UsuarioService";
import AtencionCondicional from "../AtencionCondicional";
import AtencionHemi from "../AtencionHemi";
import AtencionSimple from "../AtencionSimple";
import StroopTest from "../tests/stroop/StroopTest";
import TorreHanoi from "../TorreHanoi";

const SingleTestRun = ({
  test,
  order,
  patient,
  endCallback,
  testSetupCallback,
}) => {
  const [loading, setLoading] = useState(false);
  const { prueba, getPrueba } = useContext(PruebasContext);

  useEffect(() => {
    if (test && test !== null) {
      getPrueba(test.id, test.accessUrl.token);
    }
  }, [test]);

  useEffect(() => {
    if (prueba !== null && prueba.test.idPatient !== patient.id && !loading) {
      console.log("test setup");
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
      ...prueba.settings,
      ...prueba.test,
      idTestType: prueba.test.type,
      order: order + 1,
    };
    data.idPatient = patient.id;
    delete data.settings;
    delete data.test;
    let accessUrl = prueba.test.accessUrl;
    let token = accessUrl.token;
    UsuarioService.setToken(token);
    PruebasService.postPrueba(data).then((res) => {
      testSetupCallback();
    });
  };

  const renderTest = () => {
    if (test && test !== null && prueba !== null && loading === false) {
      switch (test.type) {
        case 1:
          return <AtencionSimple endCallback={endCallback} />;
        case 2:
          return <AtencionCondicional endCallback={endCallback} />;
        case 3:
          return <AtencionHemi endCallback={endCallback} />;
        case 4:
          return <TorreHanoi endCallback={endCallback} />;
        case 6:
          return <StroopTest endCallback={endCallback} />;
      }
    }
    return (
      <div className="row align-items-center vh-100">
        <div className="container-fluid text-center">
          <div className="spinner-border"></div>
          <p className="mt-3">
            Espera un momento mientras cargamos tu ejercicio.
          </p>
        </div>
      </div>
    );
  };

  return <div>{renderTest()}</div>;
};

export default SingleTestRun;
