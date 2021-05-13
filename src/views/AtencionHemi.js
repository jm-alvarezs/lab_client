import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { PruebasContext } from "../context/PruebasContext";
import { navigate } from "@reach/router";
import UsuarioService from "../services/UsuarioService";
import { ModalContext } from "../context/ModalContext";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const defaultConfig = {
  idTestType: 2,
  tiempoExposicion: 500,
  tiempoInterestimular: 500,
  target: "O",
  fontFamily: "Courier",
  fontStyle: "Normal",
  fontSize: 24,
  color: "#fff",
  backgroundColor: "#000",
  keyCode: "13",
  duracion: 10,
  radioFijacion: 20,
  colorFijacion: "#fff",
  estimulosQ1: 50,
  estimulosQ2: 50,
  estimulosQ3: 50,
  estimulosQ4: 50,
  aparicionQ1: 17,
  aparicionQ2: 17,
  aparicionQ3: 17,
  aparicionQ4: 17,
  idPatient: "",
};

const styleProperties = [
  "fontFamily",
  "fontStyle",
  "color",
  "fontSize",
  "backgroundColor",
];

const AtencionHemi = () => {
  const [displayQ1, setDisplayQ1] = useState("");
  const [displayQ2, setDisplayQ2] = useState("");
  const [displayQ3, setDisplayQ3] = useState("");
  const [displayQ4, setDisplayQ4] = useState("");
  const [started, setStarted] = useState(false);
  const [config, setConfig] = useState({});
  const [styleObject, setStyleObject] = useState({});
  const [thankyou, setThankyou] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { alert } = useContext(ModalContext);

  const { prueba, getPrueba, postResultados } = useContext(PruebasContext);

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
    getPrueba(idTest, token);
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
    if (prueba !== null) {
      if (prueba.results.config) {
        setDisabled(true);
        return alert("Lo sentimos, este ejercicio ya fue realizado.");
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

  const getCharacterArray = (target, aparicion, total) => {
    let max = aparicion * total;
    let charTargets = [];
    for (let i = 0; i < max; i++) {
      charTargets.push(target);
    }
    for (let i = max; i < total; i++) {
      let current = Math.floor(Math.random() * characters.length) + 1;
      let currentTarget = characters[current];
      charTargets.push(currentTarget);
    }
    charTargets = shuffle(charTargets);
    return charTargets;
  };

  const start = () => {
    setStarted(true);
    getStyle();
    document.body.addEventListener("keydown", handleKey);
    startTime = moment();
    const porcAparicionQ1 = config.aparicionQ1 / 100;
    const porcAparicionQ2 = config.aparicionQ2 / 100;
    const porcAparicionQ3 = config.aparicionQ3 / 100;
    const porcAparicionQ4 = config.aparicionQ4 / 100;
    let charTargetsQ1 = getCharacterArray(
      config.target,
      porcAparicionQ1,
      config.estimulosQ1
    );
    let charTargetsQ2 = getCharacterArray(
      config.target,
      porcAparicionQ2,
      config.estimulosQ2
    );
    let charTargetsQ3 = getCharacterArray(
      config.target,
      porcAparicionQ3,
      config.estimulosQ3
    );
    let charTargetsQ4 = getCharacterArray(
      config.target,
      porcAparicionQ4,
      config.estimulosQ4
    );
    const total =
      config.estimulosQ1 +
      config.estimulosQ2 +
      config.estimulosQ3 +
      config.estimulosQ4;
    console.log(total);
    let intervalo =
      parseInt(config["tiempoInterestimular"]) +
      parseInt(config["tiempoExposicion"]);
    interval = setInterval(() => {
      if (estimulos >= total) {
        endTest();
      } else {
        let cuadrante = Math.floor(Math.random() * 4 + 1);
        let currentTarget = "";
        switch (cuadrante) {
          case 1:
            if (charTargetsQ1.length > 0) {
              currentTarget = charTargetsQ1.shift();
              setDisplayQ1(currentTarget);
              break;
            }
          case 2:
            if (charTargetsQ2.length > 0) {
              currentTarget = charTargetsQ2.shift();
              setDisplayQ2(currentTarget);
              break;
            }
          case 3:
            if (charTargetsQ3.length > 0) {
              currentTarget = charTargetsQ3.shift();
              setDisplayQ3(currentTarget);
              break;
            }
          default:
            if (charTargetsQ4.length > 0) {
              currentTarget = charTargetsQ4.shift();
              setDisplayQ4(currentTarget);
            }
            cuadrante = 4;
        }
        targets.push({
          timestamp: moment(),
          target: currentTarget,
          cuadrante,
        });
        estimulos++;
        setTimeout(() => {
          setDisplayQ1("");
          setDisplayQ2("");
          setDisplayQ3("");
          setDisplayQ4("");
        }, parseInt(config["tiempoExposicion"]));
      }
    }, intervalo);
  };

  const getStyle = () => {
    let current = {};
    styleProperties.forEach((key) => {
      current[key] = config[key];
      if (key === "fontSize") {
        current[key] = parseInt(config[key]);
      }
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
                    letra {config.target}.
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
        <div id="test-container" style={{ ...styleObject, paddingTop: 0 }}>
          <div
            style={{
              position: "absolute",
              top: window.innerHeight / 2 - config.radioFijacion / 2,
              left: window.innerWidth / 2 - config.radioFijacion / 2,
              width: `${config.radioFijacion}px`,
              height: `${config.radioFijacion}px`,
              backgroundColor: config.colorFijacion,
              borderRadius: `${config.radioFijacion * 2}px`,
            }}
          />
          <div className="row vh-50 align-items-center">
            <div className="col-6 h-100">
              <div className="row h-100 align-items-center">
                <div className="container-fluid text-center">{displayQ1}</div>
              </div>
            </div>
            <div className="col-6 h-100">
              <div className="row h-100 align-items-center">
                <div className="container-fluid text-center">{displayQ2}</div>
              </div>
            </div>
          </div>
          <div className="row vh-50 align-items-center">
            <div className="col-6 h-100">
              <div className="row h-100 align-items-center">
                <div className="container-fluid text-center">{displayQ3}</div>
              </div>
            </div>
            <div className="col-6 h-100">
              <div className="row h-100 align-items-center">
                <div className="container-fluid text-center">{displayQ4}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtencionHemi;
