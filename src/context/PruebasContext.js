import React, { createContext, useContext, useReducer } from "react";
import PostPrueba from "../components/pruebas/PostPrueba";
import PruebasReducer from "../reducers/PruebasReducer";
import PruebasService from "../services/PruebasService";
import UsuarioService from "../services/UsuarioService";
import {
  TEST_READY,
  HIDE_SPINNER,
  SHOW_SPINNER,
  PRUEBA_RECIBIDA,
  POP_MOVIMIENTO,
  RESET_ALL_MOVIMIENTOS,
  SET_PROPIEDAD_MOVIMIENTO,
} from "../types";
import { BASE_URL } from "../utils";
import { ModalContext } from "./ModalContext";

const initialState = {
  pruebas: null,
  prueba: null,
  ready: false,
  currentMove: false,
  movimientos: [],
};

const prueba = {
  tiempoExposicion: 500,
  tiempoInterestimular: 500,
  target: "A",
  fontFamily: "Courier",
  fontStyle: "bold",
  color: "#000",
  fontSize: 24,
  backgroundColor: "#000",
  numeroEstimulos: 5,
  aparicion: "17",
  keyCode: 13,
  duracion: 35,
  nombre: "Adultos",
  nombre_sujeto: "Juan Manuel Alvarez Sanchez",
  descripcion:
    "Estudiante universitario presenta déficit de atención durante clases y empleo…",
  edad: 22,
};

export const PruebasContext = createContext(initialState);

export const PruebasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PruebasReducer, initialState);

  const { modalComponent } = useContext(ModalContext);

  const getPrueba = (idTest, token) => {
    if (token) {
      PruebasService.getPrueba(idTest, {
        headers: {
          Authorization: token,
        },
      }).then((res) => {
        const prueba = res.data.data;
        dispatch({ type: PRUEBA_RECIBIDA, payload: prueba });
      });
    } else {
      PruebasService.getPrueba(idTest).then((res) => {
        const prueba = res.data.data.test;
        const token = prueba.accessUrl.token;
        UsuarioService.setToken(token);
        dispatch({ type: TEST_READY });
      });
    }
  };

  const postPrueba = (config, type, patient) => {
    dispatch({ type: SHOW_SPINNER });
    PruebasService.postPrueba(config).then((res) => {
      const idTest = res.data.data.id;
      PruebasService.getPrueba(idTest).then((res) => {
        const { accessUrl } = res.data.data.test;
        const args = Object.keys(config)
          .map((key) =>
            config[key] !== "" && config[key] !== null && config[key]
              ? `${key}=${config[key]}`
              : null
          )
          .filter((obj) => obj !== null)
          .join("&");
        console.log(config);
        const url =
          `/${
            config.idTestType === 4
              ? "hanoi"
              : `atencion${type && type !== null ? `/${type}` : ""}`
          }` +
          `?idTest=${idTest}&token=${accessUrl.token}&` +
          args;
        dispatch({ type: HIDE_SPINNER });
        modalComponent(
          "Prueba Agregada",
          <PostPrueba
            id={idTest}
            url={url}
            type={type}
            defaultEmail={patient.email}
          />
        );
      });
    });
  };

  const postResultados = (resultados) => {
    resultados.idTest = parseInt(resultados.idTest);
    resultados.idPatient = parseInt(resultados.idPatient);
    PruebasService.postResultados(resultados);
  };

  const setPropiedadMovimiento = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_MOVIMIENTO, payload: { key, value } });
  };

  const popMovimiento = () => {
    dispatch({ type: POP_MOVIMIENTO });
  };

  const resetAllMovimientos = () => {
    dispatch({ type: RESET_ALL_MOVIMIENTOS });
  };

  return (
    <PruebasContext.Provider
      value={{
        ...state,
        getPrueba,
        postPrueba,
        popMovimiento,
        postResultados,
        resetAllMovimientos,
        setPropiedadMovimiento,
      }}
    >
      {children}
    </PruebasContext.Provider>
  );
};
