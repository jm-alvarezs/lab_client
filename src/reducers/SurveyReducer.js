import { SURVEYS_RECIBIDAS } from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case SURVEYS_RECIBIDAS:
      return { ...state, surveys: payload };
    default:
      return { ...state };
  }
};
