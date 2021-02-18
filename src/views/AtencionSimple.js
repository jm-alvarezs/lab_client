import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { PruebasContext } from "../context/PruebasContext";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const defaultConfig = {
  tiempoExposicion: 500,
  tiempoInterestimular: 500,
  target: "O",
  fontFamily: "Courier",
  fontStyle: "bold",
  color: "#fff",
  fontSize: 85,
  backgroundColor: "#000",
  estimulos: 10,
  aparicion: 17,
  keyCode: 32,
  duration: 5 * 60,
};

const styleProperties = [
  "fontFamily",
  "fontStyle",
  "color",
  "fontSize",
  "backgroundColor",
];

const AtencionSimple = () => {
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);
  const [config, setConfig] = useState({});
  const [styleObject, setStyleObject] = useState({});
  const [thankyou, setThankyou] = useState(false);

  const { postResultados } = useContext(PruebasContext);

  let targets = [];
  let estimulos = 0;

  let startTime = null;
  let endTime = null;

  let interval = null;

  useEffect(() => {
    let params = window.location.href.split("?")[1];
    let currentConfig = {};
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

  const handleKey = (e) => {
    targets[targets.length - 1].clicked = moment();
    targets[targets.length - 1].character = String.fromCharCode(e.keyCode);
  };

  const endTest = () => {
    endTime = moment();
    clearInterval(interval);
    setStarted(false);
    estimulos = 0;
    const result = {
      startTime,
      endTime,
      targets,
      finished: true,
    };
    console.log(result);
    postResultados(result);
    setThankyou(true);
  };

  const start = () => {
    setStarted(true);
    getStyle();
    document.body.addEventListener("keydown", handleKey);
    startTime = moment();
    let currentTarget = "";
    interval = setInterval(() => {
      if (estimulos >= config["estimulos"]) {
        endTest();
      } else {
        let current = Math.random().toFixed(2);
        if (config["aparicion"] && current <= 1 / config["aparicion"]) {
          currentTarget = config["target"];
        } else {
          current = Math.floor(Math.random() * characters.length) + 1;
          currentTarget = characters[current];
        }
        setDisplay(currentTarget);
        targets.push({
          timestamp: moment(),
          target: currentTarget,
        });
        estimulos++;
        setTimeout(() => {
          setDisplay("");
        }, config["tiempoExposicion"]);
      }
    }, config["tiempoInterestimular"] + config["tiempoExposicion"]);
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
                    letra {config.target}.
                  </p>
                  <p>
                    Es importante que responda tan rápido como pueda, ya que los
                    estímulos aparecen y desaparecen rápidamente.
                  </p>
                  <button className="btn btn-primary" onClick={start}>
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
              src="https://images.unsplash.com/photo-1612967302509-244bef8964c2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80"
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

export default AtencionSimple;
