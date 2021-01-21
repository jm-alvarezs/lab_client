import React, { createContext, useReducer } from "react";
import AuthService from "../services/AuthService";
import UsuarioService from "../services/UsuarioService";
import AdjuntosService from "../services/AdjuntosService";
import UserReducer from "../reducers/UserReducer";
import {
  SHOW_SPINNER,
  HIDE_SPINNER,
  LOGIN,
  LOGOUT,
  SET_PROPIEDAD_LOGIN,
  SET_PROPIEDAD_USER,
  USER_CREATED,
  GUARDAR_USUARIO,
  EDITAR_USUARIO,
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
    dispatch({ type: SHOW_SPINNER });
    AuthService.signIn(email, password)
      .then(() => {
        UsuarioService.getUsuario()
          .then((res) => {
            let { usuario } = res.data;
            dispatch({
              type: LOGIN,
              payload: usuario,
            });
            dispatch({ type: HIDE_SPINNER });
          })
          .catch((error) => {
            displayError(dispatch, error);
            AuthService.signOut();
          });
      })
      .catch((error) => {
        displayError(dispatch, error);
        dispatch({ type: HIDE_SPINNER });
      });
  }

  function userLoggedIn() {
    dispatch({ type: SHOW_SPINNER });
    AuthService.userLoggedIn(
      () => {
        UsuarioService.getUsuario()
          .then((res) => {
            let { usuario } = res.data;
            dispatch({
              type: LOGIN,
              payload: usuario,
            });
            dispatch({ type: HIDE_SPINNER });
          })
          .catch((error) => {
            displayError(dispatch, error);
            AuthService.signOut();
          });
      },
      (error) => {
        displayError(dispatch, error);
        AuthService.signOut();
        dispatch({ type: HIDE_SPINNER });
      }
    );
  }

  function signOut() {
    AuthService.signOut()
      .then(() => dispatch({ type: LOGOUT }))
      .catch((error) => {
        displayError(dispatch, error);
      });
  }

  function signUp(nombre, correo, password, telefono) {
    dispatch({ type: SHOW_SPINNER });
    if (String(telefono).length !== 10) {
      return displayError(dispatch, "El teléfono debe tener 10 dígitos");
    }
    AuthService.signUp(correo, password)
      .then((user) => {
        const { uid } = user.user;
        dispatch({
          type: SET_PROPIEDAD_LOGIN,
          payload: { key: "correo", value: correo },
        });
        dispatch({
          type: SET_PROPIEDAD_LOGIN,
          payload: { key: "password", value: password },
        });
        dispatch({ type: HIDE_SPINNER });
        dispatch({ type: USER_CREATED });
        UsuarioService.postUsuario(nombre, correo, telefono, uid)
          .then((res) => {
            dispatch({
              type: SET_PROPIEDAD_LOGIN,
              payload: { key: "correo", value: correo },
            });
            dispatch({
              type: SET_PROPIEDAD_LOGIN,
              payload: { key: "password", value: password },
            });
            dispatch({ type: HIDE_SPINNER });
            dispatch({ type: USER_CREATED });
            displaySuccess(dispatch, "¡Registrado con éxito!");
          })
          .catch((error) => {
            displayError(dispatch, error);
          });
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
        if (error.code) {
          if (error.code === "auth/email-already-in-use") {
            displayError(dispatch, "Ya existe una cuenta con ese correo.");
          }
        } else if (error.response) {
          if (error.response.status === 409)
            displayError(
              dispatch,
              "Ya existe un usuario con este correo electrónico."
            );
          if (error.response.status === 400)
            displayError(dispatch, "El correo electrónico no es válido.");
        } else {
          displayError(dispatch, error);
        }
      });
  }

  function editarUsuario() {
    dispatch({ type: EDITAR_USUARIO });
  }

  function cancelEdit() {
    dispatch({ type: GUARDAR_USUARIO });
  }

  function setPropiedadUser(key, value) {
    if (key === "idAdjunto") {
      dispatch({ type: SET_PROPIEDAD_USER, payload: { key: "file", value } });
      if (!value)
        dispatch({ type: SET_PROPIEDAD_USER, payload: { key, value } });
    } else {
      if (key === "telefono") {
        value = String(value).replace(/\D/g, "");
        value = String(value).substring(0, 10);
      }
      dispatch({ type: SET_PROPIEDAD_USER, payload: { key, value } });
    }
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
    let valid = true;
    ["nombre", "correo", "telefono"].forEach((key) => {
      if (usuario[key] === "" || usuario[key] === null || !usuario[key]) {
        valid = false;
      }
    });
    if (!valid) return alert("Debes llenar todos tus datos.");
    const promises = [];
    if (usuario.file && usuario.file !== null) {
      if (usuario.file.name) {
        const promiseAdjunto = new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("adjunto", usuario.file);
          AdjuntosService.postAdjunto(formData).then((res) => {
            const { idAdjunto } = res.data;
            usuario.idAdjunto = idAdjunto;
            resolve();
          });
        });
        promises.push(promiseAdjunto);
      }
    }
    Promise.all(promises).then(() => {
      const data = { ...usuario };
      delete data.file;
      delete data.uid;
      delete data.activo;
      AuthService.updateEmail(data.correo)
        .then(() => {
          UsuarioService.putUsuario(data)
            .then((res) => {
              dispatch({ type: GUARDAR_USUARIO });
              displaySuccess(dispatch, "Perfil actualizado con éxito.");
            })
            .catch((error) => {
              displayError(dispatch, error);
            });
        })
        .catch((error) => {
          if (error.code) {
            if (error.code === "auth/email-already-in-use") {
              displayError(dispatch, "Ya existe una cuenta con ese correo.");
            }
          }
        });
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
