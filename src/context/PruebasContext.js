import React, { createContext, useReducer } from "react";
import PruebasReducer from "../reducers/PruebasReducer";

const initialState = {
  pruebas: null,
  prueba: null,
};

export const PruebasContext = createContext(initialState);

export const PruebasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PruebasReducer, initialState);
  return (
    <PruebasContext.Provider value={{ ...state }}>
      {children}
    </PruebasContext.Provider>
  );
};
