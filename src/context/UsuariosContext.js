import React, { createContext, useContext, useReducer } from "react";
import UsuariosReducer from "../reducers/UsuariosReducer";
import UserService from "../services/UserService";
import {
  CREATE_USUARIO,
  SET_PROPIEDAD_USER,
  SINGLE_USER_RECIBIDO,
  USUARIOS_RECIBIDOS,
} from "../types";
import { ModalContext } from "./ModalContext";

const initialState = {
  usuarios: null,
  usuario: null,
};

export const UsuariosContext = createContext(initialState);

export const UsuariosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsuariosReducer, initialState);

  const { success } = useContext(ModalContext);

  const getUsuariosAdmin = () => {
    UserService.getUsuariosAdmin().then((res) => {
      const pacientes = res.data.data;
      dispatch({ type: USUARIOS_RECIBIDOS, payload: pacientes });
    });
  };

  const getUsuario = (id) => {
    UserService.getSinglePaciente(id).then((res) => {
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

  const deleteUsuario = (id) => {
    UserService.deleteUsuario(id).then(() => {
      success("¡Usuario eliminado con éxito!");
      getUsuariosAdmin();
    });
  };

  return (
    <UsuariosContext.Provider
      value={{
        ...state,
        getUsuario,
        deleteUsuario,
        createUsuario,
        getUsuariosAdmin,
        setPropiedadUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
