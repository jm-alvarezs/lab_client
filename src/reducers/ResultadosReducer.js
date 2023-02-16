import {
  FIABILITY_RECIBIDA,
  HIDE_SPINNER,
  RESULTADOS_RECIBIDOS,
  SHOW_SPINNER,
  SINGLE_RESULTADO_RECIBIDO,
} from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case RESULTADOS_RECIBIDOS:
      return { ...state, resultados: payload };
    case SINGLE_RESULTADO_RECIBIDO:
      return { ...state, resultado: payload };
    case FIABILITY_RECIBIDA:
      return { ...state, fiability: payload };
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };
    default:
      return { ...state };
  }
};
