import React, { useContext, useEffect, useState } from "react";
import { PruebasContext } from "../context/PruebasContext";
import { processMultiTestUrl } from "../utils";
import AtencionCondicional from "./AtencionCondicional";
import AtencionHemi from "./AtencionHemi";
import AtencionSimple from "./AtencionSimple";
import FlankerTask from "./FlankerTask";
import TorreHanoi from "./TorreHanoi";

const MultiTest = () => {
  const [currentTest, setCurrentTest] = useState({});

  const { prueba, getPrueba } = useContext(PruebasContext);

  useEffect(() => {
    let { tests, tokens } = processMultiTestUrl(window.location.href);
    setCurrentTest({ idTest: tests[0], token: tokens[0] });
  }, []);

  useEffect(() => {
    if (currentTest.idTest) {
      const { idTest, token } = currentTest;
      getPrueba(idTest, token);
    }
  }, [currentTest]);

  const renderTest = () => {
    if (prueba && prueba !== null) {
      let idTestType = prueba.test.type;
      switch (idTestType) {
        case 1:
          return <AtencionSimple />;
        case 2:
          return <AtencionCondicional />;
        case 3:
          return <AtencionHemi />;
        case 4:
          return <TorreHanoi />;
        default:
          return <FlankerTask />;
      }
    }
    return <div className="spinner-border"></div>;
  };

  return <div className="container-fluid px-0">{renderTest()}</div>;
};

export default MultiTest;
