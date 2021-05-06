import React, { createContext, useContext } from "react";
import SurveyReducer from "../reducers/SurveyReducer";
import SurveyService from "../services/SurveyService";
import { SINGLE_SURVEY_RECIBIDA, SURVEYS_RECIBIDAS } from "../types";
import { ModalContext } from "./ModalContext";

const initialState = {
  surveys: null,
  survey: null,
};

export const SurveyContext = createContext(initialState);

export const SurveyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SurveyReducer, initialState);

  const { success } = useContext(ModalContext);

  const getSurveys = () => {
    SurveyService.getSurveys().then((res) => {
      const surveys = res.data.data;
      dispatch({ type: SURVEYS_RECIBIDAS, payload: surveys });
    });
  };

  const getSurvey = (id) => {
    SurveyService.getSuvrey(id).then((res) => {
      const survey = res.data.data;
      dispatch({ type: SINGLE_SURVEY_RECIBIDA, payload: survey });
    });
  };

  const postSurvey = (survey) => {
    SurveyService.postSurvey(survey).then(() => {
      success("¡Resultados capturados con éxito!");
    });
  };
  return (
    <SurveyContext.Provider value={{ ...state, getSurvey, postSurvey }}>
      {children}
    </SurveyContext.Provider>
  );
};
