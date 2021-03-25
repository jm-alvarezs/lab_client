import React, { createContext, useReducer } from "react";
import UsuariosReducer from "../reducers/UsuariosReducer";
import {
  SET_PROPIEDAD_USER,
  SINGLE_USER_RECIBIDO,
  USUARIOS_RECIBIDOS,
} from "../types";

const initialState = {
  usuarios: null,
  usuario: null,
};

const users = [
  {
    id: 2,
    name: "Paco",
    email: "paco@gmail.com",
  },
];

export const UsuariosContext = createContext(initialState);

export const UsuariosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsuariosReducer, initialState);

  const getUsuarios = () => {
    dispatch({ type: USUARIOS_RECIBIDOS, payload: users });
  };

  const getUsuario = (id) => {
    dispatch({ type: SINGLE_USER_RECIBIDO, payload: users[0] });
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
        updateUsuario,
        setPropiedadUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
