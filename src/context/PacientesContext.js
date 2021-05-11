import React, { createContext, useReducer } from "react";
import PacientesReducer from "../reducers/PacientesReducer";
import PacientesService from "../services/PacientesService";
import { PACIENTES_RECIBIDOS, SINGLE_USER_RECIBIDO } from "../types";

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

  const getSinglePaciente = (idPaciente) => {
    PacientesService.getSinglePaciente(idPaciente).then((res) => {
      const paciente = res.data.data;
      dispatch({ type: SINGLE_USER_RECIBIDO, payload: paciente });
    });
  };

  return (
    <PacientesContext.Provider
      value={{ ...state, getPacientes, getSinglePaciente }}
    >
      {children}
    </PacientesContext.Provider>
  );
};
