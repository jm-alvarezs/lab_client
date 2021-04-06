import { PRUEBA_RECIBIDA, TEST_READY } from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case PRUEBA_RECIBIDA:
      return { ...state, prueba: payload };
    case TEST_READY:
      return { ...state, ready: true };
    default:
      return { ...state };
  }
};
