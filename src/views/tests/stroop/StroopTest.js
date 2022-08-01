import React, { useState, useContext, useEffect } from "react";
import { PruebasContext } from "../../../context/PruebasContext";
import { shuffle } from "../../../utils";
import BaseTest from "../../BaseTest";
import moment from "moment";
import "./stroop.css";

const defaultConfig = {
  idTestType: 6,
  tiempoInterestimular: "1000",
  fontFamily: "Courier",
  fontStyle: "Normal",
  fontSize: "100",
  backgroundColor: "#000",
  numeroEstimulos: "48",
  coherencia: "50",
};

const styleProperties = [
  "fontFamily",
  "fontStyle",
  "color",
  "fontSize",
  "backgroundColor",
];

const StroopTest = ({ endCallback }) => {
  const [ended, setEnded] = useState(false);
  const [display, setDisplay] = useState("");
  const [config, setConfig] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [styleObject, setStyleObject] = useState({});

  const {
    current,
    estimulos,
    popEstimulo,
    setEstimulos,
    setPropiedadEstimulo,
  } = useContext(PruebasContext);

  useEffect(() => {
    if (Array.isArray(estimulos)) {
      //Terminar cuando todos los estimulos se han completado
      if (parseInt(estimulos.length) === parseInt(config.numeroEstimulos)) {
        setEnded(true);
      }
    }
  }, [estimulos]);

  useEffect(() => {
    if (!disabled && typeof current === "object" && display === "") {
      //Mostrar estimulo en pantalla
      setDisplay(
        <span
          className={`text-uppercase stroop-target target-${current.display}`}
        >
          {current.target}
        </span>
      );
    }
  }, [current]);

  const handleClick = (color) => {
    //Mostrar pantalla vacía
    setDisplay("");
    //No permitir otro click
    setDisabled(true);
    //Obtener momento que se dio click
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss.SSS");
    //Agregar tiempo y color presionado
    setPropiedadEstimulo("clicked", color);
    setPropiedadEstimulo("timestamp", timestamp);
    //Esperar para mostrar estimulo en pantalla
    setTimeout(() => {
      //Permitir click de botón
      setDisabled(false);
      popEstimulo();
    }, config.tiempoInterestimular);
  };

  const start = (config) => {
    //Construir display con la configuración
    setConfig(config);
    getStyle(config);
    let elements = [];
    //Porcentaje de estimulos coherentes
    const porcAparicion = parseFloat(config.coherencia) / 100;
    //Número de estimulos coherentes
    const coherentes = Math.ceil(config.numeroEstimulos * porcAparicion);
    const incoherentes = config.numeroEstimulos - coherentes;
    //Colores a utilizar
    const options = ["rojo", "verde", "azul"];
    //Construir todos los estimulos coherentes
    for (let i = 0; i < coherentes; i++) {
      const color = i % options.length;
      elements.push({
        type: "congruente",
        target: options[color],
        display: options[color],
      });
    }
    //Construir todos los estimulos incoherentes
    for (let i = 0; i < incoherentes; i++) {
      const color = i % options.length;
      //Eliminar color utilizado de las opciones iniciales
      const indexes = [0, 1, 2];
      indexes.splice(color, 1);
      const index = Math.floor(Math.random() * 2);
      //Obtener color incoherente
      const secondColor = indexes[index];
      elements.push({
        type: "incongruente",
        target: options[color],
        display: options[secondColor],
      });
    }
    //Mezclar estimulos para orden aleatorio
    elements = shuffle(elements);
    //Agregar indice
    elements = elements.map((element, index) => ({ ...element, index }));
    //Llevarlos al context para uso en prueba
    setEstimulos(elements);
    //Tomar primer estimulo
    popEstimulo();
  };

  //Aplicar estilos de configuración
  const getStyle = (config) => {
    let current = {};
    styleProperties.forEach((key) => {
      current[key] = config[key];
      if (key === "fontSize") {
        current[key] = parseInt(config[key]);
      }
    });
    setStyleObject(current);
  };

  const renderInstrucciones = () => {
    return [
      <p className="instrucciones">
        En el centro de la pantalla irán apareciendo los nombres de los colores:
        rojo, azul o verde de forma aleatoria. La tarea consiste en que usted
        señale en la pantalla con su cursor el color con el que está escrita la
        palabra que aparece en pantalla, ignorando su significado.
      </p>,
      <p>
        Es importante que responda tan rápido como pueda, ya que los estímulos
        aparecen y desaparecen rápidamente.
      </p>,
    ];
  };

  //Objeto de prueba de stroop con 3 botones y display
  const renderStroop = () => {
    return (
      <div className="container-fluid">
        <div id="test-container" style={{ ...styleObject }}>
          <div className="container">
            <div className="stroop-container">{display}</div>
            <div className="row">
              <div className="col-4">
                <button
                  className="btn btn-danger stroop-btn w-100"
                  onClick={() => handleClick("rojo")}
                  disabled={display === ""}
                ></button>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-success stroop-btn w-100"
                  onClick={() => handleClick("verde")}
                  disabled={display === ""}
                ></button>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-primary stroop-btn w-100"
                  onClick={() => handleClick("azul")}
                  disabled={display === ""}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <BaseTest
      ended={ended}
      startCallback={start}
      endCallback={endCallback}
      defaultConfig={defaultConfig}
      TestComponent={renderStroop()}
      instrucciones={renderInstrucciones()}
    />
  );
};

export default StroopTest;
