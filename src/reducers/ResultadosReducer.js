import {
  FIABILITY_RECIBIDA,
  RESULTADOS_RECIBIDOS,
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
    default:
      return { ...state };
  }
};
