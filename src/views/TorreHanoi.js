import React, { useState, useEffect, useContext } from "react";
import { discs, getConfig } from "../utils";
import moment from "moment";
import { PruebasContext } from "../context/PruebasContext";
import error_sound from "../assets/sound/error_sound.mp3";
import { ModalContext } from "../context/ModalContext";
import InterScreen from "../components/pruebas/InterScreen";

const instruccionesA = [
  <p className="instrucciones">
    En la pantalla aparecerán tres barras, numeradas con los números 1, 2 y 3.
    En la barra número 1 hay una torre formada por varios discos. Lo que tiene
    que hacer es formar la misma torre, con los discos en el mismo orden, en la
    barra número 3.
  </p>,
  <p className="instrucciones">
    Para hacerlo, tiene que mover los discos de uno en uno, tecleando primero el
    número de la barra donde esté el disco que quiere mover, y después el número
    de la barra hacia donde lo quiere mover. Puedes mover los discos hacia la
    derecha o hacia la izquierda, y puede usar las tres barras.
  </p>,
  <p className="instrucciones">
    Tiene que tener en cuenta que para mover el disco que está abajo, primero
    tiene que quitar los discos que estén encima (si los hubiera).
  </p>,
];

const instruccionesB = [
  <p className="instrucciones">
    En la pantalla aparecerán tres barras, numeradas con los números 1, 2 y 3.
    En la barra número 1 hay una torre formada por varios discos. Lo que tiene
    que hacer es formar la misma torre, con los discos en el mismo orden, en la
    barra número 3.
  </p>,
  <p className="instrucciones">
    Para hacerlo, tiene que mover los discos de uno en uno, tecleando primero el
    número de la barra donde esté el disco que quiere mover, y después el número
    de la barra hacia donde lo quiere mover. Puedes mover los discos hacia la
    derecha o hacia la izquierda, y puede usar las tres barras.
  </p>,
  <p className="instrucciones">
    Tiene que tener en cuenta que para mover el disco que está abajo, primero
    tiene que quitar los discos que estén encima (si los hubiera).
  </p>,
];

