import {
  SHOW_MODAL,
  SET_RESPONSE,
  HIDE_MODAL,
  CLEAR,
  MODAL_COMPONENT,
  SHOW_ALERT,
  SHOW_SUCCESS,
  CLEAR_ALERT,
  CLEAR_SUCCESS,
  CLEAR_MODAL,
} from "../types";

export default function (state, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        title: "Precaución",
        showModal: true,
        content: action.payload.content,
        callback: action.payload.callback,
      };
    case HIDE_MODAL:
      return { ...state, show: false };
    case SET_RESPONSE:
      return { ...state, response: action.payload };
    case MODAL_COMPONENT:
      return {
        ...state,
        showModal: true,
        component: action.payload.component,
        title: action.payload.title,
        onClose: action.payload.onClose,
        callback: action.payload.callback,
      };
    case CLEAR_MODAL:
      return {
        ...state,
        show: false,
        content: "",
        component: "",
        title: "",
        onClose: "",
        callback: "",
      };
    case SHOW_ALERT:
      return { ...state, showAlert: true, alertContent: action.payload };
    case CLEAR_ALERT:
      return { ...state, showAlert: false, alertContent: "" };
    case CLEAR:
      return { ...state };
    case SHOW_SUCCESS:
      return { ...state, showSuccess: true, successContent: action.payload };
    case CLEAR_SUCCESS:
      return { ...state, showSuccess: false, successContent: "" };
    default:
      return { ...state };
  }
}
