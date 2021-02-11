import React, { createContext, useReducer } from "react";
import PruebasReducer from "../reducers/PruebasReducer";
import PruebasService from "../services/PruebasService";
import { displayError, displaySuccess } from "../utils";

const initialState = {
  pruebas: null,
  prueba: null,
};

export const PruebasContext = createContext(initialState);

export const PruebasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PruebasReducer, initialState);

  const postPrueba = (config) => {
    PruebasService.postPrueba(config)
      .then(() => {
        displaySuccess(dispatch, "Prueba agregada con éxito.");
      })
      .catch((error) => {
        displayError(dispatch, error);
      });
  };

  const postResultados = (resultados) => {
    PruebasService.postResultados(resultados);
  };

  return (
    <PruebasContext.Provider value={{ ...state, postPrueba, postResultados }}>
      {children}
    </PruebasContext.Provider>
  );
};