const TorreHanoi = () => {
  const [one, setOne] = useState([]);
  const [two, setTwo] = useState([]);
  const [three, setThree] = useState([]);
  const [config, setConfig] = useState({});
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [finishTime, setFinishTime] = useState(null);

  const {
    prueba,
    getPrueba,
    current,
    estimulos,
    popEstimulo,
    postResultados,
    setPropiedadEstimulo,
  } = useContext(PruebasContext);

  const { success, alert, modalComponent } = useContext(ModalContext);

  const defaultConfig = {
    administracion: "A",
    discos: 3,
    mensajeError: false,
    sonidoError: false,
  };

  const errorSound = new Audio(error_sound);

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
    return () => {
      setThree([]);
    };
  }, []);

  useEffect(() => {
    if (prueba !== null) {
      if (prueba.settings) {
        let currentConfig = getConfig(defaultConfig);
        setConfig({ ...prueba.settings, token: currentConfig.token });
      }
    }
  }, [prueba]);

  useEffect(() => {
    if (current.origen && current.destino) {
      move(current.origen, current.destino);
    }
  }, [current]);

  useEffect(() => {
    if (parseInt(three.length) === parseInt(config.discos)) {
      let valid;
      three.forEach((disco, index) => {
        if (index < three.length - 1) {
          valid = disco.size < three[index + 1].size;
        }
      });
      if (valid) {
        handleEnd(true);
      }
    }
  }, [three]);

  const getArray = (index) => {
    let discosRender = [];
    switch (index) {
      case 1:
        discosRender = [...one];
        break;
      case 2:
        discosRender = [...two];
        break;
      case 3:
        discosRender = [...three];
        break;
    }
    return discosRender;
  };

  const confirmEnd = () => {
    modalComponent(
      "Precaución",
      <div>
        <p>¿Deseas terminar este ejercicio sin completar?</p>
        <button className="btn btn-dark">Terminar</button>
      </div>
    );
  };

  const handleStart = () => {
    setStart(true);
    setStartTime(moment().format("YYYY-MM-DD HH:mm:ss:SSS"));
    setOne(discs.slice(0, config.discos));
    popEstimulo();
    document.body.addEventListener("keypress", (e) => {
      let number = parseInt(e.key);
      if (!isNaN(number) && [1, 2, 3].includes(number)) {
        setPropiedadEstimulo("hanoi", number);
      }
    });

    window.onbeforeunload = (e) => {
      handleEnd(false);
    };
  };

  const handleEnd = (finished) => {
    if (!finished) {
      popEstimulo();
    }
    if (startTime !== null) {
      setFinish(true);
      setStart(false);
      const endTime = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
      setFinishTime(endTime);
      const result = {
        start: startTime,
        end: endTime,
        movements: estimulos,
        finished,
        idTest: config.idTest,
        idPatient: config.idPatient,
        config: config.id,
        token: config.token,
        device: navigator.userAgent,
      };
      postResultados(result);
    }
  };

  const handleError = (error) => {
    setPropiedadEstimulo("error", error);
    popEstimulo();
    if (config.sonidoError) {
      errorSound.play();
    }
    if (config.mensajeError) {
      setTimeout(() => {
        alert("Error: Movimiento inválido");
      }, 100);
    }
  };

  const move = (origen, destino) => {
    const originArray = getArray(origen);
    if (originArray.length === 0) {
      setPropiedadEstimulo("sizeOrigen", null);
      setPropiedadEstimulo("sizeDestino", null);
      return handleError("percepcion");
    }
    const destArray = getArray(destino);
    const disc = { ...originArray[originArray.length - 1] };
    if (destArray.length > 0) {
      let last_disc = destArray[destArray.length - 1];
      setPropiedadEstimulo("sizeOrigen", disc.size);
      setPropiedadEstimulo("sizeDestino", last_disc.size);
      if (last_disc.size > disc.size) {
        return handleError("aprendizaje");
      }
    } else {
      setPropiedadEstimulo("sizeOrigen", disc.size);
      setPropiedadEstimulo("sizeDestino", null);
    }
    if (origen === destino) {
      return handleError("arrepentimiento");
    }
    originArray.pop();
    destArray.push(disc);
    switch (origen) {
      case 1:
        setOne(originArray);
        break;
      case 2:
        setTwo(originArray);
        break;
      case 3:
        setThree(originArray);
        break;
    }
    switch (destino) {
      case 1:
        setOne(destArray);
        break;
      case 2:
        setTwo(destArray);
        break;
      case 3:
        setThree(destArray);
        break;
    }
    popEstimulo();
  };

  const renderDiscos = (disc) => {
    const discosRender = getArray(disc);
    return discosRender.map((disco, index) => (
      <div
        key={index + 1}
        className={`disco disco-${disco.size} ${disco.color}`}
        style={{
          width: `calc(100% - ${disco.size} * 60px)`,
          margin: "auto",
          position: "absolute",
          bottom:
            current.origen === disc && index === discosRender.length - 1
              ? "280px"
              : `${index * 40}px`,
          left: `${disco.size * 30}px`,
        }}
      ></div>
    ));
  };

  const renderTorre = () => {
    return (
      <div className="container">
        <div className="row torre-row align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-4">
                <div className="stick"></div>
                {renderDiscos(1)}
              </div>
              <div className="col-4">
                <div className="stick"></div>
                {renderDiscos(2)}
              </div>
              <div className="col-4">
                <div className="stick"></div>
                {renderDiscos(3)}
              </div>
            </div>
            <div className="base mw-100 w-100"></div>
            <div className="row mt-5">
              <div
                className={`col-4 text-center ${
                  current.origen === 1 ? "text-success bold" : ""
                }`}
              >
                <span style={{ fontSize: 64 }}>1</span>
              </div>
              <div
                className={`col-4 text-center ${
                  current.origen === 2 ? "text-success bold" : ""
                }`}
              >
                <span style={{ fontSize: 64 }}>2</span>
              </div>
              <div
                className={`col-4 text-center ${
                  current.origen === 3 ? "text-success bold" : ""
                }`}
              >
                <span style={{ fontSize: 64 }}>3</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid text-center py-3 my-3">
          {start && !finish && (
            <div className="btn btn-outline-dark" onClick={confirmEnd}>
              Terminar
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderInstrucciones = () => {
    if (!disabled) {
      if (config.administracion === "A") {
        return instruccionesA;
      }
      return instruccionesB;
    }
    return [];
  };

  return (
    <div>
      {startTime === null || finishTime !== null ? (
        <InterScreen
          start={handleStart}
          thankyou={finishTime !== null}
          instrucciones={renderInstrucciones()}
          disabled={disabled}
          isHanoi
        />
      ) : (
        renderTorre()
      )}
    </div>
  );
};

export default TorreHanoi;
