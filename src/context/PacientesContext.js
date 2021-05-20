import React, { createContext, useContext, useReducer } from "react";
import PacientesReducer from "../reducers/PacientesReducer";
import PacientesService from "../services/PacientesService";
import { PACIENTES_RECIBIDOS, SINGLE_USER_RECIBIDO } from "../types";
import { ModalContext } from "./ModalContext";
import { navigate } from "@reach/router";

const initialState = {
  pacientes: null,
  paciente: null,
};

export const PacientesContext = createContext(initialState);

export const PacientesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PacientesReducer, initialState);

  const { success } = useContext(ModalContext);

  const getPacientes = () => {
    PacientesService.getPacientes().then((res) => {
      const pacientes = res.data.data;
      dispatch({ type: PACIENTES_RECIBIDOS, payload: pacientes });
    });
  };

  const getPacientesAdmin = () => {
    PacientesService.getPacientesAdmin().then((res) => {
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

  const postPaciente = (paciente) => {
    delete paciente.id;
    PacientesService.postPaciente(paciente).then((res) => {
      const id = res.data.data.id;
      navigate(`/pacientes/${id}`);
      success("¡Paciente guardado!");
    });
  };

  const updatePaciente = (usuario) => {
    console.log(usuario);
    PacientesService.updatePaciente(usuario).then(() => {
      success("Paciente actualizado!");
    });
  };

  return (
    <PacientesContext.Provider
      value={{
        ...state,
        getPacientes,
        getSinglePaciente,
        getPacientesAdmin,
        postPaciente,
        updatePaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};
