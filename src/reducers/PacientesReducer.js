import { PACIENTES_RECIBIDOS } from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case PACIENTES_RECIBIDOS:
      return { ...state, pacientes: payload };
    default:
      return { ...state };
  }
};
