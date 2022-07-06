import { SINGLE_SURVEY_RECIBIDA, SURVEYS_RECIBIDAS } from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case SURVEYS_RECIBIDAS:
      return { ...state, surveys: payload };
    case SINGLE_SURVEY_RECIBIDA:
      return { ...state, survey: payload };
    default:
      return { ...state };
  }
};
