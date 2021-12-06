import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { PruebasContext } from "../context/PruebasContext";
import { navigate } from "@reach/router";
import UsuarioService from "../services/UsuarioService";
import { ModalContext } from "../context/ModalContext";
import { getConfig } from "../utils";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const charactersExclude = (target, clave) => {
  characters.replace(target, "");
  characters.replace(clave, "");
  return characters;
};

const defaultConfig = {
  idTestType: 2,
  tiempoExposicion: "500",
  tiempoInterestimular: "500",
  target: "O",
  fontFamily: "Courier",
  fontStyle: "Normal",
  fontSize: "100",
  color: "#000000",
  backgroundColor: "#cccccc",
  clave: "X",
  claveTarget: "37",
  noClaveTarget: "19",
  claveNoTarget: "19",
  noClaveNoTarget: "75",
  paresTotales: "300",
  keyCode: "13",
  duracion: "10",
  idPatient: "",
};

const styleProperties = [
  "fontFamily",
  "fontStyle",
  "color",
  "fontSize",
  "backgroundColor",
];

const AtencionCondicional = () => {
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);
  const [config, setConfig] = useState({});
  const [styleObject, setStyleObject] = useState({});
  const [thankyou, setThankyou] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { alert } = useContext(ModalContext);

  const { prueba, clearPrueba, postResultados } = useContext(PruebasContext);

  let targets = [];
  let estimulos = 0;

  let startTime = null;
  let endTime = null;

  let interval = null;

  useEffect(() => {
    if (prueba === null) {
      const currentConfig = getConfig(defaultConfig);
      if (!currentConfig.token) {
        setDisabled(true);
        return alert("No se puede iniciar la prueba");
      }
      UsuarioService.setToken(currentConfig.token);
      if (!currentConfig.idTest) return navigate("/");
      setConfig(currentConfig);
    }
    return clearPrueba;
  }, []);

  useEffect(() => {
    if (prueba !== null) {
      if (prueba.settings) {
        let token = window.location.href.split("token=")[1];
        if (!token) {
          setDisabled(true);
          return alert("No se puede iniciar la prueba");
        }
        token = token.split("&")[0];
        setConfig({ ...prueba.settings, token });
      }
    }
  }, [prueba]);

  useEffect(() => {
    if (thankyou) {
      setTimeout(() => {
        setThankyou(false);
      }, 5000);
    }
  }, [thankyou]);

  useEffect(() => {
    getStyle();
  }, [config]);

  const handleKey = (e) => {
    let currentTarget = targets[estimulos - 1];
    if (currentTarget) {
      currentTarget.clicked = moment();
      currentTarget.character = String.fromCharCode(e.keyCode);
    }
  };

  const endTest = () => {
    endTime = moment();
    clearInterval(interval);
    setStarted(false);
    estimulos = 0;
    const result = {
      start: startTime,
      end: endTime,
      targets,
      target: config.target,
      finished: true,
      idTest: config.idTest,
      token: config.token,
      idPatient: config.idPatient,
      config: 1,
    };
    postResultados(result);
    setThankyou(true);
  };

  const start = () => {
    setStarted(true);
    getStyle();
    document.body.addEventListener("keydown", handleKey);
    startTime = moment();
    let claveTarget = [];
    for (let i = 0; i < parseInt(config.claveTarget); i++) {
      claveTarget.push(config.clave);
      claveTarget.push(config.target);
    }
    let claveNoTarget = [];
    for (let i = 0; i < parseInt(config.claveNoTarget); i++) {
      claveNoTarget.push(config.clave);
      let current = Math.floor(Math.random() * characters.length);
      let currentTarget = charactersExclude(config.target, config.clave)[
        current
      ];
      claveNoTarget.push(currentTarget);
    }
    let noClaveTarget = [];
    for (let i = 0; i < parseInt(config.noClaveTarget); i++) {
      let current = Math.floor(Math.random() * characters.length);
      let currentTarget = charactersExclude(config.target, config.clave)[
        current
      ];
      noClaveTarget.push(currentTarget);
      noClaveTarget.push(config.target);
    }
    let noClaveNoTarget = [];
    for (let i = 0; i < parseInt(config.noClaveNoTarget); i++) {
      let current = Math.floor(Math.random() * characters.length);
      let currentTarget = charactersExclude(config.target, config.clave)[
        current
      ];
      noClaveNoTarget.push(currentTarget);
      current = Math.floor(Math.random() * characters.length);
      currentTarget = charactersExclude(config.target, config.clave)[current];
      noClaveNoTarget.push(currentTarget);
    }
    let total =
      (parseInt(config.claveTarget) +
        parseInt(config.claveNoTarget) +
        parseInt(config.noClaveTarget) +
        parseInt(config.noClaveNoTarget)) *
      2;
    while (targets.length < total) {
      let cuadrante = Math.floor(Math.random() * 4);
      let currentTarget = "";
      let nextTarget = "";
      switch (cuadrante) {
        case 1:
          if (claveTarget.length > 0) {
            currentTarget = claveTarget.shift();
            nextTarget = claveTarget.shift();
            break;
          }
        case 2:
          if (claveNoTarget.length > 0) {
            currentTarget = claveNoTarget.shift();
            nextTarget = claveNoTarget.shift();
            break;
          }
        case 3:
          if (noClaveTarget.length > 0) {
            currentTarget = noClaveTarget.shift();
            nextTarget = noClaveTarget.shift();
            break;
          }
        default:
          if (noClaveNoTarget.length > 0) {
            currentTarget = noClaveNoTarget.shift();
            nextTarget = noClaveNoTarget.shift();
          }
      }
      if (currentTarget && currentTarget !== "") {
        targets.push({ target: currentTarget });
        targets.push({ target: nextTarget });
      }
    }
    let intervalo =
      parseInt(config["tiempoInterestimular"]) +
      parseInt(config["tiempoExposicion"]);
    window.onbeforeunload = (e) => {
      endTest();
    };
    interval = setInterval(() => {
      if (estimulos >= total) {
        endTest();
      } else {
        setTimeout(() => {
          setDisplay("");
        }, parseInt(config["tiempoExposicion"]));
        setDisplay(targets[estimulos].target);
        targets[estimulos].timestamp = moment();
        estimulos++;
      }
    }, intervalo);
  };

  const getStyle = () => {
    let current = {};
    styleProperties.forEach((key) => {
      current[key] = config[key];
    });
    setStyleObject(current);
  };

  const getTecla = () => {
    if (config.keyCode === "any") return "cualquier tecla";
    return `${config.keyCode === "13" ? "Intro" : "Espacio"}`;
  };

  return (
    <div className="container-fluid">
      {!started ? (
        <div className="row">
          <div className="col col-md-6 border-right shadow bg-light">
            <div className="row align-items-center vh-100">
              {!thankyou ? (
                <div className="p-5">
                  <h1>Bienvenido</h1>
                  <p className="instrucciones">
                    A continuación realizarás un ejercicio.
                  </p>
                  <h3>Instrucciones</h3>
                  <p className="instrucciones">
                    En el centro de la pantalla irán apareciendo de manera
                    secuencial distintas letras del abecedario. La tarea
                    consiste que usted pulse la tecla “{getTecla()}” cuando vea
                    aparecer la letra {config.target}, siempre y cuando la letra
                    O esté precedido por la letra {config.clave}.
                  </p>
                  <p className="instrucciones">
                    Es importante que responda tan rápido como pueda, ya que los
                    estímulos aparecen y desaparecen rápidamente.
                  </p>
                  <button
                    className="btn btn-dark"
                    onClick={start}
                    disabled={disabled}
                  >
                    Comenzar
                  </button>
                </div>
              ) : (
                <div className="p-5">
                  <h1>¡Gracias!</h1>
                  <p className="instrucciones">Has completado el ejercicio.</p>
                </div>
              )}
            </div>
          </div>
          <div className="col col-md-6 px-0">
            <img
              src="https://www.udem.edu.mx/sites/default/files/inline-images/Entropia-UDEM.jpg"
              className="half-image"
            />
          </div>
        </div>
      ) : (
        <div id="test-container" style={styleObject}>
          {display}
        </div>
      )}
    </div>
  );
};

export default AtencionCondicional;
