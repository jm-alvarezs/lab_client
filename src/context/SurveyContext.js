import React, { createContext, useContext, useReducer } from "react";
import PostCuestionario from "../components/cuestionario/PostCuestionario";
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

  const { success, modalComponent } = useContext(ModalContext);

  const getSurveys = () => {
    SurveyService.getSurveys().then((res) => {
      const surveys = res.data.data;
      dispatch({ type: SURVEYS_RECIBIDAS, payload: surveys });
    });
  };

  const getSurveysAdmin = () => {
    SurveyService.getSurveysAdmin().then((res) => {
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

  const postSurvey = (survey, patient) => {
    SurveyService.postSurvey(survey).then((res) => {
      const idSurvey = res.data.data.id;
      SurveyService.getSingleSurvey(idSurvey).then((res) => {
        const { accessUrl } = res.data.data.survey;
        const url = `/cuestionario/answer?idSurvey=${idSurvey}&token=${accessUrl.token}&idSurveyType=${survey.idSurveyType}&idPatient=${patient.id}`;
        modalComponent(
          "Prueba Agregada",
          <PostCuestionario
            id={idSurvey}
            url={url}
            type={survey.idSurveyType === 1 ? "nechapi" : "cupom"}
            defaultEmail={patient.email}
          />
        );
      });
    });
  };

  const postAnswer = (survey, token) => {
    survey.idPatient = parseInt(survey.idPatient);
    SurveyService.postAnswer(survey, token).then(() => {
      success("¡Respuestas cargadas con éxito!");
    });
  };

  return (
    <SurveyContext.Provider
      value={{
        ...state,
        getSurveys,
        getSurvey,
        getSurveysAdmin,
        postSurvey,
        postAnswer,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
