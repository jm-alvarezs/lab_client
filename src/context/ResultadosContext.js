import React, { createContext, useReducer } from "react";
import ResultadosReducer from "../reducers/ResultadosReducer";
import { RESULTADOS_RECIBIDOS } from "../types";

const initialState = {
  resultados: null,
};

const resultados = [
  {
    timestamp: 13200,
    character: "A",
    clicked: 13210,
  },
  {
    timestamp: 13210,
    character: "B",
    clicked: null,
  },
];

export const ResultadosContext = createContext(initialState);

export const ResultadosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ResultadosReducer, initialState);

  const getResultados = (idPrueba) => {
    dispatch({ type: RESULTADOS_RECIBIDOS, payload: resultados });
  };

  return (
    <ResultadosContext.Provider value={{ ...state, getResultados }}>
      {children}
    </ResultadosContext.Provider>
  );
};
