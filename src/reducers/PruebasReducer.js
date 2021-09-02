import moment from "moment";
import {
  HIDE_SPINNER,
  PRUEBA_RECIBIDA,
  RESET_ALL_MOVIMIENTOS,
  POP_MOVIMIENTO,
  SET_PROPIEDAD_MOVIMIENTO,
  SHOW_SPINNER,
  TEST_READY,
  SET_ESTIMULOS_FLANKER,
  POP_ESTIMULO_FLANKER,
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
    case RESET_ALL_MOVIMIENTOS:
      return { ...state, movimientos: [] };
    case POP_MOVIMIENTO:
      const actual = { ...state.currentMove };
      return {
        ...state,
        movimientos: [...state.movimientos, actual],
        currentMove: {},
      };
    case SET_PROPIEDAD_MOVIMIENTO:
      const currentMove = { ...state.currentMove };
      const { key, value } = payload;
      currentMove[key] = value;
      return { ...state, currentMove };
    case SET_ESTIMULOS_FLANKER: {
      const estimulos = payload;
      return {
        ...state,
        estimulos,
        currentMove: {
          ...estimulos[0],
          emitted: moment().format("YYYY-MM-DD HH:mm:ss:SSS"),
        },
      };
    }
    case POP_ESTIMULO_FLANKER: {
      let movimientos = [...state.movimientos];
      if (state.currentMove) {
        movimientos = [...movimientos, { ...state.currentMove }];
      }
      let estimulos = [...state.estimulos];
      const currentMove = {
        ...estimulos.shift(),
        emitted: moment().format("YYYY-MM-DD HH:mm:ss:SSS"),
      };
      return { ...state, movimientos, estimulos, currentMove };
    }
    default:
      return { ...state };
  }
};
