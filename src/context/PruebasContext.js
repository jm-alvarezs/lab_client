import React, { createContext, useReducer } from "react";
import PruebasReducer from "../reducers/PruebasReducer";
import { displayError, displaySuccess } from "../utils";

const initialState = {
  pruebas: null,
  prueba: null,
};

export const PruebasContext = createContext(initialState);

export const PruebasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PruebasReducer, initialState);

  const postPrueba = (config) => {
    PruebasService.postPrueba(config).then((res) => {
      const { enlace } = res.data.data;
      displaySuccess(dispatch, "Prueba agregada con éxito.");
    });
  };

  return (
    <PruebasContext.Provider value={{ ...state, postPrueba }}>
      {children}
    </PruebasContext.Provider>
  );
};
