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
  RESET_ALL_ESTIMULOS,
  SET_PROPIEDAD_ESTIMULO,
  POP_ESTIMULO,
  SET_CONFIG,
  SET_FILA,
  ADD_TEST,
} from "../types";
import { ModalContext } from "./ModalContext";

const initialState = {
  pruebas: null,
  prueba: null,
  ready: false,
  current: false,
  estimulos: [],
  config: {},
  tests: [],
};

export const PruebasContext = createContext(initialState);

export const PruebasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PruebasReducer, initialState);

  const { success, modalComponent } = useContext(ModalContext);

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

  const postPrueba = (config, type, patient, callback) => {
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
          `/${
            config.idTestType > 3
              ? type === "hanoi"
                ? "hanoi"
                : "flanker"
              : `atencion${type && type !== null ? `/${type}` : ""}`
          }` +
          `?idTest=${idTest}&token=${accessUrl.token}&` +
          args;
        dispatch({ type: HIDE_SPINNER });
        if (callback && typeof callback === "function") {
          callback(idTest, accessUrl.token);
        } else {
          modalComponent(
            "Prueba Agregada",
            <PostPrueba
              id={idTest}
              url={url}
              type={type}
              defaultEmail={patient.email}
            />
          );
        }
      });
    });
  };

  const clearPrueba = () => {
    dispatch({ type: PRUEBA_RECIBIDA, payload: null });
  };

  const postResultados = (resultados) => {
    resultados.idTest = parseInt(resultados.idTest);
    resultados.idPatient = parseInt(resultados.idPatient);
    PruebasService.postResultados(resultados);
  };

  const setPropiedadEstimulo = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_ESTIMULO, payload: { key, value } });
  };

  const resetAllEstimulos = () => {
    dispatch({ type: RESET_ALL_ESTIMULOS });
  };

  const setFila = (estimulos) => {
    dispatch({ type: SET_FILA, payload: estimulos });
  };

  const popEstimulo = () => {
    dispatch({ type: POP_ESTIMULO });
  };

  const putResultados = (idTest, rule) => {
    PruebasService.putResultados(idTest, rule).then(() => {
      success("¡Resultados actualizados!");
    });
  };

  const setConfig = (config) => {
    dispatch({ type: SET_CONFIG, payload: config });
  };

  const addTest = (idTest, token) => {
    dispatch({ type: ADD_TEST, payload: { idTest, token } });
  };

  return (
    <PruebasContext.Provider
      value={{
        ...state,
        addTest,
        setFila,
        setConfig,
        getPrueba,
        postPrueba,
        clearPrueba,
        popEstimulo,
        putResultados,
        postResultados,
        resetAllEstimulos,
        setPropiedadEstimulo,
      }}
    >
      {children}
    </PruebasContext.Provider>
  );
};
