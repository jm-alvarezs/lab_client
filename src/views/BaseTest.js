import React, { useState, useEffect, useContext } from "react";
import { getConfig } from "../utils";
import moment from "moment";
import { PruebasContext } from "../context/PruebasContext";
import { ModalContext } from "../context/ModalContext";
import InterScreen from "../components/pruebas/InterScreen";

/**
 * Componente General de Prueba
 * Muestra instrucciones y pantalla de gracias
 * Sube resultados a Back End
 * @param {*} TestComponent: El componente de prueba específico
 * @param {*} startCallback: Función que se llama al inicar prueba
 * @param {*} endCallback: Función para pasar a siguiente ejercicio
 * @returns
 */

const BaseTest = ({
  ended,
  instrucciones,
  TestComponent,
  defaultConfig,
  startCallback,
  endCallback,
}) => {
  const [disabled, setDisabled] = useState(false);
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
    //Construir prueba usando el token
    if (currentConfig.idTest && currentConfig.token && prueba === null) {
      getPrueba(currentConfig.idTest, currentConfig.token);
      //Agregar configuración de prueba
      setConfig(currentConfig);
      setDisabled(false);
    } else if (prueba === null) {
      setDisabled(true);
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
      if (prueba.settings) {
        setConfig({
          ...defaultConfig,
          ...prueba.settings,
          token: prueba.test.accessUrl.token,
        });
      }
    }
  }, [prueba]);

  const handleStart = () => {
    setStartTime(moment().format("YYYY-MM-DD HH:mm:ss:SSS"));
    if (typeof startCallback === "function") {
      startCallback(config);
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
    //Subir resultados al back end
    postResultados(result);
    if (typeof endCallback === "function") {
      endCallback();
    }
  };

  const renderContent = () => {
    if (startTime === null || finishTime !== null) {
      return (
        <InterScreen
          start={handleStart}
          thankyou={finishTime !== null}
          disabled={disabled}
          instrucciones={instrucciones}
        />
      );
    }
    return TestComponent;
  };

  return <div>{renderContent()}</div>;
};

export default BaseTest;
