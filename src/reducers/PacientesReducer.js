import { PACIENTES_RECIBIDOS, SINGLE_USER_RECIBIDO } from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case PACIENTES_RECIBIDOS:
      return { ...state, pacientes: payload };
    case SINGLE_USER_RECIBIDO:
      return { ...state, paciente: payload };
    default:
      return { ...state };
  }
};
