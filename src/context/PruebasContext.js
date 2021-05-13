import React, { createContext, useContext, useReducer } from "react";
import PostPrueba from "../components/pruebas/PostPrueba";
import PruebasReducer from "../reducers/PruebasReducer";
import PruebasService from "../services/PruebasService";
import UsuarioService from "../services/UsuarioService";
import {
  HIDE_SPINNER,
  PRUEBA_RECIBIDA,
  SHOW_SPINNER,
  TEST_READY,
} from "../types";
import { ModalContext } from "./ModalContext";

const initialState = {
  pruebas: null,
  prueba: null,
  ready: false,
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

  const postPrueba = (config, type) => {
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
        const url =
          `/atencion${
            type && type !== null ? `/${type}` : ""
          }?idTest=${idTest}&token=${accessUrl.token}&` + args;
        dispatch({ type: HIDE_SPINNER });
        modalComponent("Prueba Agregada", <PostPrueba url={url} type={type} />);
        //window.open(url, "_blank");
      });
    });
  };

  const postResultados = (resultados) => {
    resultados.idTest = parseInt(resultados.idTest);
    resultados.idPatient = parseInt(resultados.idPatient);
    PruebasService.postResultados(resultados);
  };

  return (
    <PruebasContext.Provider
      value={{ ...state, getPrueba, postPrueba, postResultados }}
    >
      {children}
    </PruebasContext.Provider>
  );
};
