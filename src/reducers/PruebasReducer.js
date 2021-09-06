import moment from "moment";
import {
  HIDE_SPINNER,
  POP_ESTIMULO,
  PRUEBA_RECIBIDA,
  RESET_ALL_ESTIMULOS,
  SET_PROPIEDAD_ESTIMULO,
  SHOW_SPINNER,
  TEST_READY,
  SET_FILA,
  SET_CONFIG,
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
    case RESET_ALL_ESTIMULOS:
      return { ...state, estimulos: [] };
    case SET_PROPIEDAD_ESTIMULO:
      const current = { ...state.current };
      const { key, value } = payload;
      current[key] = value;
      return { ...state, current };
    case SET_FILA: {
      return {
        ...state,
        fila: payload,
      };
    }
    case POP_ESTIMULO: {
      let estimulos = [...state.estimulos];
      if (state.current) {
        estimulos = [...estimulos, { ...state.current }];
      }
      let current = { emitted: moment().format("YYYY-MM-DD HH:mm:ss:SSS") };
      let fila = state.fila;
      if (fila) {
        fila = [...fila];
        current = {
          ...current,
          ...fila.shift(),
        };
        return { ...state, estimulos, current, fila };
      }
      return { ...state, estimulos, current };
    }
    case SET_CONFIG:
      return { ...state, config: payload };
    default:
      return { ...state };
  }
};
