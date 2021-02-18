import { RESULTADOS_RECIBIDOS } from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case RESULTADOS_RECIBIDOS:
      return { ...state, resultados: payload };
    default:
      return { ...state };
  }
};
