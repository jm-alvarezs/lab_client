import React, { createContext, useContext, useReducer } from "react";
import AuthService, { setToken } from "../services/AuthService";
import UsuarioService from "../services/UsuarioService";
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
import { ModalContext } from "./ModalContext";
import { navigate } from "@reach/router";

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

  const { success, alert } = useContext(ModalContext);

  function getUser() {
    AuthService.getUser().then((res) => {
      const user = res.data.data;
      dispatch({
        type: LOGIN,
        payload: user,
      });
    });
  }

  function signIn(email, password) {
    dispatch({ type: SHOW_SPINNER });
    AuthService.signIn(email, password)
      .then((res) => {
        const { token } = res.data.data;
        window.localStorage.setItem("token", token);
        if (token && token !== null) {
          setToken(token);
          AuthService.getUser().then((res) => {
            const user = { ...res.data.data, token };
            dispatch({
              type: LOGIN,
              payload: user,
            });
            dispatch({ type: HIDE_SPINNER });
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data) {
            alert(error.response.data.error);
          }
        }
        dispatch({ type: HIDE_SPINNER });
      });
  }

  function userLoggedIn() {
    dispatch({ type: SHOW_SPINNER });
    let token = AuthService.userLoggedIn();
    if (!token) token = window.location.pathname.split("token=")[1];
    if (token) {
      setToken(token);
      AuthService.getUser()
        .then((res) => {
          const user = { ...res.data.data, token };
          dispatch({
            type: LOGIN,
            payload: user,
          });
          dispatch({ type: HIDE_SPINNER });
        })
        .catch((error) => {
          alert(error);
          dispatch({ type: HIDE_SPINNER });
        });
    }
  }

  function signOut() {
    AuthService.signOut();
    dispatch({ type: LOGOUT });
    dispatch({ type: HIDE_SPINNER });
    window.localStorage.setItem("token", null);
    navigate("/");
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
        success("Registrado con éxito.");
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
        if (error.response) {
          if (error.response.status === 409) {
            return alert(
              "Ya hay una cuenta registrada con ese correo electrónico."
            );
          }
        }
        alert(error);
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
        success("Perfil actualizado con éxito.");
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        getUser,
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
