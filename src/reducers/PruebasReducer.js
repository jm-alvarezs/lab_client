import { PRUEBA_RECIBIDA } from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case PRUEBA_RECIBIDA:
      return { ...state, prueba: payload };
    default:
      return { ...state };
  }
};
