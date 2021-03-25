import React, { createContext, useReducer } from "react";
import ResultadosReducer from "../reducers/ResultadosReducer";
import ResultadosService from "../services/ResultadosService";
import { RESULTADOS_RECIBIDOS, SINGLE_RESULTADO_RECIBIDO } from "../types";

const initialState = {
  resultados: null,
};

export const ResultadosContext = createContext(initialState);

export const ResultadosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ResultadosReducer, initialState);

  const getResultados = () => {
    ResultadosService.getResultados().then((res) => {
      dispatch({ type: RESULTADOS_RECIBIDOS, payload: res.data.data });
    });
  };

  const getSingleTest = (id) => {
    ResultadosService.getSingleTest(id).then((res) => {
      const test = res.data.data.test;
      dispatch({ type: SINGLE_RESULTADO_RECIBIDO, payload: test });
    });
  };

  return (
    <ResultadosContext.Provider
      value={{ ...state, getResultados, getSingleTest }}
    >
      {children}
    </ResultadosContext.Provider>
  );
};
