import React, { createContext, useContext, useReducer } from "react";
import PostPrueba from "../components/pruebas/PostPrueba";
import PruebasReducer from "../reducers/PruebasReducer";
import PruebasService from "../services/PruebasService";
import UserService from "../services/UserService";
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
import { getArgs } from "../utils";

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
        UserService.setToken(token);
        dispatch({ type: TEST_READY });
        dispatch({ type: PRUEBA_RECIBIDA, payload: res.data.data });
      });
    }
  };

  const postPrueba = (config, patient, testType, callback) => {
    dispatch({ type: SHOW_SPINNER });
    PruebasService.postPrueba(config).then((res) => {
      const idTest = res.data.data.id;
      PruebasService.getPrueba(idTest).then((res) => {
        const { accessUrl } = res.data.data.test;
        const url = `/${testType.handle}?idTest=${idTest}&token=${
          accessUrl.token
        }&${getArgs(config)}`;
        dispatch({ type: HIDE_SPINNER });
        if (callback && typeof callback === "function") {
          callback(idTest, accessUrl.token);
        } else {
          modalComponent(
            "Prueba Agregada",
            <PostPrueba
              id={idTest}
              url={url}
              type={testType.handle}
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

  const setEstimulos = (estimulos) => {
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
        setConfig,
        getPrueba,
        postPrueba,
        clearPrueba,
        popEstimulo,
        setEstimulos,
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
