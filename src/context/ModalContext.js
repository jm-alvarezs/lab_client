import React, { createContext, useReducer } from "react";
import ModalReducer from "../reducers/ModalReducer";
import {
  SHOW_MODAL,
  SET_RESPONSE,
  HIDE_MODAL,
  MODAL_COMPONENT,
  SHOW_ALERT,
  SHOW_SUCCESS,
  CLEAR_ALERT,
  CLEAR_SUCCESS,
  CLEAR_MODAL,
} from "../types";
import { showModal } from "../utils";

const initialState = {
  response: "",
  show: false,
  content: "",
  callback: "",
};

export const ModalContext = createContext(initialState);

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ModalReducer, initialState);

  function confirm(content, callback) {
    dispatch({ type: SHOW_MODAL, payload: { content, callback } });
  }

  function alert(content) {
    if (typeof content === "object") {
      content = content.toString();
    }
    if (!String(content).includes("401") && !String(content).includes("400")) {
      dispatch({ type: SHOW_ALERT, payload: content });
      setTimeout(() => dispatch({ type: CLEAR_ALERT }), 5000);
    }
  }

  function success(content) {
    dispatch({ type: SHOW_SUCCESS, payload: content });
    setTimeout(() => {
      dispatch({ type: CLEAR_SUCCESS });
    }, 3000);
  }

  function hideAlert() {
    dispatch({ type: CLEAR_ALERT });
  }

  function modalComponent(title, component, onClose, callback) {
    dispatch({
      type: MODAL_COMPONENT,
      payload: { title, component, onClose, callback },
    });
    showModal();
  }

  function setResponse(response) {
    dispatch({ type: SET_RESPONSE, payload: response });
    dispatch({ type: HIDE_MODAL });
  }

  function clear() {
    dispatch({ type: CLEAR_MODAL });
  }

  function clearModal() {
    dispatch({ type: CLEAR_MODAL });
  }

  function clearSuccess() {
    dispatch({ type: CLEAR_SUCCESS });
  }

  function clearAlert() {
    dispatch({ type: CLEAR_ALERT });
  }
  return (
    <ModalContext.Provider
      value={{
        ...state,
        confirm,
        success,
        hideAlert,
        alert,
        setResponse,
        clear,
        modalComponent,
        clearModal,
        clearSuccess,
        clearAlert,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
