import React, { createContext, useContext, useReducer } from "react";
import PostPrueba from "../components/pruebas/PostPrueba";
import SurveyReducer from "../reducers/SurveyReducer";
import SurveyService from "../services/SurveyService";
import { SINGLE_SURVEY_RECIBIDA, SURVEYS_RECIBIDAS } from "../types";
import { BASE_URL } from "../utils";
import { ModalContext } from "./ModalContext";

const initialState = {
  surveys: null,
  survey: null,
};

export const SurveyContext = createContext(initialState);

export const SurveyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SurveyReducer, initialState);

  const { success, modalComponent } = useContext(ModalContext);

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
    SurveyService.postSurvey(survey).then((res) => {
      const url = `http://localhost:3000/cuestionario/answer?idSurveyType=${survey.idSurveyType}&token=""&idPatient=${survey.idPatient}`;
      modalComponent(
        "Cuestionario creado",
        <PostPrueba
          url={url}
          type={
            survey.idSurveyType === 1
              ? "Cuestionario Nechapi"
              : "Cuestionario CUPOM"
          }
        />
      );
      success("¡Resultados capturados con éxito!");
    });
  };

  const postAnswer = (survey) => {
    SurveyService.postAnswer(survey).then(() => {
      success("¡Respuestas cargadas con éxito!");
    });
  };

  return (
    <SurveyContext.Provider
      value={{ ...state, getSurveys, getSurvey, postSurvey, postAnswer }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
