import React, { createContext, useReducer } from "react";
import PacientesReducer from "../reducers/PacientesReducer";

const initialState = {
  pacientes: null,
  paciente: null,
};

export const PacientesContext = createContext(initialState);

export const PacientesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PacientesReducer, initialState);
  return (
    <PacientesContext.Provider value={{ ...state }}>
      {children}
    </PacientesContext.Provider>
  );
};
