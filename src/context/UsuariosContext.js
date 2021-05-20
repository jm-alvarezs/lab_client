import React, { createContext, useReducer } from "react";
import UsuariosReducer from "../reducers/UsuariosReducer";
import UsuarioService from "../services/UsuarioService";
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

  const getUsuariosAdmin = () => {
    UsuarioService.getUsuariosAdmin().then((res) => {
      const pacientes = res.data.data;
      dispatch({ type: USUARIOS_RECIBIDOS, payload: pacientes });
    });
  };

  const getUsuario = (id) => {
    UsuarioService.getSinglePaciente(id).then((res) => {
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

  return (
    <UsuariosContext.Provider
      value={{
        ...state,
        getUsuario,
        createUsuario,
        getUsuariosAdmin,
        setPropiedadUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
