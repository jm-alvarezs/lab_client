import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { PruebasContext } from "../context/PruebasContext";
import { navigate } from "@reach/router";
import UsuarioService from "../services/UsuarioService";
import { ModalContext } from "../context/ModalContext";
import InterScreen from "../components/pruebas/InterScreen";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
      target: defaultConfig.target,
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
    let charTargets = [];
    const porcAparicion = defaultConfig.aparicion / 100;
    const numberTargets = Math.ceil(defaultConfig.estimulos * porcAparicion);
    for (let i = 0; i < numberTargets; i++) {
      charTargets.push(defaultConfig.target);
    }
    for (let i = numberTargets; i < defaultConfig.estimulos; i++) {
      let current = Math.floor(Math.random() * characters.length) + 1;
      let currentTarget = characters[current];
      charTargets.push(currentTarget);
    }
    charTargets = shuffle(charTargets);
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
        const currentTarget = charTargets[estimulos];
        setDisplay(currentTarget);
        targets.push({
          timestamp: moment(),
          target: currentTarget,
        });
        estimulos++;
        setTimeout(() => {
          setDisplay("");
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

  const renderInstrucciones = () => {
    return (
      <div>
        <p>
          En el centro de la pantalla irán apareciendo de manera secuencial
          distintas letras del abecedario. La tarea consiste que usted pulse la
          tecla {String.fromCharCode(config.keyCode)} cuando vea aparecer la
          letra {config.target}.
        </p>
        <p>
          Es importante que responda tan rápido como pueda, ya que los estímulos
          aparecen y desaparecen rápidamente.
        </p>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      {!started ? (
        <InterScreen
          instrucciones={renderInstrucciones()}
          disabled={disabled}
          thankyou={thankyou}
          start={start}
        />
      ) : (
        <div id="test-container" style={{ ...styleObject }}>
          {display}
        </div>
      )}
    </div>
  );
};

export default AtencionSimple;
