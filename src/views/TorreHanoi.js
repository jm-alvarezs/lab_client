import React, { useState, useEffect } from "react";
import { discs } from "../utils";
import moment from "moment";
import { useContext } from "react/cjs/react.development";
import { PruebasContext } from "../context/PruebasContext";
import error_sound from "../assets/sound/error_sound.mp3";
import { ModalContext } from "../context/ModalContext";

const TorreHanoi = () => {
  const [origen, setOrigen] = useState(null);
  const [destino, setDestino] = useState(null);
  const [one, setOne] = useState(discs);
  const [two, setTwo] = useState([]);
  const [three, setThree] = useState([]);

  const { popMovimiento, setPropiedadMovimiento } = useContext(PruebasContext);

  const { success, alert } = useContext(ModalContext);

  const initialConfig = {
    administracion: "A",
    discos: 3,
    mensajeError: true,
    sonidoError: true,
  };

  const errorSound = new Audio(error_sound);

  useEffect(() => {
    setOne(discs.slice(0, initialConfig.discos));
    return () => {
      setThree([]);
    };
  }, []);

  useEffect(() => {
    if (three.length === initialConfig.discos) {
      let valid;
      three.forEach((disco, index) => {
        if (index < three.length - 1) {
          valid = disco.size < three[index + 1].size;
        }
      });
      if (valid) {
        setTimeout(() => {
          success("Ganaste");
        }, 500);
      }
    }
  }, [three]);

  useEffect(() => {
    if (destino !== null && origen !== null) {
      setPropiedadMovimiento("destino", origen);
      setPropiedadMovimiento(
        "timestamp_destino",
        moment().format("YYYY-MM-DD HH:mm:ss:mss")
      );
      move(origen, destino);
      setOrigen(null);
      setDestino(null);
    } else if (origen !== null) {
      setPropiedadMovimiento("origen", origen);
      setPropiedadMovimiento(
        "timestamp_origen",
        moment().format("YYYY-MM-DD HH:mm:ss:mss")
      );
    }
  }, [origen, destino]);

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

  const handleError = (error) => {
    setPropiedadMovimiento("error", error);
    popMovimiento();
    if (initialConfig.sonidoError) {
      errorSound.play();
    }
    if (initialConfig.mensajeError) {
      setTimeout(() => {
        alert("Error: Movimiento inválido");
      }, 100);
    }
  };

  const move = (origen, destino) => {
    const originArray = getArray(origen);
    if (originArray.length === 0) {
      setPropiedadMovimiento("sizeOrigen", null);
      setPropiedadMovimiento("sizeDestino", null);
      return handleError("percepcion");
    }
    const destArray = getArray(destino);
    const disc = { ...originArray[originArray.length - 1] };
    if (destArray.length > 0) {
      let last_disc = destArray[destArray.length - 1];
      setPropiedadMovimiento("sizeOrigen", disc.size);
      setPropiedadMovimiento("sizeDestino", last_disc.size);
      if (last_disc.size > disc.size) {
        return handleError("aprendizaje");
      }
    } else {
      setPropiedadMovimiento("sizeOrigen", disc.size);
      setPropiedadMovimiento("sizeDestino", null);
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
    popMovimiento();
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
          bottom: `${index * 40}px`,
          left: `${disco.size * 30}px`,
        }}
      ></div>
    ));
  };

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
        </div>
      </div>
      <div className="row my-3 py-3">
        <div className="col-4">
          <button
            className={`btn w-100 ${origen === 1 ? "btn-light" : "btn-dark"}`}
            onClick={() => (origen === null ? setOrigen(1) : setDestino(1))}
          >
            1
          </button>
        </div>
        <div className="col-4">
          <button
            className={`btn w-100 ${origen === 2 ? "btn-light" : "btn-dark"}`}
            onClick={() => (origen === null ? setOrigen(2) : setDestino(2))}
          >
            2
          </button>
        </div>
        <div className="col-4">
          <button
            className={`btn w-100 ${origen === 3 ? "btn-light" : "btn-dark"}`}
            onClick={() => (origen === null ? setOrigen(3) : setDestino(3))}
          >
            3
          </button>
        </div>
      </div>
      <div className="container-fluid text-center py-3 my-3">
        <button className="btn btn-dark">Iniciar</button>
      </div>
    </div>
  );
};

export default TorreHanoi;
