import {
  HIDE_SPINNER,
  PRUEBA_RECIBIDA,
  SHOW_SPINNER,
  TEST_READY,
} from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case PRUEBA_RECIBIDA:
      return { ...state, prueba: payload };
    case TEST_READY:
      return { ...state, ready: true };
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };
    default:
      return { ...state };
  }
};
