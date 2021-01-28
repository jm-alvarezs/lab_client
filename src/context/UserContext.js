import React, { createContext, useReducer } from "react";
import AuthService, { setToken } from "../services/AuthService";
import UsuarioService from "../services/UsuarioService";
import AdjuntosService from "../services/AdjuntosService";
import UserReducer from "../reducers/UserReducer";
import {
  SHOW_SPINNER,
  HIDE_SPINNER,
  LOGIN,
  LOGOUT,
  SET_PROPIEDAD_USER,
  GUARDAR_USUARIO,
  EDITAR_USUARIO,
  USER_CREATED,
} from "../types";
import { displayError, displaySuccess } from "../utils";

const initialState = {
  user: null,
  correo: null,
  password: null,
  telefono: null,
  cuenta: null,
  direccion: null,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  function signIn(email, password) {
    AuthService.signIn(email, password)
      .then((res) => {
        const { token } = res.data.data;
        if (token && token !== null) {
          setToken(token);
          AuthService.getUser().then((res) => {
            const user = { ...res.data.data, token };
            console.log(user);
            dispatch({
              type: LOGIN,
              payload: user,
            });
          });
        }
      })
      .catch((error) => {
        displayError(dispatch, error);
        dispatch({ type: HIDE_SPINNER });
      });
  }

  function userLoggedIn() {
    dispatch({ type: SHOW_SPINNER });
    AuthService.userLoggedIn().then((res) => {
      const usuario = res.data;
      dispatch({ type: LOGIN, payload: usuario });
    });
  }

  function signOut() {
    AuthService.signOut()
      .then(() => dispatch({ type: LOGOUT }))
      .catch((error) => {
        displayError(dispatch, error);
      });
  }

  function signUp(
    name,
    profession,
    email,
    institution,
    birthDate,
    country,
    scholarship,
    password
  ) {
    AuthService.signUp({
      name,
      profession,
      email,
      institution,
      birthDate,
      country,
      scholarship,
      password,
    })
      .then(() => {
        dispatch({ type: USER_CREATED });
        displaySuccess(dispatch, "Registrado con éxito.");
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
        displayError(dispatch, error);
      });
  }

  function editarUsuario() {
    dispatch({ type: EDITAR_USUARIO });
  }

  function cancelEdit() {
    dispatch({ type: GUARDAR_USUARIO });
  }

  function setPropiedadUser(key, value) {
    dispatch({ type: SET_PROPIEDAD_USER, payload: { key, value } });
  }

  function recoverPassword(email) {
    AuthService.recoverPassword(email)
      .then(() => {
        displaySuccess(
          dispatch,
          "Te hemos enviado un correo para reestablecer tu contraseña."
        );
      })
      .catch((error) => {
        displayError(
          dispatch,
          "Hubo un error al enviar el correo. Inténtalo más tarde."
        );
      });
  }

  function updateUsuario(usuario) {
    UsuarioService.putUsuario(usuario)
      .then(() => {
        dispatch({ type: GUARDAR_USUARIO });
        displaySuccess(dispatch, "Perfil actualizado con éxito.");
      })
      .catch((error) => {
        displayError(dispatch, error);
      });
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        cancelEdit,
        userLoggedIn,
        updateUsuario,
        editarUsuario,
        recoverPassword,
        setPropiedadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
