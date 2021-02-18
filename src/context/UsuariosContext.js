import React, { createContext, useReducer } from "react";
import UsuariosReducer from "../reducers/UsuariosReducer";

const initialState = {
  usuarios: null,
  usuario: null,
};

export const UsuariosContext = createContext(initialState);

export const UsuariosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsuariosReducer, initialState);
  return (
    <UsuariosContext.Provider value={{ ...state }}>
      {children}
    </UsuariosContext.Provider>
  );
};
