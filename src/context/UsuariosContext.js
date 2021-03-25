import React, { createContext, useReducer } from "react";
import UsuariosReducer from "../reducers/UsuariosReducer";
import PacientesService from "../services/PacientesService";
import {
  CREATE_USUARIO,
  SET_PROPIEDAD_USER,
  SINGLE_USER_RECIBIDO,
  USUARIOS_RECIBIDOS,
} from "../types";

const initialState = {
  usuarios: null,
  usuario: null,
};

export const UsuariosContext = createContext(initialState);

export const UsuariosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsuariosReducer, initialState);

  const getUsuarios = () => {
    PacientesService.getPacientes().then((res) => {
      const pacientes = res.data.data;
      dispatch({ type: USUARIOS_RECIBIDOS, payload: pacientes });
    });
  };

  const getUsuario = (id) => {
    PacientesService.getSinglePaciente(id).then((res) => {
      const paciente = res.data.data;
      dispatch({ type: SINGLE_USER_RECIBIDO, payload: paciente });
    });
  };

  const createUsuario = () => {
    dispatch({ type: CREATE_USUARIO });
  };

  const setPropiedadUsuario = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_USER, payload: { key, value } });
  };

  const updateUsuario = (usuario) => {};

  return (
    <UsuariosContext.Provider
      value={{
        ...state,
        getUsuario,
        getUsuarios,
        createUsuario,
        updateUsuario,
        setPropiedadUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
