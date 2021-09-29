import React, { useState, useEffect, useContext } from "react";
import { shuffle } from "../utils";
import { getEstimulosFlanker } from "../functions/flanker";
import { PruebasContext } from "../context/PruebasContext";
import { EstimuloFlanker } from "../components/flanker/EstimuloFlanker";
import BaseTest from "./BaseTest";
import moment from "moment";
import flanker from "../assets/images/flanker.png";

const instrucciones = ({ leftKey, rightKey }) => [
  <p className="instrucciones">
    A continuación, vas a realizar un juego. En la pantalla vas a ver 5 flechas,
    tu tarea es fijarte en la dirección en la que apunta la flecha que se
    encuentra en medio.
  </p>,
  <img src={flanker} className="mw-50 w-50 m-auto d-block" />,
  <p className="instrucciones">
    Si la flecha va hacia la derecha vas a presionar la tecla “{rightKey}” y si
    va hacia la izquierda vas a presionar la tecla “{leftKey}”.
  </p>,
  <p className="instrucciones">Presiona “Comenzar” para iniciar la prueba.</p>,
];

const FlankerTask = () => {
  const [fijacion, setFijacion] = useState(false);
  const [ended, setEnded] = useState(false);
  const [EstimuloSuperior, setEstimuloSuperior] = useState(null);
  const [EstimuloInferior, setEstimuloInferior] = useState(null);

  const cruz = 800;
  const estimulo = 1800;
  const blanco = 1200;

  let timeoutFijacion = null;

  const {
    config,
    prueba,
    current,
    fila,
    popEstimulo,
    setFila,
    setPropiedadEstimulo,
  } = useContext(PruebasContext);

  const defaultConfig = {
    idTestType: 5,
    estimulosEntrenamiento: 8,
    estimulosPrueba: 48,
    fontSize: 100,
    color: "#000000",
    backgroundColor: "#cccccc",
    leftKey: "A",
    rightKey: "L",
  };

  useEffect(() => {
    if (fijacion) {
      popEstimulo();
    }
  }, [fijacion]);

  useEffect(() => {
    if (current && fijacion && timeoutFijacion === null) {
      timeoutFijacion = setTimeout(() => {
        setFijacion(false);
        sigEstimulo();
      }, cruz);
    }
  }, [current]);

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
    document.body.addEventListener("keypress", handleKeyPress);
    let estimulosPrueba = getEstimulosFlanker(config.estimulosPrueba);
    estimulosPrueba = shuffle(estimulosPrueba);
    setFila(estimulosPrueba);
    setFijacion(true);
  };

  const handleKeyPress = (e) => {
    const clicked = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
    const pressed = String.fromCharCode(e.charCode);
    if (!current.clicked) {
      setPropiedadEstimulo("clicked", clicked);
      setPropiedadEstimulo("char", pressed);
    }
  };

  const sigEstimulo = () => {
    if (fila.length === 0) {
      return setEnded(true);
    }
    let service;
    if (current.position === "top") {
      service = setEstimuloInferior;
    } else {
      service = setEstimuloSuperior;
    }
    service(<EstimuloFlanker {...current} style={config} />);
  };

  const renderFlanker = () => {
    return (
      <div
        className="container-fluid vh-100 overflow-hidden"
        style={{ backgroundColor: config.backgroundColor }}
      >
        <div className="container">
          <div
            className="row vh-25 mt-25vh align-items-center"
            style={{ ...config }}
          >
            <div className="container-fluid text-center">
              {EstimuloSuperior}
            </div>
          </div>
          <div
            className="row vh-25 mb-25vh align-items-center"
            style={{ ...config }}
          >
            {EstimuloInferior}
          </div>
        </div>
        {fijacion && typeof current === "object" ? (
          <i
            id="cruz-flanker"
            className="fas fa-plus"
            style={{ color: config.color }}
          ></i>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <BaseTest
      ended={ended}
      startCallback={handleStart}
      defaultConfig={prueba !== null ? prueba.settings : defaultConfig}
      instrucciones={instrucciones(
        prueba !== null ? { ...prueba.settings } : { ...defaultConfig }
      )}
      TestComponent={renderFlanker()}
    />
  );
};

export default FlankerTask;
