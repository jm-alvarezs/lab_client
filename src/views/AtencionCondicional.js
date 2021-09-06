import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { PruebasContext } from "../context/PruebasContext";
import { navigate } from "@reach/router";
import UsuarioService from "../services/UsuarioService";
import { ModalContext } from "../context/ModalContext";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const defaultConfig = {
  idTestType: 2,
  tiempoExposicion: "500",
  tiempoInterestimular: "500",
  target: "O",
  fontFamily: "Courier",
  fontStyle: "Normal",
  fontSize: "24",
  color: "#fff",
  backgroundColor: "#000",
  clave: "X",
  claveTarget: "37",
  noClaveTarget: "19",
  claveNoTarget: "19",
  noClaveNoTarget: "75",
  paresTotales: "150",
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

  const { postResultados } = useContext(PruebasContext);

  let targets = [];
  let estimulos = 0;

  let startTime = null;
  let endTime = null;

  let interval = null;

  useEffect(() => {
    let token = window.location.href.split("token=")[1];
    if (!token) {
      setDisabled(true);
      return alert("No se puede iniciar la prueba");
    }
    token = token.split("&")[0];
    UsuarioService.setToken(token);
    let idTest = window.location.href.split("idTest=")[1];
    if (!idTest) return navigate("/");
    idTest = parseInt(idTest.split("&")[0]);
    let params = window.location.href.split("?")[1];
    let currentConfig = { ...defaultConfig };
    if (params) {
      params = params.split("&");
      params.forEach((elem) => {
        const single = elem.split("=");
        currentConfig[single[0]] = single[1];
      });
    } else {
      currentConfig = defaultConfig;
    }
    setConfig(currentConfig);
  }, []);

  useEffect(() => {
    if (thankyou) {
      setTimeout(() => {
        setThankyou(false);
      }, 5000);
    }
  }, [thankyou]);

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const handleKey = (e) => {
    let currentTarget = targets[targets.length - 1];
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
    for (let i = 0; i < parseInt(config.claveTarget); i++) {
      claveNoTarget.push(config.clave);
      let current = Math.floor(Math.random() * characters.length) + 1;
      let currentTarget = characters[current];
      claveNoTarget.push(currentTarget);
    }
    let noClaveTarget = [];
    for (let i = 0; i < parseInt(config.claveTarget); i++) {
      let current = Math.floor(Math.random() * characters.length) + 1;
      let currentTarget = characters[current];
      noClaveTarget.push(currentTarget);
      noClaveTarget.push(config.target);
    }
    let noClaveNoTarget = [];
    for (let i = 0; i < parseInt(config.claveTarget); i++) {
      let current = Math.floor(Math.random() * characters.length) + 1;
      let currentTarget = characters[current];
      noClaveNoTarget.push(currentTarget);
      current = Math.floor(Math.random() * characters.length) + 1;
      currentTarget = characters[current];
      noClaveNoTarget.push(currentTarget);
    }
    let intervalo =
      parseInt(config["tiempoInterestimular"]) +
      parseInt(config["tiempoExposicion"]);
    window.onbeforeunload = (e) => {
      endTest();
    };
    interval = setInterval(() => {
      if (estimulos >= config["estimulos"]) {
        endTest();
      } else {
        let cuadrante = Math.floor(Math.random() * 4 + 1);
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
        setTimeout(() => {
          setDisplay("");
        }, parseInt(config["tiempoExposicion"]));
        setTimeout(() => {
          setDisplay(nextTarget);
          estimulos++;
        }, intervalo);
        estimulos++;
      }
    }, intervalo * 2);
  };

  const getStyle = () => {
    let current = {};
    styleProperties.forEach((key) => {
      current[key] = config[key];
    });
    setStyleObject(current);
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
                  <p>A continuación realizarás un ejercicio.</p>
                  <h3>Instrucciones</h3>
                  <p>
                    En el centro de la pantalla irán apareciendo de manera
                    secuencial distintas letras del abecedario. La tarea
                    consiste que usted pulse la tecla{" "}
                    {String.fromCharCode(config.keyCode)} cuando vea aparecer la
                    letra {config.target}, siempre y cuando el caracter esté
                    precedido por el caracter {config.clave}.
                  </p>
                  <p>
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
                  <p>Haz completado el ejercicio.</p>
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
