import { SURVEYS_RECIBIDAS } from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case SURVEYS_RECIBIDAS:
      console.log(payload);
      return { ...state, surveys: payload };
    default:
      return { ...state };
  }
};
