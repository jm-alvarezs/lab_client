import React, { useState, useEffect, useContext } from "react";
import { getConfig } from "../utils";
import moment from "moment";
import { PruebasContext } from "../context/PruebasContext";
import { ModalContext } from "../context/ModalContext";
import InterScreen from "../components/pruebas/InterScreen";

const BaseTest = ({
  ended,
  instrucciones,
  TestComponent,
  defaultConfig,
  startCallback,
}) => {
  const [disabled, setDisabled] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [finishTime, setFinishTime] = useState(null);

  const { prueba, config, estimulos, getPrueba, setConfig, postResultados } =
    useContext(PruebasContext);

  const { alert } = useContext(ModalContext);

  useEffect(() => {
    window.onbeforeunload = (e) => {
      handleEnd(false);
    };
    let currentConfig = getConfig(defaultConfig);

    if (currentConfig.idTest && currentConfig.token) {
      getPrueba(currentConfig.idTest, currentConfig.token);
      setConfig(currentConfig);
      setDisabled(false);
    } else {
      alert(
        "El enlace del ejercicio es incorrecto. Contacta al profesional que te lo envió."
      );
    }
  }, []);

  useEffect(() => {
    if (ended) {
      handleEnd(ended);
    }
  }, [ended]);

  useEffect(() => {
    if (prueba !== null) {
      if (prueba.results) {
        if (prueba.results._id) {
          setDisabled(true);
        }
      }
    }
  }, [prueba]);

  const handleStart = () => {
    setStartTime(moment().format("YYYY-MM-DD HH:mm:ss:SSS"));
    if (typeof startCallback === "function") {
      startCallback();
    }
  };

  const handleEnd = (finished) => {
    const endTime = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
    setFinishTime(endTime);
    const device = navigator.userAgent;
    const result = {
      startTime: startTime,
      endTime: endTime,
      ...config,
      estimulos,
      finished,
      device,
    };
    postResultados(result);
  };

  return (
    <div>
      {startTime === null || finishTime !== null ? (
        <InterScreen
          start={handleStart}
          thankyou={finishTime !== null}
          disabled={disabled}
          instrucciones={instrucciones}
        />
      ) : (
        TestComponent
      )}
    </div>
  );
};

export default BaseTest;
