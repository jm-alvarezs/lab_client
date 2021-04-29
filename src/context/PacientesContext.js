import React, { createContext, useReducer } from "react";
import PacientesReducer from "../reducers/PacientesReducer";
import PacientesService from "../services/PacientesService";
import { PACIENTES_RECIBIDOS } from "../types";

const initialState = {
  pacientes: null,
  paciente: null,
};

export const PacientesContext = createContext(initialState);

export const PacientesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PacientesReducer, initialState);

  const getPacientes = () => {
    PacientesService.getPacientes().then((res) => {
      const pacientes = res.data.data;
      dispatch({ type: PACIENTES_RECIBIDOS, payload: pacientes });
    });
  };

  return (
    <PacientesContext.Provider value={{ ...state, getPacientes }}>
      {children}
    </PacientesContext.Provider>
  );
};
