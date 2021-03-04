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

  const getResultados = (id) => {
    ResultadosService.getResultados().then((res) => {
      dispatch({ type: RESULTADOS_RECIBIDOS, payload: res.data.data });
      if (id) {
        const single_resultado = res.data.data.find(
          (tupla) => tupla._id === id
        );
        dispatch({
          type: SINGLE_RESULTADO_RECIBIDO,
          payload: single_resultado,
        });
      }
    });
  };

  return (
    <ResultadosContext.Provider value={{ ...state, getResultados }}>
      {children}
    </ResultadosContext.Provider>
  );
};
