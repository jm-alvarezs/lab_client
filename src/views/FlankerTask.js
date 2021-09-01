import React, { useState, useEffect, useContext } from "react";
import { getConfig, getEstimulosFlanker, shuffle } from "../utils";
import moment from "moment";
import { PruebasContext } from "../context/PruebasContext";
import { ModalContext } from "../context/ModalContext";
import InterScreen from "../components/pruebas/InterScreen";
import { EstimuloFlanker } from "../components/flanker/EstimuloFlanker";

const FlankerTask = () => {
  const [config, setConfig] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [fijacion, setFijacion] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [finishTime, setFinishTime] = useState(null);
  const [EstimuloSuperior, setEstimuloSuperior] = useState(null);
  const [EstimuloInferior, setEstimuloInferior] = useState(null);

  const cruz = 800;
  const estimulo = 1800;
  const blanco = 1200;

  const {
    estimulos,
    getPrueba,
    movimientos,
    currentMove,
    popEstimulo,
    setEstimulos,
    postResultados,
    setPropiedadMovimiento,
  } = useContext(PruebasContext);

  const { alert } = useContext(ModalContext);

  const defaultConfig = {
    idTestType: 5,
    estimulosEntrenamiento: 8,
    estimulosPrueba: 48,
    fontSize: 24,
    color: "#000",
    backgroundColor: "#fff",
    leftKey: "A",
    rightKey: "L",
  };

  useEffect(() => {
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
    console.log(fijacion);
    if (fijacion) {
      setTimeout(() => {
        setFijacion(false);
        sigEstimulo();
      }, cruz);
    }
  }, [fijacion]);

  useEffect(() => {
    if (EstimuloInferior !== null) {
      setTimeout(() => {
        setEstimuloInferior(null);
      }, estimulo);
      setTimeout(() => {
        setFijacion(true);
      }, estimulo + blanco);
    }
  }, [EstimuloInferior]);

  useEffect(() => {
    if (EstimuloSuperior !== null) {
      setTimeout(() => {
        setEstimuloSuperior(null);
      }, estimulo);
      setTimeout(() => {
        setFijacion(true);
      }, estimulo + blanco);
    }
  }, [EstimuloSuperior]);

  const handleStart = () => {
    setStartTime(moment().format("YYYY-MM-DD HH:mm:ss:SSS"));
    setTimeout(() => {
      const input = document.getElementById("input-hidden");
      if (input !== null) {
        input.focus();
      }
      let estimulosPrueba = getEstimulosFlanker(config.estimulosPrueba);
      estimulosPrueba = shuffle(estimulosPrueba);
      setEstimulos(estimulosPrueba);
      setFijacion(true);
    }, 1000);
  };

  const handleEnd = (finished) => {
    const endTime = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
    setFinishTime(endTime);
    console.log(movimientos);
    const result = {
      start: startTime,
      end: endTime,
      finished,
      idTest: config.idTest,
      idPatient: config.idPatient,
      config: config.id,
      token: config.token,
      estimulos: movimientos,
    };
    postResultados(result);
  };

  const handleKeyPress = (e) => {
    const clicked = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
    const pressed = String.fromCharCode(e.charCode);
    setPropiedadMovimiento("char", pressed);
    setPropiedadMovimiento("clicked", clicked);
  };

  const sigEstimulo = () => {
    popEstimulo();
    if (estimulos.length === 0) {
      return handleEnd(true);
    }
    let service;
    if (currentMove.position === "top") {
      service = setEstimuloInferior;
    } else {
      service = setEstimuloSuperior;
    }
    service(<EstimuloFlanker {...currentMove} style={config} />);
  };

  const renderFlanker = () => {
    return (
      <div className="container">
        <div className="row vh-50 align-items-center">
          <div className="container-fluid text-center">{EstimuloSuperior}</div>
        </div>
        <div className="row vh-50 align-items-center">{EstimuloInferior}</div>
        {fijacion ? <i id="cruz-flanker" className="fas fa-plus"></i> : ""}
        <input id="input-hidden" type="text" onKeyPress={handleKeyPress} />
      </div>
    );
  };

  return (
    <div>
      {startTime === null || finishTime !== null ? (
        <InterScreen
          start={handleStart}
          thankyou={finishTime !== null}
          disabled={disabled}
        />
      ) : (
        renderFlanker()
      )}
    </div>
  );
};

export default FlankerTask;
